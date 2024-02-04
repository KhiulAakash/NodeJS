const express=require('express');
const reqFilter=require('./middleware')
const app=express();
const route=express.Router()

// app.use(reqFilter);
route.use(reqFilter);
app.get('/',(req,resp)=>{
    resp.send("Welcome to Home Page")
})

route.get('/user',(req,resp)=>{
    resp.send("Welcome to User Page")
})

app.get('/about',(req,resp)=>{
    resp.send("Welcome to About Page")
})

route.get('/contact',(req,resp)=>{
    resp.send("Welcome to contact page.")
})
app.use('/',route);

app.listen(5000);