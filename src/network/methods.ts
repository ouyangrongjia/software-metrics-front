import {postRequest} from "@/network/request";
import {HOST_IP} from "@/config";

export const uploadData = (type: string, data: unknown)=> {
    return postRequest(HOST_IP + type, data)
}
