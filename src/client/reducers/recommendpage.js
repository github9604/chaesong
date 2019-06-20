import * as types from '../actions/ActionType';

const initialState = {
    status: 'INIT',
    searchWord: [],
    data: [],
    isLast: false,
    recommendinput: {
        status: 'INIT',
        error: -1,
        valid: false,
        isLoggedIn: true
    }
};

export default function recommendpage(state = initialState, action) {
    switch(action.type) {
        case types.RECOMMEND_LIST:
            console.log('recommend list reducers waiting');
            return{
                ...state,
                status: 'WAITING'
            }
        case types.RECOMMEND_LIST_SUCCESS:
            console.log('recommend list reducers success');
            console.log(action.data);
            return{
                ...state,
                status: 'SUCCESS',
                searchWord: action.searchWord,
                data: action.data,
                isLast : action.data.length <6
            }
        case types.RECOMMEND_LIST_FAILURE:
            console.log('recommend list reducers failure');
            return{
                ...state,
                status: 'FAILURE',
                searchWord: []
            }

        case types.RECOMMEND_INSERT:
            console.log('reducer waiting');
            return{
                ...state,
                recommendinput: {
                    status: 'WAITING',
                    error: -1
                }
            };
        case types.RECOMMEND_INSERT_SUCCESS:
            console.log('reducer success');
            return{
                ...state,
               recommendinput:{
                    status: 'SUCCESS'
                }
            };
        case types.RECOMMEND_INSERT_FAILURE:
            console.log('reducer failure');
            return{
                status: 'FAILURE',
                error: action.error
            };
        default:
            return state;
    }
}
