import { CommonService } from "./CommonService";
import axios from "axios";
export class StaffService{
    static getStaffs(){
        return axios.get(`${CommonService.STAFF_API_URL}`);
    }
    static getStaff(staffId){
        return axios.get(`${CommonService.STAFF_API_URL}/${staffId}`);
    }
    static createStaff(staff){
        return axios.post(`${CommonService.STAFF_API_URL}`, staff);
    }
    static updateStaff(staff, staffId){
        return axios.put(`${CommonService.STAFF_API_URL}/${staffId}`, staff);
    }
    static deleteStaff(staffId){
        return axios.delete(`${CommonService.STAFF_API_URL}/${staffId}`);
    }
}