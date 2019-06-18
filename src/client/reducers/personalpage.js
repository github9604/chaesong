import * as types from '../actions/ActionType'

const initialState = {
    list: {
        status: 'INIT',
        data: []
    },
    status: {
        valid: false,
        isLoggedIn: false,
        currentUser: ''
    },
    scrap: {
        scrapstatus: 'INIT',
        error : -1
    },
    eat: {
        eatstatus: 'INIT',
        error : -1
    }
};

export default function personalpage (state = initialState, action){
    switch (action.type){

        case types.INFO_LOAD:
          console.log("infolist reducer waiting");
          return{
              ...state,
              list: {
                  ...state.list,
                  status: 'waiting'
              }
          };

        case types.SCRAP_LOAD:
            console.log("scraplist reducer waiting");
            return{
                ...state,
                list: {
                    ...state.list,
                    status: 'waiting'
                }
            };

        case types.INFO_LOAD_SUCCESS:
            console.log("infolist reducer success");
            return{
                ...state,
                status: "SUCCESS",
                data: action.data
            };

        case types.SCRAP_LOAD_SUCCESS:
            console.log("scraplist reducer success");
            if(action.isInitial){
                return{
                    ...state,
                    list: {
                        ...state.list,
                        status: 'SUCCESS',
                        data: action.data
                    }
                }
            } else{
                if(action.listType == 'new'){
                    return{
                        ...state,
                        list: {
                            ...state.list,
                            status: 'SUCCESS',
                            data: [...action.data, ...state.list.data]
                        }
                    }
                }
                else{
                    return {
                        ...state,
                        list: {
                            ...state.list,
                            status: 'SUCCESS',
                            data: [...state.list.data, ...action.data]
                        }
                    }
                }
            }

        case types.INFO_LOAD_FAILURE:
            return{
                ...state,
                list: {
                    ...state.list,
                    status: 'FAILURE'
                }
            };

        case types.SCRAP_LOAD_FAILURE:
            return{
                ...state,
                list: {
                    ...state.list,
                    status: 'FAILURE'
                }
            };

        case types.SCRAP_DELETE:
            console.log("scrap delete reducer waiting");
            return{
                ...state,
                scrap:{
                    scrapstatus: 'WAITING',
                    error : -1
                }
            };
        case types.SCRAP_DELETE_SUCCESS:
            console.log("scrap delete reducer success");
            return{
                ...state,
                scrap:{
                    ...state.scrap,
                    scrapstatus: 'SUCCESS'
                }
            };
        case types.SCRAP_DELETE_FAILURE:
            console.log("scrap delete reducer failure");
            return{
                ...state,
                scrap:{
                    ...state.scrap,
                    scrapstatus: 'FAILURE',
                    error: action.error
                }
            };

        case types.EAT_DELETE:
            console.log("eat delete reducer waiting");
            return{
                ...state,
                eat:{
                    eatstatus: 'WAITING',
                    error : -1
                }
            };
        case types.EAT_DELETE_SUCCESS:
            console.log("eat delete reducer success");
            return{
                ...state,
                eat:{
                    ...state.eat,
                    eatstatus: 'SUCCESS'
                }
            };
        case types.EAT_DELETE_FAILURE:
            console.log("eat delete reducer failure");
            return{
                ...state,
                eat:{
                    ...state.eat,
                    eatstatus: 'FAILURE',
                    error: action.error
                }
            };

        default: return state;
    }
}
