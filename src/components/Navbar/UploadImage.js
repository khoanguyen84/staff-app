import React, { useState } from "react";
import axios from "axios";
function UploadImage(){
    const [selectFile, setSelectFile] = useState("");
    const handleUpload = () => {
        const formData = new FormData();
        formData.append("file", selectFile);
        formData.append("upload_preset", "a09ikbyc");
        axios.post("https://api.cloudinary.com/v1_1/dtxyz2s1g/image/upload", formData)
            .then(res => {
                console.log(res)
            })
    }
    return (
        <div>
            <input type="file" onChange={e => setSelectFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    )
}

export default UploadImage