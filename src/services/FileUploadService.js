import axios from 'axios';
import { CommonService } from "./CommonService";

class FileUploadService{
    static uploadImage(imageFile){
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", "a09ikbyc");
        return axios.post(CommonService.CLOUDINARY_API_URL, formData);
    }
}

export default FileUploadService;



// const timestamp = new Date().getTime()
// const string = `public_id=${<Add public_id>}&timestamp=${timestamp}<add your api secret>`
// const signature = await sha1(string)
// const formData = new FormData()
// formData.append("public_id",<public_id>)
// formData.append("signature",signature)
// formData.append("api_key",<your api_key>)
// formData.append("timestamp",timestamp)
// const res = await ax.post("https://api.cloudinary.com/v1_1/<your cloud name>/image/destroy", formData) 