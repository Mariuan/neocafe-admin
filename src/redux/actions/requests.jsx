import axios from "axios"

export const login = async (data) => {
    const response = await axios.post('https://neocafe6.herokuapp.com/login', {
        "phone": data.phone,
        "code": data.code
    }).catch((err)=>console.log(err));
    return await response;
}