import {Component} from "react";
import React from "react";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import {getSettingRequest} from "../actions/authentication";
import {connect} from "react-redux";

class SettingUI extends Component{

    constructor(props){
        super(props);
        this.state={
            sex:"",
            birthyear:"",
            height:"",
            weight:"",
            active:"",
            vegantype: "",
        };
    }

    componentDidMount() {
        console.log("componentDidmount SettingUI");
        this.props.getSettingRequest(Cookies.get('member')).then(
            ()=>{
                if(this.props.settingStatus === "SUCCESS"){
                    console.log("get container success");
                    this.setState({
                        sex: String(this.props.settingData.sex),
                        birthyear:this.props.settingData.birthyear,
                        height:this.props.settingData.height,
                        weight:this.props.settingData.weight,
                        active:String(this.props.settingData.active),
                        vegantype: String(this.props.settingData.vegantype)
                    });
                    return true;
                }else{
                    console.log("get container fail");
                    return false;
                }
            }
        );
    }

    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    activeChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        console.log('active change' + e.target.value);
        this.setState(nextState);
    }

    sexChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        console.log('sex change' + e.target.value);
        this.setState(nextState);
    }
    vegantypeChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        console.log('vegantype change' + e.target.value);
        this.setState(nextState);
    }

    handleRegister = () => {

        console.log("타입" + vegantype +" 활동량 " + active +" 성별 " +sex);
        console.log("타입" + vegantype+" 활동량 " + active +" 성별 " +sex);
        Cookies.remove('vegantype');
        switch (vegantype) {
            case '1':
                console.log("change to pesco");
                Cookies.set('vegantype', '페스코 베지테리언');
                break;
            case '2':
                console.log("change to lactoovo");
                Cookies.set('vegantype', '락토 오보 베지테리언');
                break;
            case '3':
                console.log("change to ovo");
                Cookies.set('vegantype', '오보 베지테리언');
                break;
            case '4':
                console.log("change to lacto");
                Cookies.set('vegantype', '락토 베지테리언');
                break;
            case '5':
                console.log("change to vegan");
                Cookies.set('vegantype', '비건');
                break;
            default:
                console.log("case error");
                break;
        }

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
            <div className="main-panel">
                <div className="content">
                    <div className="container-fluid">
                        <h4 className="page-title">My Settings</h4>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label for="id">아이디</label>
                                            <input type="text" name="user_id" className="form-control" id="id" placeholder={userID} disabled/>
                                        </div>
                                        <div className="form-group">
                                            <label for="birthyear">출생연도</label>
                                            <input type="text" name="birthyear" maxlength="4" onChange={this.handleChange}
                                                   value={this.state.birthyear} className="form-control" id="birthyear" />
                                        </div>
                                        <div className="form-check">
                                            <label>성별</label><br />
                                            <label className="form-radio-label">
                                                <input className="form-radio-input" type="radio" name="sex"
                                                       checked={this.state.sex === "0"}   onChange={this.sexChange}
                                                                                   value="0"/>
                                                <span className="form-radio-sign">여성</span>
                                            </label>
                                            <label className="form-radio-label ml-3">
                                                <input className="form-radio-input" type="radio" name="sex"
                                                       checked={this.state.sex === "1"}  onChange={this.sexChange}
                                                                                   value="1"/>
                                                <span className="form-radio-sign">남성</span>
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label for="height">키 (cm)</label>
                                            <input type="number" className="form-control" id="height" name = "height" onChange={this.handleChange}
                                                   value={this.state.height}/>
                                        </div>
                                        <div className="form-group">
                                            <label for="weight">몸무게 (kg)</label>
                                            <input type="number" className="form-control" id="weight" name = "weight" onChange={this.handleChange}
                                                   value={this.state.weight}/>
                                        </div>
                                        <div className="form-check">
                                            <label>활동량</label><br />
                                            <label className="form-radio-label">
                                                <input className="form-radio-input" type="radio" name="active"
                                                       checked={this.state.active === "1"} onChange={this.activeChange} value="1"/>
                                                    <span className="form-radio-sign">적다</span>
                                            </label>
                                            <label className="form-radio-label ml-3">
                                                <input className="form-radio-input" type="radio" name="active"
                                                       checked={this.state.active === "2"} onChange={this.activeChange} value="2"/>
                                                    <span class="form-radio-sign">보통이다</span>
                                            </label>
                                            <label className="form-radio-label ml-3">
                                                <input className="form-radio-input" type="radio"  name="active"
                                                       checked={this.state.active === "3"} onChange={this.activeChange} value="3"/>
                                                    <span className="form-radio-sign">많다</span>
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label for="exampleFormControlSelect1">채식타입</label>
                                            <select className="form-control" name="vegantype" id="exampleFormControlSelect1 "
                                                    value={this.state.vegantype} onChange={this.vegantypeChange}>
                                                <option selected>채식타입을 선택해주세요!</option>
                                                <option name="vegantype"
                                                        className="validate"
                                                        value="1">페스코 베지테리언</option>
                                                <option name="vegantype"
                                                        className="validate"
                                                        value="2">락토오보 베지테리언</option>
                                                <option name="vegantype"
                                                        className="validate"
                                                        value="3">오보 베지테리언</option>
                                                <option name="vegantype"
                                                        className="validate"
                                                        value="4">락토 베지테리언</option>
                                                <option name="vegantype"
                                                        className="validate"
                                                        value="5">비건</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="card-action" align="center">
                                        <button className="btn btn-default">Cancel</button>
                                        <button className="btn btn-success" onClick={this.handleRegister}>Edit</button>
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

const mapStateToProps = (state) =>{
    return{
        settingStatus: state.authentication.setting.status,
        settingData: state.authentication.setting.data,
    };
};

const mapDispatchToProps = (dispatch) =>{
    return{
        getSettingRequest: (user_id) =>{
            return dispatch(getSettingRequest(user_id));
        }
    } ;
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingUI);