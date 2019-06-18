import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from "js-cookie";
import jQuery from "jquery";
import FloatingButton from "./FloatingButton";

window.$ = window.jQuery = jQuery;

class Header extends Component {
    constructor(props){
        super(props);
        this.state={
            user_Id : Cookies.get('member'),
            searchWord : "",
            seafoodchecked:true,
            milkchecked:true,
            eggchecked:true,
            seafood : 0,
            milk: 0,
            egg: 0
        }
    }

    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleLogout = (e) => {
        console.log("logout doing");
        this.props.onLogout();
    }

    handleSearch = () => {
        let searchWord = !this.state.searchWord? " ": this.state.searchWord;
        let seafood = this.state.seafoodchecked? 1: 0;
        let milk = this.state.milkchecked? 1:0;
        let egg = this.state.eggchecked? 1:0;
        console.log("container: "+ searchWord);
        console.log("seafood: "  + seafood +"/ milk: " + milk + "/ egg: " + egg);
        this.props.onSearch(searchWord, seafood, milk, egg);
    }

    handleKeyPress = (e) => {
        if(e.charCode==13) {
            this.handleSearch();
        }
    }

    componentDidMount() {
        let toggle_sidebar = false;
        let toggle_topbar = false;
        let nav_open = 0;
        let topbar_open = 0;

        if (!toggle_sidebar) {
            const $toggle = $('.sidenav-toggler');

            $toggle.click(function () {
                if (nav_open == 1) {
                    $('html').removeClass('nav_open');
                    $toggle.removeClass('toggled');
                    nav_open = 0;
                } else {
                    $('html').addClass('nav_open');
                    $toggle.addClass('toggled');
                    nav_open = 1;
                }
            });
            toggle_sidebar = true;
        }
        // 상단 우측 ... 누르면 나오는 검색창
        if (!toggle_topbar) {
            const $topbar = $('.topbar-toggler');

            $topbar.click(function () {
                if (topbar_open == 1) {
                    $('html').removeClass('topbar_open');
                    $topbar.removeClass('toggled');
                    topbar_open = 0;
                } else {
                    $('html').addClass('topbar_open');
                    $topbar.addClass('toggled');
                    topbar_open = 1;
                }
            });
            toggle_topbar = true;
        }
    }

    render(){
        const userID= Cookies.get('member');
        const vegantype = Cookies.get('vegantype');


        const topbar = (
            <div className="navbar-nav topbar-nav ml-md-auto align-items-center">
                <ul className="navbar-nav topbar-nav ml-md-auto align-items-center">
                    <li className="nav-item dropdown hidden-caret">
                        #크롤링
                    </li>
                    <li className="nav-item dropdown hidden-caret">
                        #크롤링
                    </li>
                    <li className="nav-item dropdown">
                        #크롤링
                    </li>
                    <li className="nav-item dropdown">
                        #크롤링
                    </li>
                    <li className="nav-item dropdown">
                        #크롤링
                    </li>
                </ul>
            </div>
        );

        const side_bar = (
            <div className="sidebar">
                <div className="scrollbar-inner sidebar-wrapper">
                    <div className="user">
                        <div className="info">
                            <a className="" data-toggle="collapse" href="#collapseExample" aria-expanded="true">
							<span>
                                {userID} 님
                                <span className="user-level">{vegantype}</span>
                                </span>
                            </a>
                            <div className="clearfix">
                            </div>
                        </div>
                    </div>
                    <ul className="nav">
                        <li className="nav-item">
                            <a href="/settings">
                                <i className="la la-hand-o-up"></i>
                                <p>My Settings</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/personalpage">
                                <i className="la la-bookmark-o">
                                </i>
                                <p>Scrapped Recipe</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/personalgraph">
                                <i className="la la-check-circle-o">
                                </i>
                                <p>Nutritional Status</p>
                            </a>
                        </li>
                        <li className="nav-item update-pro">
                            <a href = "/login">
                            <button data-toggle="modal" data-target="#modalUpdate">
                                <i className="la la-reply">
                                </i>
                                <p>Logout</p>
                            </button>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )

        const HEADER = (
            <div>
                <div className="main-header">
                    <div className="logo-header">
                        <a href="/mainpage"><img src="https://i.imgur.com/WjZwBT5.png" alt="logo"/> </a>
                        <button className="navbar-toggler sidenav-toggler ml-auto" type="button" data-toggle="collapse"
                                data-target="collapse" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon">
                        </span>
                        </button>
                        <button className="topbar-toggler more">
                            <i className="la la-ellipsis-v">
                            </i>
                        </button>
                    </div>
                    <nav className="navbar navbar-header navbar-expand-lg">
                        <div className="container-fluid">
                            <form className="navbar-left navbar-form nav-search mr-md-3 mt-2" action="">
                                <div className="input-group">
                                    <input type="text" placeholder="Search ..."
                                           name="searchWord"
                                           className="form-control"
                                           onChange={this.handleChange}
                                           value={this.state.searchWord}
                                           onKeyPress={this.handleKeyPress}/>
                                    <div className="input-group-append" onClick={() => this.handleSearch()}>
								        <span className="input-group-text">
									    <i className="la la-search search-icon">
                                        </i>
								        </span>
                                    </div>
                                </div>
                            </form>
                            {topbar}
                        </div>
                    </nav>
                </div>
                <FloatingButton/>
                <div >
                    {side_bar}
                </div>
            </div>
        )

        return (
            <div>
                {HEADER}
            </div>
        );
    }
}

Header.propTypes = {
    isLoggedIn: PropTypes.bool,
    searchWord: PropTypes.array,
    onSearch: PropTypes.func,
    history: PropTypes.object,
    onLogout : PropTypes.func
};

Header.defaultProps = {
    isLoggedIn: false,
    searchWord: [],
    onSearch:(searchWord, seafood, milk, egg)=>{console.error("search function is not defined")},
    onLogout: () => {console.error("logout function not defined")},
    history: {}
};



export default Header;

