import { CommonService } from "./CommonService";
import axios from "axios";
export class StaffService{
    static getStaffs(){
        return axios.get(`${CommonService.STAFF_API_URL}`);
    }
    static getStaff(staffId){
        return axios.get(`${CommonService.STAFF_API_URL}/${staffId}`);
    }
}