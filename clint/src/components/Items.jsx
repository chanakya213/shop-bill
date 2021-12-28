import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

function Items(){

const [items,setitems] = useState([]);
const [item,setitem] = useState({name:"" , price:""});
const [show,setshow] = useState(false);

// useEffect this will help us to render all the required data when the component was mounted 
// useEffect( () => {

        // axios.get("http://localhost:5000/item").then(res=>{
        //     setitems(res.data);
        // })
  
// },[additem]);

// this is for collecting the data from user to save in database

  function handlechange(e){
    setitem((prev)=>{
        return {...prev,[e.target.name]:e.target.value}
    });
  };

//   this is for sending data through api Axios
async function additem(){
        if(item.name && item.price){
           await axios.post("http://localhost:5000/item",item).then(res=>{
                alert(res.data);
                setshow(false);
            });

            axios.get("http://localhost:5000/item").then(res=>{
                setitems(res.data);
            })

        }else{
            alert("values cannot be empty");
}
};

     function showadditem(){
        axios.get("http://localhost:5000/item").then(res=>{
            setitems(res.data);
        })
         setshow(prev=>{
             return !prev
         });
     };
    
    return (
        <div className="Items-div">
            <h2>Items</h2>
            {items.map((item,index)=>{
                return (<div key={index+1} className="item">
                <div className="item-name">
                   <h5>{item.name}</h5>
                   <p>Sold : 15</p>
                </div>
                <div className="item-price">
                    <h5>RS : {item.price}</h5>
                </div>
            </div>)
            })}
            <div onClick={showadditem} className="item-add">
            <i className="fas fa-plus"></i>
            </div>
            { show && <div className="adding-items-div">
                <h3>Add Item</h3>
                <div onClick={showadditem} className="item-close">
                <i className="fas fa-times"></i>
                </div>
                <input onChange={handlechange} className="form-control" type="text" name="name" id="name" placeholder="Item - Name" value={item.name} required />
                <input onChange={handlechange} className="form-control" type="text" name="price" id="price" placeholder="Item - Price" value={item.price} required />
                <button onClick={additem} type="button" className="btn btn-info">Add Item</button>
            </div>  }
        </div>
    )
};

export default Items;