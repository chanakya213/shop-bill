const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/shop-app', { useNewUrlParser: true , useUnifiedTopology:true }).then(()=>{
    console.log("connected with shop-appDB");
});

// creating a schema for item to fallo apatter which hold required fields

const itemschema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    }
});

// initializin the model 

const Item = new mongoose.model("item",itemschema);

// now we can add items using Item variable 

const billschema = new mongoose.Schema({
    billname:{
        type:String,
        require:true
    },
    billdate:{
        type:String,
        require:true
    },
    billprice:{
        type:Number,
        require:true
    }
});

const Bill = new mongoose.model("bill",billschema);

app.get('/', (req, res) => {
    res.send("iam a home router ... ):");
});

app.post('/item' ,async (req , res)=>{
    try {
        const {name,price} = req.body;
            const newitem = new Item({name,price}); 
            await newitem.save();
            res.send("Item successfully saved and added to Items list");
         
    } catch (error) {
        res.status(400).send("something went wrong");
    }
});

app.get('/item' ,async (req , res)=>{
    try {
      const items = await Item.find();
      res.json(items);
    } catch (error) {
        res.status(400).send("something went wrong");
    }
});

app.post('/bills' ,async (req , res)=>{
    try {
        const {billname,billdate,billprice} = req.body;
            const newbill = new Bill({billname,billdate,billprice}); 
            await newbill.save();
            res.send("successfully saved the current Bill");
    } catch (error) {
        res.status(400).send("something went wrong");
    }
});

app.get('/bills' ,async (req , res)=>{
    try {
        const exist = await Bill.find();
        res.json(exist); 
           
    } catch (error) {
        res.status(400).send("something went wrong");
    }
});

app.listen(5000, () => {
    console.log(`Server started on port 5000`);
});