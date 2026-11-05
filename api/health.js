module.exports=(req,res)=>{
  res.setHeader('Cache-Control','no-store');
  return res.status(200).json({app:'Accord',status:'online',model:'meta/muse-glimmer-30b',providers:{nvidiaConfigured:!!process.env.NVIDIA_API_KEY,openrouterConfigured:!!process.env.OPENROUTER_API_KEY},configured:!!(process.env.NVIDIA_API_KEY||process.env.OPENROUTER_API_KEY),inferenceVerified:false,storage:'browser-local'});
};
