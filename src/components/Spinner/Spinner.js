import React from "react";
import ImageSpinner from '../../assets/images/loading.gif';
function Spinner(){
    return (
        <div className="d-flex">
            <img className="avatar-sm m-auto rounded-circle" src={ImageSpinner} alt=""></img>
        </div>
    )
}

export default Spinner;