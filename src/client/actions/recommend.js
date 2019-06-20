import axios from 'axios';
import {
    RECOMMEND_INSERT,
    RECOMMEND_INSERT_SUCCESS,
    RECOMMEND_INSERT_FAILURE,
    RECOMMEND_LIST,
    RECOMMEND_LIST_SUCCESS,
    RECOMMEND_LIST_FAILURE, RECIPE_SEARCH_SUCCESS
} from './ActionType';
import {recipeSearchFailure, recipeSearchSuccess} from "./recipe";

export function recommendInsertRequest(user_id, recipe_code) {
    return (dispatch) => {
        dispatch(recommendInsertList());

        return axios.post('/api/recommendPage/insert', { user_id, recipe_code })
            .then((response) => {
                console.log("recommend dispatch success");
                dispatch(recommendInputSuccess());
            }).catch((error) => {
                console.log("recommend dispatch Failure");
                dispatch(recommendInputFailure(error.response.data.code));
            });
    };
}

export function recommendListRequest(searchWord, seafood, milk, egg, isInitial, listType){
    return (dispatch) => {
        dispatch(recommendList());


        return axios.get('./api/recommendPage/' + searchWord + "/" +seafood+'/'+milk+'/'+egg)
            .then((response)=>{
                console.log("recommend list dispatch success" + searchWord + "/" +seafood+'/'+milk+'/'+egg);
                dispatch(recommendListSuccess(searchWord, seafood, milk, egg, response.data, isInitial, listType));
            }).catch((error) =>{
                console.log("recommend list dispatch failure" );
                dispatch(recommendListFailure());
            });
    }
}

export function recommendList(){
    return {
        type: RECOMMEND_LIST
    };
}

export function recommendInsertList() {
    return {
        type: RECOMMEND_INSERT
    };
}

export function recommendListSuccess(searchWord, seafood, milk, egg, data, isInitial, listType){
    return{
        type: RECOMMEND_LIST_SUCCESS,
        searchWord,
        seafood,
        milk,
        egg,
        data,
        isInitial,
        listType
    }
}

export function recommendInputSuccess() {
    return {
        type: RECOMMEND_INSERT_SUCCESS
    };
}

export function recommendListFailure() {
    return {
        type: RECOMMEND_LIST_FAILURE
    };
}

export function recommendInputFailure() {
    return {
        type: RECOMMEND_INSERT_FAILURE
    };
}
