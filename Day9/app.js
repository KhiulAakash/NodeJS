 const express=require('express');
 const path=require('path');
 
 const app=express();
 const publicPath=path.join(__dirname,'public')
//  app.use(express.static(publicPath))

app.set('view engine','ejs');

app.get('/',(req,resp)=>{
    resp.sendFile(`${publicPath}/index.html`)
})

app.get('/about',(req,resp)=>{
    resp.sendFile(`${publicPath}/about.html`)
})

app.get('/help',(req,resp)=>{
    resp.sendFile(`${publicPath}/help.html`)
})

app.get('/login',(req,resp)=>{
    resp.render('login')
})

app.get('/profile',(req,resp)=>{
    const user={
        name:"Aakash Khiul",
        email:"aakash@gmail.com",
        address:"Kalika-01, Chitwan",
        skills:['html','css','js','react','nodeJS']
    }
    resp.render('profile',{user})
})

app.get('*',(req,resp)=>{
    resp.sendFile(`${publicPath}/error.html`)
})
 app.listen(5000)