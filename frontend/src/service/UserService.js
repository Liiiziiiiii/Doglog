import $api from "../http";

export default class UserService {
    static fetchUsers(){
        return $api.get("/users")
    }
}

{
    refreshToken 
    accesToken
    name
}