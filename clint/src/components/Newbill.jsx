import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Mybills from "./Mybills";
import Sales from "./Sales";

function Newbill(){
    // collecting data through api
    const [items,setitems] = useState([]);
    // stores user entered values
    const [item,setitem] = useState({name:"",quantity:""});
    // displays options to add newitem into bill 
    const [show,setshow] = useState(false); 
   //colects data what he wants to add into my bill section
    const [newitem,setnewitem] = useState([]);
    //this is the data where we colect from the database 
    const [billitems,setbillitems] = useState([]);

    // useEffect(async() => {
    //     await axios.get("http://localhost:5000/item").then(res=>{
    //         setitems(res.data);
    //     })
    // }, [additem]);

    function handlechange(e){
        setitem(prev=>{
            return {...prev,[e.target.name]:e.target.value}
        })
    };
 function showadditem(){
    axios.get("http://localhost:5000/item").then(res=>{
        setitems(res.data);
    })
    axios.get("http://localhost:5000/bills").then(res=>{
        setbillitems(res.data);
    })
     setshow(prev=>{
         return !prev ;
     })
 }
function additem(e){
    e.preventDefault();
  if (item.quantity <= 0) {
      alert("values cannot be empty or minuss")
  }else{
    items.forEach(e => {
        if(e.name == item.name){
            setnewitem(prev=>{
                return [...prev ,{name:e.name , quantity:item.quantity , price:(item.quantity * e.price)} ]
            })
        }
    });
  }
};

// useEffect(() => {
//     axios.get("http://localhost:5000/bills").then(res=>{
//         setbillitems(res.data);
//     })
// }, [checkout]);

function checkout(){
  const random =  Math.floor((Math.random() * 1000) + 1);
    const date = new Date();
    const now = date.toLocaleDateString();

 const sum =  newitem.reduce((acc,x)=>{
        return acc += x.price  
 },0)

 axios.post("http://localhost:5000/bills",{billname:"BILL0000"+random ,billdate:now,billprice:sum}).then(res=>{
     alert(res.data);
 })
setTimeout(() => {
    axios.get("http://localhost:5000/bills").then(res=>{
        setbillitems(res.data);
    })
}, 2000);

}

function clear(){
    axios.get("http://localhost:5000/bills").then(res=>{
        setbillitems(res.data);
    })
    setnewitem([]);
}  
 const finalvalue = billitems.reduce((acc,curr)=>{
     return acc += curr.billprice
 },0)

    return (
        <>
        <div className="Items-div">
            <div className="item-main">
            <div className="item-name">
            <h2>New Bill</h2>
            </div>
            <div className="item-price">
            <div onClick={showadditem}>
        <i className="fas fa-plus"></i>
        </div>
            </div>
        </div>
        {newitem.map((item,index)=>{
            return (<div key={index+1} className="item">
            <div className="item-name">
               <h5>{item.name}</h5>
               <p>Quantity : {item.quantity}</p>
            </div>
            <div className="item-price">
                <h5>RS : {item.price}</h5>
            </div>
        </div>)
        })}
        { show && <div className="adding-items-div">
            <h3>select Items</h3>
            <div onClick={showadditem} className="item-close">
                <i className="fas fa-times"></i>
                </div>
             <select onChange={handlechange } name="name">
               {items.map((item,index)=>{
                   return <option key={index+1} value={item.name}> {item.name} </option> })}
            </select>
            <input onChange={handlechange} className="form-control" type="number" name="quantity" id="quantity" placeholder="Quntity" required />
            <button onClick={additem} type="button" className="btn btn-info">Add Item</button>
        </div>  }
        <div className="checkout">
        <button onClick={checkout} type="button" className="btn btn-info">Check Out</button>
        <button onClick={clear} type="button" className="btn btn-danger">Clear All</button>
        </div>
    </div>
    <div className="Items-div">
    <h2>My Bills</h2>
    {billitems.map((item,index)=>{
        return (
       <Mybills key={index+1} billname={item.billname} billdate={item.billdate} billprice={item.billprice} /> )
    })}
</div>
<div className="Items-div">
    <h1>Sales</h1>
<Sales  fvalue={finalvalue} />
</div>
    </>
    )
}

export default Newbill;