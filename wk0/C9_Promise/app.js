
let promise = new Promise((resolve, reject)=>{
   resolve();
});

promise.then(()=>{
   console.log('Work is finished!!');
});

promise.catch(()=>{
   console.log('uh oh!');
});

promise
   .then(()=>console.log('Work is finished!!'))
   .then(()=>console.log('Again finished!'));

promise
   .then(()=>console.log('Work is finished!!'))
   .then(()=>console.log('Again finished!'))
   .catch(()=>console.log('uh oh!'));

   

