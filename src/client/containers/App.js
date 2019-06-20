import React, { Component } from 'react';
import {Header} from '../components';
import { connect } from 'react-redux';
import { logoutRequest, getStatusRequest } from '../actions/authentication';
import {recipeSearchRequest} from "../actions/recipe";

class App extends Component {

    handleSearch = (searchWord, seafood, milk, egg) =>{
        this.props.recipeSearchRequest(searchWord,seafood,milk,egg);
    };

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout = () => {
        this.props.logoutRequest().then(
            () => {
                console.log("logout");
                let loginData = {
                    _id: '',
                    isLoggedIn: false,
                    user_id: ''
                };
                document.cookie = 'key=' + btoa(JSON.stringify(loginData));
                this.props.history.push('/login');
                return true;
            }
        );
    };

    componentDidMount() { //컴포넌트 렌더링이 맨 처음 완료된 이후에 바로 세션확인
        // get cookie by name
        function getCookie(name) {
            let value = "; " + document.cookie;
            let parts = value.split("; " + name + "=");
            if (parts.length === 2) return parts.pop().split(";").shift();
        }

        // get loginData from cookie
        let loginData = getCookie('key');

        // if loginData is undefined, do nothing
        if(typeof loginData === "undefined") return;

        // decode base64 & parse json
        loginData = JSON.parse(atob(loginData));

        // if not logged in, do nothing
        if(!loginData.isLoggedIn) return;

        // page refreshed & has a session in cookie,
        // check whether this cookie is valid or not
        this.props.getStatusRequest().then(
            () => {
                // if session is not valid
                if(!this.props.status.valid) {
                    // logout the session
                    loginData = {
                        isLoggedIn: false,
                        user_id: ''
                    };

                    document.cookie='key=' + btoa(JSON.stringify(loginData));

                    alert("비로그인 상태입니다.\n로그인 화면으로 이동합니다.");
                    document.location.href = '/login';
                }
            }
        );
    }

    render(){
        let re = /(login|register|Start|recipeview|recommendview)/;
        let isAuth = re.test(this.props.location.pathname);
        return (
            <div>
                {isAuth ? undefined :<Header isLoggedIn={this.props.status.isLoggedIn}
                                             onLogout={this.props.handleLogout}
                                             currentUser = {this.props.currentUser}
                                             onSearch={this.handleSearch}
                                             searchWord={this.props.searchWord}
                                             history={this.props.history}/>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.status,
        errorCode : state.recipe.scrap.error,
        searchWord: state.search.searchWord,
        searchstatus: state.search.status,
        searchData : state.search.data,
        ingredientSearchResults : state.ingredient.ingredient_names
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        recipeSearchRequest:(searchWord, seafood, milk, egg) =>{
            return dispatch(recipeSearchRequest(searchWord, seafood, milk, egg));
        },
        logoutRequest: () => {
            return dispatch(logoutRequest());
        },
        ingredientSearchRequest:(keyword) =>{
            return dispatch(ingredientSearchRequest(keyword));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);