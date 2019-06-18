import axios from 'axios';
import {
    EATEN_LIST,
    EATEN_LIST_SUCCESS,
    EATEN_LIST_FAILURE,
    SCRAP_LOAD,
    SCRAP_LOAD_SUCCESS,
    SCRAP_LOAD_FAILURE,
    INFO_LOAD,
    INFO_LOAD_SUCCESS,
    INFO_LOAD_FAILURE,
    SCRAP_DELETE,
    SCRAP_DELETE_SUCCESS,
    SCRAP_DELETE_FAILURE,
    EAT_DELETE,
    EAT_DELETE_SUCCESS,
    EAT_DELETE_FAILURE
} from './ActionType';

export function infoListRequest(isInitial){
    return (dispatch) => {
        dispatch(infoList());
        let url = './api/MemberJoin/nowinfo';
        return axios.get(url)
            .then((response) => {
                console.log("now user info dispatch success");
                dispatch(infoLoadSuccess(response.data, isInitial));
            }).catch((error) => {
                console.log("now user info dispatch failure");
                dispatch(infoLoadFailure());
            })
    }
}
export function scrapListRequest(isInitial, listType){
    return (dispatch) => {
        dispatch(scrapList());
        let url = './api/personalpage/scrap';
        return axios.get(url)
            .then((response)=>{
                console.log("scrap list dispatch success");
                dispatch(scrapLoadSuccess(response.data, isInitial, listType));
            }).catch((error) => {
                console.log("scrap list dispatch failure");
                dispatch(scrapLoadFailure());
            })
    }
}

export function eatenListRequest(isInitial, listType){
    return (dispatch) => {
        dispatch(eatenList());
        let url = './api/personalpage/eaten';
        return axios.get(url)
            .then((response)=> {
                console.log("eaten list dispatch success");
                dispatch(eatenLoadSuccess(response.data, isInitial, listType));
            }).catch((error) => {
                console.log("eaten list dispatch failure");
                dispatch(eatenLoadFailure());
            })
    }
}

export function infoList(){
    return{
        type: INFO_LOAD
    }
}
export function scrapList() {
    return {
        type: SCRAP_LOAD
    };
}

export function eatenList() {
    return {
        type: EATEN_LIST
    };
}

export function infoLoadSuccess(data, isInitial){
    return {
        type: INFO_LOAD_SUCCESS,
        data,
        isInitial
    };
}

export function scrapLoadSuccess(data, isInitial, listType) {
    return {
        type: SCRAP_LOAD_SUCCESS,
        data,
        isInitial,
        listType
    };
}

export function eatenLoadSuccess(data, isInitial, listType){
    return {
        type: EATEN_LIST_SUCCESS,
        data,
        isInitial,
        listType
    };
}

export function infoLoadFailure(data, isInitial){
    return{
        type: INFO_LOAD_FAILURE
    }
}
export function scrapLoadFailure() {
    return {
        type: SCRAP_LOAD_FAILURE
    };
}

export function eatenLoadFailure() {
    return{
        type: EATEN_LIST_FAILURE
    };
}

export function scrapDeleteRequest(user_id, recipe_code) {
    return (dispatch) =>{
        dispatch(scrapDelete());

        return axios.post('/api/scrap/delete', {user_id,recipe_code})
            .then((response)=>{
                console.log("post action: ",user_id, recipe_code);
                console.log("scrap dispatch success ");
                dispatch(scrapDeleteSuccess());
            }).catch((error)=>{
                console.log("scrap dispatch failure");
                dispatch(scrapDeleteFailure(error.response.data.code));
            });
    }
}

export function scrapDelete() {
    return{
        type : SCRAP_DELETE
    };
}

export function scrapDeleteSuccess() {
    return{
        type: SCRAP_DELETE_SUCCESS
    };
}

export function scrapDeleteFailure(error) {
    return {
        type: SCRAP_DELETE_FAILURE,
        error
    };
}

export function eatDeleteRequest(user_id, ingredient_code, EATEN_DATE, EATEN_TIME, option) {
    return (dispatch) =>{
        dispatch(eatDelete());

        return axios.post('/api/eat/delete', {user_id,ingredient_code, EATEN_DATE, EATEN_TIME, option})
            .then((response)=>{
                console.log("post action: ",user_id, ingredient_code, EATEN_DATE, EATEN_TIME, option);
                console.log("eat delete dispatch success ");
                dispatch(eatDeleteSuccess());
            }).catch((error)=>{
                console.log("eat delete dispatch failure");
                dispatch(eatDeleteFailure(error.response.data.code));
            });
    }
}

export function eatDelete() {
    return{
        type : EAT_DELETE
    };
}

export function eatDeleteSuccess() {
    return{
        type: EAT_DELETE_SUCCESS
    };
}

export function eatDeleteFailure(error) {
    return {
        type: EAT_DELETE_FAILURE,
        error
    };
}