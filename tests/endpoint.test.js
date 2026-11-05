const test=require('node:test');const assert=require('node:assert/strict');const handler=require('../api/analyze.js');
function fakeRes(){const r={code:200,headers:{},setHeader(k,v){this.headers[k]=v;return this},status(v){this.code=v;return this},json(v){this.body=v;return this}};return r}
test('method check blocks GET',async()=>{let r=fakeRes();await handler({method:'GET',body:{}},r);assert.equal(r.code,405)});
test('no evidence fails with 400',async()=>{let r=fakeRes();await handler({method:'POST',body:{text:''},headers:{}},r);assert.equal(r.code,400)});
test('missing model key returns error, not fabricated candidates',async()=>{let r=fakeRes();await handler({method:'POST',body:{text:'Client proposed December 3.'},headers:{}},r);assert.equal(r.code,428);assert.ok(!r.body.candidates)});
test('model candidates without source-verbatim quote are discarded',async()=>{const orig=global.fetch;global.fetch=async()=>({ok:true,json:async()=>({choices:[{message:{content:JSON.stringify({candidates:[{topic:'Timeline',value:'December 3',quote:'December 3',status:'proposed',confidence:.88},{topic:'Budget',value:'£500',quote:'Fake unquoted content',status:'confirmed',confidence:.99}]})}}]})});try{let r=fakeRes();await handler({method:'POST',headers:{'x-nvidia-key':'test-key'},body:{text:'Client proposed December 3.'}},r);assert.equal(r.code,200);assert.equal(r.body.candidates.length,1);assert.equal(r.body.candidates[0].topic,'Timeline');assert.equal(r.body.discarded,1)}finally{global.fetch=orig}});
test('oversized input rejected before remote model call',async()=>{let r=fakeRes();await handler({method:'POST',headers:{},body:{text:'x'.repeat(18001)}},r);assert.equal(r.code,400)});

test('NVIDIA 403 is surfaced as an actionable provider authorization error',async()=>{
 const oldFetch=global.fetch;
 global.fetch=async()=>({ok:false,status:403,text:async()=>'{"detail":"Authorization failed"}'});
 try {const r=fakeRes();await handler({method:'POST',headers:{'x-nvidia-key':'synthetic-test-key'},body:{text:'The client proposed November 11.'}},r);assert.equal(r.code,424);assert.equal(r.body.code,'PROVIDER_AUTHORIZATION_FAILED');assert.equal(r.body.upstreamStatus,403);assert.equal(r.body.provider,'NVIDIA NIM');assert.ok(!JSON.stringify(r.body).includes('synthetic-test-key'))} finally{global.fetch=oldFetch}
});

test('failed NVIDIA inference falls back to the same Meta model through OpenRouter',async()=>{
 const oldFetch=global.fetch,oldOpen=process.env.OPENROUTER_API_KEY;
 process.env.OPENROUTER_API_KEY='synthetic-backup-key';let calls=[];
 global.fetch=async(url,opts)=>{calls.push({url,auth:opts.headers.Authorization,model:JSON.parse(opts.body).model});if(calls.length===1)return {ok:false,status:403};return {ok:true,json:async()=>({choices:[{message:{content:JSON.stringify({candidates:[{topic:'Timeline',value:'November 11 is proposed',quote:'November 11',status:'proposed',confidence:.92}]})}}]})}};
 try {const r=fakeRes();await handler({method:'POST',headers:{'x-nvidia-key':'synthetic-test-key'},body:{text:'The client proposed November 11.'}},r);assert.equal(r.code,200);assert.equal(r.body.provider,'OpenRouter');assert.equal(r.body.model,'meta/muse-glimmer-30b');assert.equal(calls.length,2);assert.equal(calls[0].model,calls[1].model);assert.equal(r.body.candidates[0].quote,'November 11')} finally{global.fetch=oldFetch;if(oldOpen===undefined)delete process.env.OPENROUTER_API_KEY;else process.env.OPENROUTER_API_KEY=oldOpen}
});

test('unverified model quotes still fail validation on alternate provider',async()=>{
 const oldFetch=global.fetch,oldNVIDIA=process.env.NVIDIA_API_KEY;
 delete process.env.NVIDIA_API_KEY;
 global.fetch=async()=>({ok:true,json:async()=>({choices:[{message:{content:JSON.stringify({candidates:[{value:'Invented budget',quote:'A billion dollars',status:'confirmed'}]})}}]})});
 try {const r=fakeRes();await handler({method:'POST',headers:{'x-openrouter-key':'synthetic-router-key'},body:{text:'The client asked about scope.'}},r);assert.equal(r.code,200);assert.equal(r.body.candidates.length,0);assert.equal(r.body.discarded,1)} finally{global.fetch=oldFetch;if(oldNVIDIA!==undefined)process.env.NVIDIA_API_KEY=oldNVIDIA}
});

test('model parser accepts fenced JSON but rejects empty text',()=>{
 const parser=handler._test.extractJSON;
 assert.deepEqual(parser({content:'```json\n{"candidates":[]}\n```'}),{candidates:[]});
 assert.throws(()=>parser({content:''}),/EMPTY_MODEL_OUTPUT/);
});

test('health status does not disclose any API key',()=>{
 const health=require('../api/health.js');const r=fakeRes();health({},r);assert.equal(r.body.app,'Accord');assert.equal(r.body.inferenceVerified,false);assert.ok(!JSON.stringify(r.body).includes('synthetic-test-key'));
});
