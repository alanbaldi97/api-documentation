import axios from "axios";

class Request{

    static send(options){
        return axios({... options});
    }


}


export default Request;