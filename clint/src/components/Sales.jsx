import axios from "axios";
import React from "react";

function Sales(props){
    return (  
         <div className="item">
            <div className="list">
                 <h3>Today</h3>
                 <h3>{props.fvalue} Rs</h3>
             </div>
              <div className="list">
                 <h3>This Month</h3>
                 <h3>{props.fvalue} Rs</h3>
             </div>
             <div className="list">
                 <h3>This Year</h3>
                 <h3>{props.fvalue} Rs</h3>
             </div>
         </div>)
}

export default Sales;