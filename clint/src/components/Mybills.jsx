import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function Mybills(props){

    return ( <div className="item">
        <div className="item-name">
           <h5>{props.billname}</h5>
           <p>{props.billdate}</p>
        </div>
        <div className="item-price">
            <h5>RS : {props.billprice}</h5>
        </div>
    </div>)
}

export default Mybills;