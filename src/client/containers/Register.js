import React, {Component} from 'react';
import {Authentication} from '../components';
import {connect} from 'react-redux';
import {registerRequest} from '../actions/authentication';

class Register extends Component{

    handleRegister = (user_id, pw, birthyear, sex, height, weight, active, vegantype) => {
        return this.props.registerRequest(user_id, pw, birthyear, sex, height, weight, active, vegantype).then(
            ()=> {
                if(this.props.status === "SUCCESS"){
                    console.log('container success');
                    this.props.history.push('/login');
                    return true;
                } else {
                    let errorMessage = [
                      'Invalid ID',
                      'Password is too short',
                      'ID already exists'
                    ];
                    alert('회원가입실패');
                    return false;
                }
            }
        )
    }
    render(){
        return (
            <div>
                <Authentication mode={false}
                                onRegister={this.handleRegister}/>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        status: state.authentication.register.status,
        errorCode: state.authentication.register.error
    };
};

const mapDispatchToProps = (dispatch) =>{
  return{
     registerRequest: (user_id, pw, birthyear, sex, height, weight, active, vegantype) =>{
         return dispatch(registerRequest(user_id, pw, birthyear, sex, height, weight, active, vegantype));
     }
  } ;
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);