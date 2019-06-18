import *as types from '../actions/ActionType';

const initialState = {
    status: 'INIT',
    ingredient_names: [],
    isLast : false,
    eat:{
        eatstatus : 'INIT',
        error : -1
    },
};

export default function search(state = initialState, action) {
    switch(action.type) {
        case types.INGREDIENT_SEARCH:
            console.log("ingredient search reducer waiting");
            return {
                ...state,
                status: 'WAITING'
            }
        case types.INGREDIENT_SEARCH_SUCCESS:
            console.log("ingredient search reducer success");
            return {
                ...state,
                status: 'SUCCESS',
                ingredient_names: action.ingredient_names
            }
        case types.INGREDIENT_SEARCH_FAILURE:
            console.log("ingredient search reducer failure");
            return {
                ...state,
                status: 'FAILURE',
                ingredient_names: []
            }
        case types.INGREDIENT_EAT:
            console.log("INGREDIENT EAT reducer waiting");
            return{
                ...state,
                eat:{
                    eatstatus: 'WAITING',
                    error : -1
                }
            };
        case types.INGREDIENT_EAT_SUCCESS:
            console.log("INGREDIENT EAT reducer success");
            return{
                ...state,
                eat:{
                    ...state.eat,
                    eatstatus: 'SUCCESS'
                }
            };
        case types.INGREDIENT_EAT_FAILURE:
            console.log("INGREDIENT EAT reducer failure");
            return{
                ...state,
                eat:{
                    ...state.eat,
                    eatstatus: 'FAILURE',
                    error: action.error
                }
            };
        default:
            return state;
    }
}
