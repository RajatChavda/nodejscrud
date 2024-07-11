const express = require("express")
require('dotenv').config()

let app = express()
app.use(express.json());

/*app.get('/Hello',(req,res)=>{
    res.redirect('/check')
})
app.get('/check',(req,res)=>{
    res.send('<h1>Hello world</h1>')
})*/

let arr = []
id = 0
let isdeleted

app.post('/creatrprod',(req,res)=>{
    try{
    let obj = req.body
    id++;
    obj.id = id;
    obj.isdeleted = false;
    if(obj.name && obj.cost && obj.category){
       let ans= arr.find((val)=>{
          return  val.name == obj.name
        })
        if(ans){
            res.send({isSuccess:false,msg:'Product already exists'})
        }
        else{
            arr.push(obj)
            res.status(201).send({"Is successful" : true,prod:obj})
        }

}
else{
    res.send({"Is successful" : false,msg:"Enter valid information"})
}
    }
    catch(err){
        res.status(500).send({isSuccess: false, msg: +err})
    }
})

app.get('/getalldata',(req,res)=>{
    try{
    let ans = arr.filter((val)=>{
        return val.isdeleted == false
    })
    if(ans){
        res.status(200).send({prod: ans})
    }
}
catch(err){
    res.status(500).send({isSuccess: false, msg: +err})
}
})

app.put('/updatedata',(req,res)=>{
    try{
    let id = req.query.id
    let idx = arr.findIndex((val)=>(val.id == id))
    if(idx >= 0){
        let obj = arr[idx]
        obj = {
            ...obj,
            ...req.body
        }
        arr[idx] = obj
        res.send({isSuccess: true, updateval : obj})
    }
    else{
        res.status(404).send({isSuccess: false, msg : "Value not found"})
    }
}
catch(err){
    res.status(500).send({isSuccess: false, msg: +err})
}
})

app.delete('/deletedata',(req,res)=>{
    try{
    let id = req.query.id
    let idx = arr.findIndex((val)=>(val.id == id))
    if(idx >= 0){
        let obj = arr[idx]
        arr.splice(idx, 1)
        res.send({isSuccess: true, deleteval : obj})
    }
    else{
        res.status(404).send({isSuccess: false, msg : "Value not found"})
    }
}
catch(err){
    res.status(500).send({isSuccess: false, msg: +err})
}
})

app.delete('/softdelete',(req,res)=>{
    try{
    let id = req.query.id
    let idx = arr.find((val)=>(val.id == id))
    if(idx && idx.isdeleted == false){
        idx.isdeleted = true;
        res.send({isSuccess: true, deleteval : arr})
    }
    else{
        res.status(404).send({isSuccess: false, msg : "Value not found"})
    }
}
catch(err){
    res.status(500).send({isSuccess: false, msg: +err})
}
})

app.get('/range',(req,res)=>{
    try{
    let ans = arr.filter((val)=>{
       return val.cost > 500 && val.cost < 1000
    })
    if(ans){
        res.status(200).send({prod: ans})
    }
}
catch(err){
    res.status(500).send({isSuccess: false, msg: +err})
}
})

app.get('/sortingasce',(req,res)=>{
    try{
    let ans = arr.sort((a,b)=>(a.cost-b.cost))
    res.send({prod:ans})
}
catch(err){
    res.status(500).send({isSuccess: false, msg: +err})
}
})
app.get('/sortingdesc',(req,res)=>{
    try{
    let ans = arr.sort((a,b)=>(b.cost-a.cost))
    res.send({prod:ans})
}
catch(err){
    res.status(500).send({isSuccess: false, msg: +err})
}
})
app.listen(process.env.PORT,()=>{
    console.log("Port started on "+process.env.PORT)
})


