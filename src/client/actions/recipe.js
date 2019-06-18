import axios from 'axios';
import{
    RECIPE_LIST,
    RECIPE_LIST_SUCCESS,
    RECIPE_LIST_FAILURE,
    RECIPE_SCRAP,
    RECIPE_SCRAP_SUCCESS,
    RECIPE_SCRAP_FAILURE,
    RECIPE_EAT,
    RECIPE_EAT_SUCCESS,
    RECIPE_EAT_FAILURE,
    RECIPE_SEARCH,
    RECIPE_SEARCH_SUCCESS,
    RECIPE_SEARCH_FAILURE
} from './ActionType';

export function recipeListRequest(isInitial, listType){
    return (dispatch) => {
        dispatch(recipeList());
        let url = './api/recipe';

        return axios.get(url)
            .then((response)=>{
                console.log("recipevieswtest dispatch success" );
                dispatch(recipeListSuccess(response.data, isInitial, listType));
            }).catch((error) => {
                console.log("recipevieswtest dispatch failure");
                dispatch(recipeListFailure());
            })
    }
}

export function recipeList() {
    return {
        type: RECIPE_LIST
    };
}

export function recipeListSuccess(data, isInitial, listType) {
    return {
        type: RECIPE_LIST_SUCCESS,
        data,
        isInitial,
        listType
    };
}

export function recipeListFailure() {
    return {
        type: RECIPE_LIST_FAILURE
    };
}

export function scrapRequest(user_id, recipe_code) {
    return (dispatch) =>{
        dispatch(recipescrap());

        return axios.post('/api/scrap', {user_id,recipe_code})
            .then((response)=>{
                console.log("post action: ",user_id, recipe_code);
                console.log("scrap dispatch success ");
                dispatch(recipescrapSuccess());
            }).catch((error)=>{
                console.log("scrap dispatch failure");
                dispatch(recipescrapFailure(error.response.data.code));
            });
    }
}

export function recipescrap() {
    return{
        type : RECIPE_SCRAP
    };
}

export function recipescrapSuccess() {
    return{
        type: RECIPE_SCRAP_SUCCESS
    };
}

export function recipescrapFailure(error) {
    return {
        type: RECIPE_SCRAP_FAILURE,
        error
    };
}

export function eatRequest(user_id, ingredient_code, option) {
    return (dispatch) =>{
        dispatch(recipeEat());

        return axios.post('/api/eat', {user_id,ingredient_code,  option})
            .then((response)=>{
                console.log("eat post action: ",user_id, ingredient_code, option);
                console.log("eat dispatch success ");
                dispatch(recipeEatSuccess());
            }).catch((error)=>{
                console.log("eat dispatch failure");
                dispatch(recipeEatFailure(error.response.data.code));
            });
    }
}

export function recipeEat() {
    return{
        type : RECIPE_EAT
    };
}

export function recipeEatSuccess() {
    return{
        type: RECIPE_EAT_SUCCESS
    };
}

export function recipeEatFailure(error) {
    return {
        type: RECIPE_EAT_FAILURE,
        error
    };
}

export function recipeSearchRequest(searchWord, seafood, milk, egg, isInitial, listType){
    return (dispatch) =>{
        dispatch(recipeSearch());

        return axios.get('./api/search/' + searchWord + "/" +seafood+'/'+milk+'/'+egg)
            .then((response)=>{
                console.log("search dispatch success: " + searchWord + "/" +seafood+'/'+milk+'/'+egg);
                dispatch(recipeSearchSuccess(searchWord, seafood, milk, egg, response.data, isInitial, listType));
            }).catch((error) =>{
                console.log("search dispatch failure" );
                dispatch(recipeSearchFailure());
            });
    };
}

export function recipeSearch(){
    return{
        type: RECIPE_SEARCH
    };
}

export function recipeSearchSuccess(searchWord, seafood, milk, egg, data, isInitial, listType){
    return{
        type: RECIPE_SEARCH_SUCCESS,
        searchWord,
        seafood,
        milk,
        egg,
        data,
        isInitial,
        listType
    }
}

export function recipeSearchFailure(){
    return {
        type: RECIPE_SEARCH_FAILURE
    }
}