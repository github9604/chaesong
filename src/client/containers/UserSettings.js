import {connect} from "react-redux";
import React, {Component} from 'react';
import {SettingUI} from '../components';
import {infoListRequest} from "../actions/personal";
import {changeRequest, getSettingRequest} from "../actions/authentication";
import Cookies from "js-cookie";

class UserSettings extends  Component{



    handleRegister = (birthyear, sex, height, weight, active, vegantype) => {
        return this.props.changeRequest(birthyear, sex, height, weight, active, vegantype).then(
            () => {
                if(this.props.updateStatus === 'SUCCESS'){
                    alert('개인정보가 수정되었습니다.');
                    document.location.href = '/mainpage';
                    return true;
                }else{
                    alert('개인정보 수정에 실패했습니다.');
                }
            }
        )
    };


    render(){
        return (
            <div>
                <SettingUI
                           onRegister={this.handleRegister}/>
            </div>
        );

    }

}

const mapStateToProps = (state) =>{
    return{
        infoData : state.personalpage.list.data,
        updateStatus : state.authentication.register.status,
    };
};

const mapDispatchToProps = (dispatch) =>{
    return{
        infoListRequest: (isInitial) =>{
            return dispatch(infoListRequest(isInitial));
        },
        changeRequest: (birthyear, sex, height, weight, active, vegantype) =>{
            return dispatch(changeRequest(birthyear, sex, height, weight, active, vegantype));
        }
    } ;
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);