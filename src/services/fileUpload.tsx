import axios from "axios";
import { PUBLIC_BASE_URL, FILE_UPLOAD_PUBLIC_API_ROUTE } from "@src/services/routes";

export const fileUpload = (data: any) => {

    const token = sessionStorage.getItem("merchantToken");

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    axios.post(`${PUBLIC_BASE_URL}${FILE_UPLOAD_PUBLIC_API_ROUTE}`, data,  {
        headers: headers
    })
    .then(function (response) {
        // console.log('File upload response: ',response.data.data.fileId);
        if(response.statusText) {
            return response.data.data.fileId;
        } else {
            return 'Unable to process file. Please try again.';
        }
    })
    .catch(function (error) {
        return error.response.data.message;
    });
}