import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {RecommendBox} from '../components';

class RecommendPage extends Component{

    render(){
        const mapToComponents = data => {
            return data.map((recipe, i)=>{
                return (
                    <RecommendBox
                        data={recipe}
                        key={recipe.recipe_code}
                        index={i}
                        current={this.props.currentUser}
                        onRecommend={this.props.onRecommend}
                    />

                );
            })
        };

        return(
            <div>
                {mapToComponents(this.props.data)}
            </div>
        );
    }
}

RecommendPage.propTypes = {
    mode: PropTypes.bool,
    data: PropTypes.array,
    onRecommend: PropTypes.func,
};

RecommendPage.defaultProps = {
    data: [],
    onRecommend: (user_id,recipe_code) =>{console.error("recommend function is not defined");}
};

export default RecommendPage;