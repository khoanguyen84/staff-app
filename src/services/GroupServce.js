import { CommonService } from "./CommonService";
import axios from 'axios';
export class GroupService{
    static getGroup(staff){
        return axios.get(`${CommonService.GROUP_API_URL}/${staff.groupId}`);
    }
}