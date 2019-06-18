import axios from 'axios';
import{
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE,
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGOUT,
    AUTH_GET_STATUS,
    AUTH_GET_STATUS_SUCCESS,
    AUTH_GET_STATUS_FAILURE,
    AUTH_CHANGE,
    AUTH_CHANGE_SUCCESS,
    AUTH_CHANGE_FAILURE,
    GET_SETTING,
    GET_SETTING_SUCCESS,
    GET_SETTING_FAILURE
} from './ActionType';

export function registerRequest(user_id, pw, birthyear, sex, height, weight, active, vegantype) {
    return (dispatch) =>{
        dispatch(register());

        return axios.post('/api/MemberJoin/signup',{user_id, pw, birthyear, sex, height, weight, active, vegantype})
            .then((response)=>{
                console.log("dispatch register success");
                dispatch(registerSuccess());
            }).catch((error)=>{
                console.log("dispatch register failure");
                dispatch(registerFailure(error.response.data.code));
            });
    };
}

export function changeRequest(birthyear, sex, height, weight, active, vegantype){
    return (dispatch) => {
        dispatch(info_change());

        return axios.post('/api/MemberJoin/refreshsignup',{birthyear, sex, height, weight, active, vegantype})
            .then((response)=>{
                console.log("dispatch register success");
                dispatch(registerSuccess());
            }).catch((error)=>{
                console.log("dispatch register failure");
                dispatch(registerFailure(error.response.data.code));
            });
    };

}

export function register() {
    return {
        type: AUTH_REGISTER
    };
}

export function info_change(){
    return {
        type: AUTH_CHANGE
    };
}

export function info_changeSuccess(){
    return {
        type: AUTH_CHANGE_SUCCESS
    };
}
export function registerSuccess() {
    return {
        type: AUTH_REGISTER_SUCCESS
    };
}

export function info_changeFailure(error){
    return{
        type: AUTH_CHANGE_FAILURE,
        error
    };
}

export function registerFailure(error) {
    return {
        type: AUTH_REGISTER_FAILURE,
        error
    };
}
export function loginRequest(user_id, pw) {
    return (dispatch) => {
        // Inform Login API is starting
        dispatch(login());

        // API REQUEST
        return axios.post('/api/MemberLogin/signin', { user_id, pw })
            .then((response) => {
                // SUCCEED
                console.log("dispatch login success");
                dispatch(loginSuccess(user_id));
            }).catch((error) => {
                // FAILED
                console.log("dispatch login fail");
                dispatch(loginFailure());
            });
    };
}

export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(user_id) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        user_id
    };
}

export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}

export function getStatusRequest() {
    return (dispatch) =>{
        return axios.get('/api/MemberLogin/getInfo')
            .then((response) => {
                dispatch(getStatusSuccess(response.data.info.user_id)); //HTTP 틍신을 통해 username을 이옴
            }).catch((error) => {
                dispatch(getStatusFailure());
            });
    }
}

export function getStatus() {
    return {
        type: AUTH_GET_STATUS
    };
}

export function getStatusSuccess(user_id) {
    return {
        type: AUTH_GET_STATUS_SUCCESS,
        user_id
    };
}

export function getStatusFailure() {
    return {
        type: AUTH_GET_STATUS_FAILURE
    };
}

export function logoutRequest(){
    return (dispatch) => {
        return axios.post('/api/MemberLogin/logout')
            .then((response) => {
                console.log("dispatch logout success");
                dispatch(logout());
            });
    }
}

export function logout() {
    return {
        type: AUTH_LOGOUT
    };
}

export function getSettingRequest(user_id) {
    return (dispatch) => {
        // Inform Login API is starting
        dispatch(getSetting());

        // API REQUEST
        return axios.post('/api/mySetting/getSetting', { user_id})
            .then((response) => {
                // SUCCEED
                console.log("getSetting dispatch success");
                console.log(response.data);
                dispatch(getSettingSuccess(response.data));
            }).catch((error) => {
                // FAILED
                console.log("dispatch login fail");
                dispatch(getSettingFailure());
            });
    };
}

export function getSetting() {
    return {
        type: GET_SETTING
    };
}

export function getSettingSuccess(data) {
    return {
        type: GET_SETTING_SUCCESS,
        data
    };
}

export function getSettingFailure() {
    return {
        type: GET_SETTING_FAILURE
    };
}