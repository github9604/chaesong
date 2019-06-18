import React, {Component} from 'react';
import {scrapListRequest} from "../actions/personal";
import {connect} from 'react-redux';
import {ScrapPage} from '../components';

class personalview extends Component{

    componentDidMount() {
        this.props.scrapListRequest(true, undefined);
    }



    render(){
              return (
            <div id="main-background">
                <ScrapPage data={this.props.scrapData}
                           currentUser = {this.props.currentUser}
                              />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        scrapData : state.personalpage.list.data,
        listStatus : state.personalpage.list.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        scrapListRequest: (isInitial, listType) => {
            return dispatch(scrapListRequest(isInitial, listType));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(personalview);