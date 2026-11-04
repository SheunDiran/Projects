/* Muse Glimmer via NVIDIA NIM (free prototyping endpoint). No API keys are persisted. */
module.exports = async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST') return res.status(405).json({error:'POST only'});
  const {text,sourceTitle}=(req.body||{});
  if(typeof text!=='string'||!text.trim()||text.length>18000)return res.status(400).json({error:'Provide evidence text (1–18000 characters).'});
  const key=process.env.NVIDIA_API_KEY || req.headers['x-nvidia-key'];
  if(typeof key!=='string'||!key.trim())return res.status(428).json({error:'No Muse Glimmer API key configured. Use NVIDIA Build to generate a free prototyping key and enter it in this browser session.'});
  const controller = new AbortController(); const timer=setTimeout(()=>controller.abort(),24000);
  try{
    const prompt=`You are Accord, an evidence-grounded agreement analysis assistant. Find explicit agreements, commitments, proposed changes and unresolved questions from client communications. Return ONLY a valid JSON object shaped {"candidates":[{"topic":"Scope|Budget|Timeline|Deliverables|Payment|Revisions|Ownership|Other","value":"one concise claim","quote":"EXACT contiguous short excerpt from the supplied evidence","status":"proposed|confirmed","confidence":0.0,"rationale":"brief reason"}]}. NEVER invent evidence. Quote text exactly as it appears, no paraphrases inside quotes. Prefer at most five high-value items. If nothing can be proven, return {"candidates":[]}. A statement expressing a wish or question is proposed, not confirmed. Title: ${String(sourceTitle||'Evidence').slice(0,100)}\nEVIDENCE:\n${text}`;
    const r=await fetch('https://integrate.api.nvidia.com/v1/chat/completions',{method:'POST',signal:controller.signal,headers:{'Authorization':`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({model:'meta/muse-glimmer-30b',messages:[{role:'system',content:'You are a conservative evidence extraction engine. Respond with JSON only.'},{role:'user',content:prompt}],temperature:0.15,max_tokens:1900,stream:false})});
    if(!r.ok){ const err=await r.text();return res.status(502).json({error:`Model provider returned ${r.status}. Check the NVIDIA API key and free endpoint availability.`,detail:err.slice(0,240)}); }
    const raw=await r.json();let s=raw.choices?.[0]?.message?.content||''; s=s.replace(/<think>[\s\S]*?<\/think>/g,'').trim(); const match=s.match(/\{[\s\S]*\}/); if(!match)return res.status(502).json({error:'Model returned no parseable JSON.',raw:s.slice(0,500)});
    let out=JSON.parse(match[0]);if(!Array.isArray(out.candidates))out.candidates=[];
    const allowed=new Set(['Scope','Budget','Timeline','Deliverables','Payment','Revisions','Ownership','Other']);
    const candidates=out.candidates.filter(x=>x&&typeof x==='object'&&typeof x.quote==='string'&&text.includes(x.quote.trim())&&typeof x.value==='string').slice(0,7).map(x=>({topic:allowed.has(x.topic)?x.topic:'Other',value:x.value.slice(0,400),quote:x.quote.trim().slice(0,500),status:x.status==='confirmed'?'confirmed':'proposed',confidence:Math.max(0,Math.min(1,Number(x.confidence)||0)),rationale:String(x.rationale||'').slice(0,200)}));
    return res.status(200).json({provider:'NVIDIA NIM',model:'meta/muse-glimmer-30b',candidates,discarded:Math.max(0,out.candidates.length-candidates.length)});
  }catch(e){return res.status(502).json({error:e.name==='AbortError'?'Model timed out. Please retry.':'Model response could not be processed.'});}finally{clearTimeout(timer)}
}
