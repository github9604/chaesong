import {Component} from "react";
import React from "react";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import {infoListRequest} from "../actions/personal";

class SettingUI extends Component{
    state={
        user_id:"",
        sex:"",
        birthyear:"",
        height:"",
        weight:"",
        active:"",
        vegantype: "",
    }

    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    activeChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    sexChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    vegantypeChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleRegister = () => {
        let birthyear = this.state.birthyear;
        let sex = this.state.sex;
        let height = this.state.height;
        let weight = this.state.weight;
        let active = this.state.active;
        let vegantype = this.state.vegantype;
        console.log("타입" + vegantype +" 활동량 " + active +" 성별 " +sex);

        this.props.onRegister( birthyear, sex, height, weight, active, vegantype).then(
            (result) => {
                if(!result){
                    this.setState({
                        birthyear:"",
                        sex:"",
                        height:"",
                        weight:"",
                        active:"",
                        vegantype:""
                    });
                }
            }
        )
    };

    render(){
        const userID= Cookies.get('member');
        return(
            <div class="main-panel">
                <div class="content">
                    <div class="container-fluid">
                        <h4 class="page-title">My Settings</h4>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label for="id">아이디</label>
                                            <input type="text" name="user_id" class="form-control" id="id" placeholder={userID} disabled/>
                                        </div>
                                        <div class="form-group">
                                            <label for="birthyear">출생연도</label>
                                            <input type="text" name="birthyear" maxlength="4" onChange={this.handleChange}
                                                   value={this.state.birthyear} class="form-control" id="birthyear" />
                                        </div>
                                        <div class="form-check">
                                            <label>성별</label><br />
                                            <label className="form-radio-label">
                                                <input className="form-radio-input" type="radio" name="sex" className="validate"
                                                                                   onChange={this.sexChange}
                                                                                   value="0"/>
                                                <span className="form-radio-sign">여성</span>
                                            </label>
                                            <label className="form-radio-label ml-3">
                                                <input class="form-radio-input" type="radio" name="sex" className="validate"
                                                                                   onChange={this.sexChange}
                                                                                   value="1"/>
                                                <span className="form-radio-sign">남성</span>
                                            </label>
                                        </div>
                                        <div class="form-group">
                                            <label for="height">키 (cm)</label>
                                            <input type="number" class="form-control" id="height" name = "height" onChange={this.handleChange}
                                                   value={this.state.height}/>
                                        </div>
                                        <div class="form-group">
                                            <label for="weight">몸무게 (kg)</label>
                                            <input type="number" class="form-control" id="weight" name = "weight" onChange={this.handleChange}
                                                   value={this.state.weight}/>
                                        </div>
                                        <div class="form-check">
                                            <label>활동량</label><br />
                                            <label class="form-radio-label">
                                                <input class="form-radio-input" type="radio" name="active" className="validate"
                                                       onChange={this.activeChange} value="1"/>
                                                    <span class="form-radio-sign">적다</span>
                                            </label>
                                            <label class="form-radio-label ml-3">
                                                <input class="form-radio-input" type="radio" name="active" className="validate"
                                                       onChange={this.activeChange} value="2"/>
                                                    <span class="form-radio-sign">보통이다</span>
                                            </label>
                                            <label class="form-radio-label ml-3">
                                                <input class="form-radio-input" type="radio"  name="active" className="validate"
                                                       onChange={this.activeChange} value="3"/>
                                                    <span class="form-radio-sign">많다</span>
                                            </label>
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleFormControlSelect1">채식타입</label>
                                            <select value={this.state.vegantype} onChange={this.vegantypeChange} className="form-control" name="vegantype" id="exampleFormControlSelect1 ">
                                                <option selected>채식타입을 선택해주세요!</option>
                                                <option name="vegantype" value="1">페스코 베지테리언</option>
                                                <option name="vegantype" value="2">락토오보 베지테리언</option>
                                                <option name="vegantype" value="3">락토 베지테리언</option>
                                                <option name="vegantype" value="4">오보 베지테리언</option>
                                                <option name="vegantype" value="5">비건</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="card-action" align="center">
                                        <button class="btn btn-default">Cancel</button>
                                        <button class="btn btn-success" onClick={this.handleRegister}>Edit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                </div>
            </div>
        )
    }
}

SettingUI.propTypes={
    info_data: PropTypes.object,
    onRegister: PropTypes.func
};

SettingUI.defaultProps={
    info_data:{

    },
    onRegister: (birthyear, sex, height, weight, active, vegantype) => { console.error("register function is not defined"); },
};

export default SettingUI;