import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api";

class UserService {

    getUsers(){
        return axios.get(USER_API_BASE_URL + '/users');
    }

    createUser(user){
        return axios.post(USER_API_BASE_URL + '/user', user);
    }

    getUserById(userId){
        return axios.get(USER_API_BASE_URL + '/user/' + userId);
    }

    updateUser(user){
        return axios.put(USER_API_BASE_URL + '/user', user);
    }

    deleteUser(userId){
        return axios.delete(USER_API_BASE_URL + '/user/' + userId);
    }

}

export default new UserService();