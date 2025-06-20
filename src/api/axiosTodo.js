import axios from "axios";

const axiosTodo = axios.create({
    baseURL: 'https://684bd070ed2578be881c8df5.mockapi.io/todo',
    headers:{
        'Content-Type': 'application/json'
    }
})

export default axiosTodo