import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import {ScrapView} from "./index";
import {scrapListRequest, scrapDeleteRequest} from "../actions/personal";

import {connect} from "react-redux";

class ScrapPage extends Component{
    constructor(props){
        super(props);
        this.state={
            user_Id : Cookies.get('member')
        }
    } // cookie

    componentDidMount(){
        this.props.scrapListRequest(true, undefined);
    }

    handleScrapDelete = (user_id, recipe_code) =>{
        console.log("scrap delete container ", user_id, recipe_code);
        return this.props.scrapDeleteRequest(user_id, recipe_code).then(
            ()=>{
                if(this.props.scrapstatus === "SUCCESS"){
                    console.log("scrap delete container success");
                    this.props.scrapListRequest(true, undefined);
                    return true;
                }else{
                    console.log("scrap delete container fail");
                    return false;
                }
            }
        );
    }



    render(){
        return(
            <div className="main-panel" id="main-panel">
                <div className="content">
                    <div className="container-fluid">
                        <h4 className="page-title">스크랩 레시피</h4>
                        <div className="row">
                            <ScrapView data={this.props.scrapData}
                                       currentUser = {this.props.currentUser}
                                       onScrapDelete={this.handleScrapDelete}
                                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ScrapPage.propTypes = {
    isLoggedIn : PropTypes.bool,
    onLogout: PropTypes.func
};

ScrapPage.defaultProps = {
    isLoggedIn : true,
    onLogout: () => {console.error("logout function not defined")}
};

const mapStateToProps = (state) => {
    return{
        scrapData : state.personalpage.list.data,
        listStatus : state.personalpage.list.status,
        scrapstatus: state.personalpage.scrap.scrapstatus
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        scrapListRequest: (isInitial, listType)=>{
            return dispatch(scrapListRequest(isInitial, listType));
        },
        scrapDeleteRequest: (user_id, recipe_code) =>{
            return dispatch(scrapDeleteRequest(user_id, recipe_code));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrapPage);