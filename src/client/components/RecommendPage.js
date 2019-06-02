import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import {ScrapView} from "./index";
import {scrapListRequest} from "../actions/personal";
import {connect} from "react-redux";

class RecommendPage extends Component{
    constructor(props){
        super(props);
        this.state={
            user_Id : Cookies.get('member'),
        }
    } // cookie
    render(){
        return(
            <div className="main-panel" id="main-panel">
                <div className="content">
                    <div className="container-fluid">
                        <h4 className="page-title">스크랩 레시피</h4>
                        <div className="row">
                            <h3> hello </h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

RecommendPage.propTypes = {
    isLoggedIn : PropTypes.bool,
    onLogout: PropTypes.func
};

RecommendPage.defaultProps = {
    isLoggedIn : false,
    onLogout: () => {console.error("logout function not defined")}
};

export default RecommendPage;