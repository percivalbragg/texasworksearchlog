import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api";

class WorkSearchLogService {

    getWorkSearcLogByIdAndUserId(userId, wslId) {
        return axios.get(USER_API_BASE_URL + '/user/userId/' + userId + '/log/' + wslId);
    }

    getWorkSearchLogById(id) {
        return axios.get(USER_API_BASE_URL + '/log/' + id);
    }

    getWorkSearchLogsByUserId(userId) {
        return axios.get(USER_API_BASE_URL + '/user/' + userId + '/logs');
    }

    createWorkSearchLog(userId, workSearchLog) {
        return axios.post(USER_API_BASE_URL + '/user/' + userId + '/log', workSearchLog);
    }

    updateWorkSearchLog(userId, id, workSearchLog) {
        return axios.put(USER_API_BASE_URL + '/user/' + userId + '/log/' + id, workSearchLog);
    }

    deleteWorkServiceLog(id){
        return axios.delete(USER_API_BASE_URL + '/log/' + id);
    }

}

export default new WorkSearchLogService();