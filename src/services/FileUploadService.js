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

