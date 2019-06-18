import React, {Component} from 'react';
import {eatenListRequest} from "../actions/personal";
import {connect} from "react-redux";
import {NutritionGraph} from '../components';
import EatView from "../components/NutritionGraph";

class PersonalGraph extends Component {

    componentDidMount() {
        this.props.eatenListRequest(true, undefined);
    }



render() {
        return (
            <div id="main-background" >
                <NutritionGraph data={this.props.eatenData}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        eatenData : state.personalgraph.list.data,
        listStatus : state.personalgraph.list.status,

    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        eatenListRequest: (isInitial, listType) => {
            return dispatch(eatenListRequest(isInitial, listType));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalGraph);