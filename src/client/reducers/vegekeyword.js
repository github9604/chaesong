import * as types from '../actions/ActionType';

const initialState = {
    list: {
        status: 'INIT',
        data: [],
        isLast: false
    }
};

export default function vegekeyword(state = initialState, action) {
    switch (action.type) {
        case types.RECIPE_LIST:
            console.log("vegekeyword reducer waiting");
            return {
                ...state,
                list: {
                    ...state.list,
                    status: 'WAITING'
                }
            };
        case types.VEGEKEY_LIST_SUCCESS:
            console.log("vegekeyword reducer success");
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
        case types.VEGEKEY_LIST_FAILURE:
            console.log("vegekeyword reducer failure");
            return{
                ...state,
                list:{
                    ...state.list,
                    status: 'FAILURE'
                }
            };
        default : return state;
    }
}