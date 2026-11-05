/**
 * Accord — source-grounded decision extraction using Meta Muse Glimmer 30B.
 * NVIDIA NIM is the preferred provider. OpenRouter can be configured as a fallback.
 * Neither provider's credentials are stored in the browser or committed to source.
 * Model output is treated as suggestions, not agreements; every source quote is checked.
 */
const MODEL = 'meta/muse-glimmer-30b';
const NVIDIA_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const ALLOWED_TOPICS = new Set(['Scope','Budget','Timeline','Deliverables','Payment','Revisions','Ownership','Other']);

function collectProviders(req) {
  const nvidiaByok = req.headers?.['x-nvidia-key'];
  const openrouterByok = req.headers?.['x-openrouter-key'];
  const nvidia = (typeof nvidiaByok === 'string' && nvidiaByok.trim()) || process.env.NVIDIA_API_KEY;
  const openrouter = (typeof openrouterByok === 'string' && openrouterByok.trim()) || process.env.OPENROUTER_API_KEY;
  const providers = [];
  if (nvidia) providers.push({name:'NVIDIA NIM',url:NVIDIA_URL,key:nvidia,headers:{}});
  if (openrouter) providers.push({name:'OpenRouter',url:OPENROUTER_URL,key:openrouter,headers:{'HTTP-Referer':'https://accord-evidence-hackathon.vercel.app','X-Title':'Accord — Evidence to Agreement'}});
  // An explicitly supplied OpenRouter BYOK key takes precedence over the server NVIDIA key.
  if (openrouterByok && !nvidiaByok) providers.reverse();
  return providers;
}

function exactCandidates(output, originalText) {
  const input = Array.isArray(output?.candidates) ? output.candidates : [];
  const candidates = input.filter(candidate => {
    if (!candidate || typeof candidate !== 'object' || typeof candidate.quote !== 'string' || typeof candidate.value !== 'string') return false;
    const quote = candidate.quote.trim();
    return quote.length >= 3 && quote.length <= 500 && originalText.includes(quote);
  }).slice(0,7).map(candidate => ({
    topic:ALLOWED_TOPICS.has(candidate.topic) ? candidate.topic : 'Other',
    value:candidate.value.slice(0,400),
    quote:candidate.quote.trim(),
    status:candidate.status === 'confirmed' ? 'confirmed' : 'proposed',
    confidence:Math.max(0,Math.min(1,Number(candidate.confidence)||0)),
    rationale:String(candidate.rationale||'').slice(0,200)
  }));
  return {candidates,discarded:Math.max(0,input.length-candidates.length)};
}

function extractJSON(message) {
  const content = message?.content;
  const text = typeof content === 'string' ? content : Array.isArray(content) ? content.filter(c=>c.type==='text').map(c=>c.text||'').join('\n') : '';
  const clean = text.replace(/<think>[\s\S]*?<\/think>/g,'').replace(/```(?:json)?/gi,'').trim();
  if (!clean) throw new Error('EMPTY_MODEL_OUTPUT');
  try {return JSON.parse(clean)} catch {}
  const start = clean.indexOf('{'), end = clean.lastIndexOf('}');
  if (start < 0 || end <= start) throw new Error('INVALID_MODEL_OUTPUT');
  return JSON.parse(clean.slice(start,end+1));
}

module.exports = async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  res.setHeader('X-Content-Type-Options','nosniff');
  if (req.method !== 'POST') return res.status(405).json({error:'POST only'});
  const {text,sourceTitle} = req.body||{};
  if (typeof text !== 'string' || !text.trim() || text.length > 18000) return res.status(400).json({error:'Provide evidence text (1–18000 characters).'});
  const providers = collectProviders(req);
  if (!providers.length) return res.status(428).json({code:'API_KEY_NOT_CONFIGURED',error:'Model inference has not been configured by this deployment. The project owner must set NVIDIA_API_KEY or OPENROUTER_API_KEY in Vercel.'});

  const prompt = `You are Accord, a source-grounded agreement extraction assistant. Analyze the supplied client communication. Return ONLY a JSON object exactly like {"candidates":[{"topic":"Scope|Budget|Timeline|Deliverables|Payment|Revisions|Ownership|Other","value":"concise statement","quote":"EXACT short contiguous substring copied from evidence","status":"proposed|confirmed","confidence":0.7,"rationale":"brief reason"}]}. Every quote MUST be copied verbatim from EVIDENCE. Return up to five high-value items. Unanswered requests, suggestions, questions and proposed changes are proposed, not confirmed. Do not invent dates, prices, assent, consequences, or evidence. If evidence lacks decisions, return {"candidates":[]}. Title: ${String(sourceTitle||'Evidence').slice(0,100)}\nEVIDENCE:\n${text}`;
  const payload = JSON.stringify({model:MODEL,messages:[{role:'system',content:'You extract proposals and confirmed commitments from evidence conservatively. Output a single JSON object with no Markdown.'},{role:'user',content:prompt}],temperature:1,top_p:0.95,max_tokens:2300,stream:false});
  const controller = new AbortController();
  const timer = setTimeout(()=>controller.abort(),47000);
  let lastFailure = null;
  try {
    for (let i=0;i<providers.length;i++) {
      const provider = providers[i];
      let response;
      try {
        response = await fetch(provider.url,{method:'POST',signal:controller.signal,headers:{'Authorization':`Bearer ${provider.key}`,'Content-Type':'application/json',...provider.headers},body:payload});
      } catch(e) {
        if (e.name === 'AbortError') return res.status(504).json({code:'PROVIDER_TIMEOUT',error:'The Meta model request timed out. Please try again.'});
        lastFailure={code:'PROVIDER_UNREACHABLE',error:`Could not reach ${provider.name}.`,provider:provider.name};
        if (i < providers.length-1) continue;
        break;
      }
      if (!response.ok) {
        // Never return the upstream body: it may contain provider request or account identifiers.
        const status = response.status;
        const auth = status===401 || status===403;
        lastFailure={code:auth?'PROVIDER_AUTHORIZATION_FAILED':'PROVIDER_ERROR',provider:provider.name,upstreamStatus:status,error:auth ? `${provider.name} rejected hosted inference access (${status}). The API key or account may lack endpoint permissions. Try a Build-generated key with Public API Endpoints access.` : `${provider.name} returned ${status}. Please try again or check model availability.`};
        if ((auth || status===404 || status===429 || status>=500) && i < providers.length-1) continue;
        break;
      }
      let raw;
      try { raw=await response.json(); } catch {return res.status(502).json({code:'PROVIDER_INVALID_RESPONSE',error:`${provider.name} returned invalid JSON.`});}
      let extracted;
      try {extracted=extractJSON(raw.choices?.[0]?.message)} catch {return res.status(502).json({code:'MODEL_OUTPUT_INVALID',error:'Model returned an unparsable or empty answer. Retry with a shorter evidence sample.'});}
      const validated=exactCandidates(extracted,text);
      return res.status(200).json({provider:provider.name,model:MODEL,...validated});
    }
    return res.status(lastFailure?.code==='PROVIDER_AUTHORIZATION_FAILED'?424:502).json(lastFailure||{code:'PROVIDER_ERROR',error:'No inference provider succeeded.'});
  } catch(e) {
    return res.status(e.name==='AbortError'?504:502).json({code:'MODEL_REQUEST_FAILED',error:e.name==='AbortError'?'Meta inference timed out.':'The model response could not be processed.'});
  } finally {clearTimeout(timer)}
};

module.exports._test={collectProviders,exactCandidates,extractJSON};
