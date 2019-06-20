import React, { Component } from 'react';
import {connect} from 'react-redux';
import {RecommendPage} from '../components';
import {recipeListRequest} from "../actions/recipe";
import {recommendInsertRequest} from "../actions/recommend";

class recommendview extends Component {

    handlesubmit = () => {
        this.props.history.push('/MainPage');
    }

    handleRecommend= (user_id, recipe_code) =>{
        console.log("eat container ", user_id, recipe_code);
        return this.props.recommendInsertRequest(user_id, recipe_code).then(
            ()=>{
                if(this.props.status === "SUCCESS"){
                    console.log("recommend input success");
                    return true;
                }else{
                    console.log("recommend input fail");
                    return false;
                }
            }
        );
    }

    componentDidMount(){
        this.props.recipeListRequest(true, undefined);
    }

    render() {
        return (
            <div id="select_page">
                <button type="button" class="btn btn-outline-default btn-rounded waves-effect" onClick={this.handlesubmit}>
                    <p>제출</p>
                </button>

                <RecommendPage data={this.props.recipeData}
                               onRecommend={this.handleRecommend}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        recipeData : state.recipe.list.data
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        recipeListRequest: (isInitial, listType)=>{
            return dispatch(recipeListRequest(isInitial, listType));
        },
        recommendInsertRequest: (user_id, recipe_code) => {
            return dispatch(recommendInsertRequest(user_id, recipe_code));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(recommendview);