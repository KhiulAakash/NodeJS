// function normalExample(){
//     let x=10;
//     let y=0;
//     setTimeout(()=>{
//         y=20
//     },2000);
//     console.log(x+y);
//   }
//   normalExample();

async function asyncExample() {
    let x=10;
    let y=0;
    console.log("Loading...")
    await new Promise(resolve => {
      setTimeout(() => {
        y=20;
        resolve();
      }, 2000); 
    });
  
    console.log(x+y);
  }
  
  asyncExample();

  
  