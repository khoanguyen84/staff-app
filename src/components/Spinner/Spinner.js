import React from "react";
import ImageSpinner from '../../assets/images/spinner.gif';
function Spinner(){
    return (
        <div className="d-flex">
            <img className="m-auto" src={ImageSpinner} alt=""></img>
        </div>
    )
}

export default Spinner;