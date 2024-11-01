const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const MONGO_URI = 'mongodb://localhost:27017/Register';

mongoose.connect(MONGO_URI)
.then(()=>{console.log('Connected database success')})
.catch(err=>console.log(err));

//create schema register schema

const registerSchema =new mongoose.Schema({
    mobileNumber:{
        type:Number,
        required:true,
        
    },
    studentName:{
        type:String,
        required:true
    },
    training:{
        type:String,
        enum:["Summer training","Internship","apprenticeship"],
        required:true
    },
    technology:{
        type:String,
        enum:['java','php','mern'],
        required:true
    },
    education:{
        type:String,
        enum:['diploma','BCA','B.tech'],
        required:true
    },
    year:{
        type:String,
        year:['1st year','2nd year','3rd year'],
        required:true
    },
    fatherName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        lowercase:true
    },
    alternateMobile:{
        type:String,

    },
    collegeName:{
        type:String,
        required:true
    }
})

const Register = mongoose.model("Register",registerSchema);

app.post('/api/register',async(req,res)=>{
    try {
        const {mobileNumber,studentName,training,technology,education,year,fatherName,email,alternateMobile,collegeName} = req.body;

        const user = new Register({
            mobileNumber,
            studentName,
            training,
            technology,
            education,
            year,
            fatherName,
            email,
            alternateMobile,
            collegeName
        })

        await user.save()
        res.status(201).json({message:'registered successfull',user:user})

    } catch (error) {
        console.log("eroor creating user",error);
        res.status(500).json({message:"Error creating user"})
    }
})

//delete api

app.delete('/api/delete/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        const deleteduser = await Register.findByIdAndDelete(id);
        if(!deleteduser){
          return  res.status(404).json({message:'user not found'});
        }
        res.status(201).json({message:"deleted succussfull",deleteduser:deleteduser})
    } catch (error) {
        console.log("error",error);
        res.status(500).json({message:'error creatin user'})
    }
})
//get api

app.get('/api/register',async(req,res)=>{
    try {
        const user = await Register.find();
        res.status(200).json(user);
    } catch (error) {
        console.log("error",error);
        res.status(500).json({message:"user creating error"})
    }
})

//edit api

app.put('/api/edit/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const updateData = req.body;
        const updateeduser = await Register.findByIdAndUpdate(id,updateData,{new:true});

        if(!updateeduser){
            return res.status(404).json({message:"user not found"});

        }
        res.status(201).json({message:"update successfull",updateeduser:updateeduser})
      
    }catch(error){
        console.log("Error ",error);
        res.status(500).json({message:"error creating user"})
    }
})

const Port = 8000;
app.listen(Port,()=>{
    console.log(`server is running at port ${Port}`)
})