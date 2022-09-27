import axios from 'axios';
import { CommonService } from "./CommonService";
import sha1 from 'sha1';

class FileUploadService{
    static uploadImage(imageFile){
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", "a09ikbyc");
        return axios.post(CommonService.CLOUDINARY_UPLOAD_API_URL, formData);
    }

    static destroyImage(filename){
        const timestamp = new Date().getTime();
        const public_id = filename;
        const api_key = "338315595645698";
        const api_secret_key = "ymunfk97k5CSvTXtHkL5PSTWCJ4";
        const shaString = `public_id=${public_id}&timestamp=${timestamp}${api_secret_key}`;
        const signature = sha1(shaString)
        const formData = new FormData();
        formData.append("public_id", public_id);
        formData.append("signature", signature);
        formData.append("api_key",api_key);
        formData.append("timestamp", timestamp);
        return axios.post(CommonService.CLOUDINARY_DESTROY_API_URL, formData);
    }
}

export default FileUploadService;