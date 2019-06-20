import axios from 'axios';
import{
    VEGEKEY_LIST,
    VEGEKEY_LIST_SUCCESS,
    VEGEKEY_LIST_FAILURE
} from './ActionType';

export function vegekeyListRequest(isInitial, listType) {
    return (dispatch) =>{
        dispatch(vegekeyList());

        return axios.get('/api/vegeKeyword')
            .then((response)=>{
                console.log("vegeKey dispatch success" );
                //console.log(response.data);
                dispatch(vegekeyListSuccess(response.data, isInitial, listType))
            }).catch((error)=>{
                console.log("vegeKey dispatch failure" );
                dispatch(vegekeyListFailure());
            })

    }

}

export function vegekeyList(){
    return{
        type: VEGEKEY_LIST
    }
}

export function vegekeyListSuccess(data, isInitial, listType) {
    return {
        type: VEGEKEY_LIST_SUCCESS,
        data,
        isInitial,
        listType
    };
}

export function vegekeyListFailure(){
    return{
        type: VEGEKEY_LIST_FAILURE
    }
}