import React, {Component} from 'react';
import {eatenListRequest} from "../actions/personal";
import {connect} from "react-redux";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import {NutritionGraph, NutritionGraphDetail} from '../components';
import {getSettingRequest} from "../actions/authentication";
import Cookies from "js-cookie";

class PersonalGraph extends Component {

    constructor(props){
        super(props);
        this.state={
            detail: false
        };
    }

    componentDidMount() {
        this.props.eatenListRequest(true, undefined).then(()=>{
            this.props.getSettingRequest(Cookies.get('member'));
        });
    }

    handleSwitch= (e) => {
        console.log("detail:" + this.state.detail);
        this.state.detail? this.setState({detail:false}) : this.setState({detail:true});
    }

render() {
        return (
            <div id="main-background" >
                <div className="main-panel" id="main-panel">
                    <div className="content" id="graph-content">
                        <div className="container-fluid">
                            <div className="title-box">
                                <h4 id="page-title">Nutritional Status </h4>
                                <BootstrapSwitchButton name="switch" checked={this.state.detail} onstyle="success" onChange={this.handleSwitch}/>
                                <p id="nutrition-title">영양소 더 자세히 보기</p>
                            </div>
                            {this.state.detail? <NutritionGraphDetail eatenData={this.props.eatenData}
                                                                      settingData = {this.props.settingData}/>
                                                : <NutritionGraph eatenData={this.props.eatenData}
                                                                  settingData = {this.props.settingData}/>
                            }

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        eatenData : state.personalgraph.list.data,
        listStatus : state.personalgraph.list.status,
        settingStatus: state.authentication.setting.status,
        settingData: state.authentication.setting.data,
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        eatenListRequest: (isInitial, listType) => {
            return dispatch(eatenListRequest(isInitial, listType));
        },
        getSettingRequest: (user_id) =>{
            return dispatch(getSettingRequest(user_id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalGraph);