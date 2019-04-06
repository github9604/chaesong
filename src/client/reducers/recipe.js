import * as types from '../actions/ActionType';

const initialState = {
    list: {
        status: 'INIT',
        data: [],
        isLast: false
    },
    star: {
        status: 'INIT',
        error: -1
    },
    scrap:{
        status : 'INIT',
        error : -1
    },
    status: {
        valid: false,
        isLoggedIn: false,
        currentUser: ''
    }
};

export default function recipe(state = initialState, action) {
    switch (action.type) {
        case types.RECIPE_LIST:
            console.log("recipeviewtest reducer waiting");
            return{
                ...state,
                list: {
                    ...state.list,
                    status : 'WAITING'
                }
            };
        case types.RECIPE_LIST_SUCCESS:
            console.log("recipeviewtest reducer success");
            if(action.isInitial){
                return{
                    ...state,
                    list: {
                        ...state.list,
                        status: 'SUCCESS',
                        data: action.data,
                        isLast : action.data.length <6
                    }
                }
            } else {
                if(action.listType === 'new'){
                    return {
                        ...state,
                        list:{
                            ...state.list,
                            status: 'SUCCESS',
                            data: [...action.data, ...state.list.data]
                        }
                    }
                } else {
                    return {
                        ...state,
                        list:{
                            ...state.list,
                            status: 'SUCCESS',
                            data: [...state.list.data, ...action.data],
                            islast: action.data.length < 6
                        }
                    }
                }
            }
        case types.RECIPE_LIST_FAILURE:
            return{
                ...state,
                list:{
                    ...state.list,
                    status: 'FAILURE'
                }
            };
        case types.RECIPE_SCRAP:
            console.log("scrap reducer");
            return{
                ...state,
                scrap:{
                    status: 'WAITING',
                    error : -1
                }
            };
        case types.RECIPE_SCRAP_SUCCESS:
            console.log("scrap reducer success");
            return{
                ...state,
                scrap:{
                    ...state.scrap,
                    status: 'SUCCESS'
                }
            };
        case types.RECIPE_SCRAP_FAILURE:
            console.log("scrap reducer failure");
            return{
                ...state,
                scrap:{
                    ...state.scrap,
                    status: 'FAILURE',
                    error: action.error
                }
            };
        default : return state;
    }
}
