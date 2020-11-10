import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:3000/users";

class UserService {

    getUsers(){
        return axios.get(USER_API_BASE_URL + '/get_users');
    }

    createUser(User){
        return axios.post(USER_API_BASE_URL + '/create_user', User);
    }

    getUserById(UserId){
        return axios.get(USER_API_BASE_URL + '/get_user/' + UserId);
    }

    updateUser(User){
        return axios.put(USER_API_BASE_URL + '/update_user', User);
    }

    deleteUser(UserId){
        return axios.delete(USER_API_BASE_URL + '/delete_user/' + UserId);
    }

}

export default new UserService()