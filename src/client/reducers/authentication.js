import *as types from '../actions/ActionType';

const initialState={
    login: {
        status: 'INIT'
    },
    register: {
        status: 'INIT',
        error: -1
    },
    status: {
        valid: false,
        isLoggedIn: true,
        currentUser: ''
    },
    setting:{
        status: 'INIT',
        data:{}
    }
};

export default function authentication(state = initialState, action) {
    switch (action.type) {
        case types.AUTH_REGISTER:
            console.log('reducer waiting');
            return{
                ...state,
                register: {
                    status: 'WAITING',
                    error: -1
                }
            };
        case types.AUTH_REGISTER_SUCCESS:
            console.log('reducer success');
            return{
                ...state,
                register:{
                    status: 'SUCCESS'
                }
            };
        case types.AUTH_REGISTER_FAILURE:
            console.log('reducer failure');
            return{
                status: 'FAILURE',
                error: action.error
            };
        case types.AUTH_LOGIN:
            return {
                ...state,
                login : {
                    status: 'WAITING'
                }
            };
        case types.AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                login: {
                    status: 'SUCCESS'
                },
                status: {
                    ...state.status,
                    isLoggedIn: true,
                    currentUser: action.user_id
                }
            };
        case types.AUTH_LOGIN_FAILURE:
            return {
                ...state,
                login:{
                    status: 'FAILURE'
                }
            };
        case types.AUTH_GET_STATUS:
            return {
                ...state,
                status: {
                    ...state.status,
                    isLoggedIn: true
                }
            };
        case types.AUTH_GET_STATUS_SUCCESS:
            return {
                ...state,
                status: {
                    ...state.status,
                    valid: true,
                    currentUser: action.user_id
                }
            };
        case types.AUTH_GET_STATUS_FAILURE:
            return {
                ...state,
                status: {
                    ...state.status,
                    valid: false,
                    isLoggedIn: false
                }
            };
        case types.AUTH_LOGOUT:
            return {
                ...state,
                status: {
                    ...state.status,
                    isLoggedIn: false,
                    currentUser: null
                }
            };
        case types.GET_SETTING:
            console.log('getSetting reducer waiting');
            return {
                ...state,
                setting : {
                    status: 'WAITING'
                }
            };
        case types.GET_SETTING_SUCCESS:
            console.log('getSetting reducer success');
            console.log(action.data);
            return {
                ...state,
                setting : {
                    status: 'SUCCESS',
                    data: action.data
                }
            };
        case types.GET_SETTING_FAILURE:
            console.log('getSetting reducer failure');
            return {
                ...state,
                setting : {
                    status: 'FAILURE'
                }
            };
        default:
            return state;
    }
};