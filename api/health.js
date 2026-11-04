module.exports=(req,res)=>res.status(200).json({app:'Accord',status:'online',model:'meta/muse-glimmer-30b',provider:'NVIDIA NIM',configured:!!process.env.NVIDIA_API_KEY,storage:'browser-local'});
