import React, {Component} from 'react';
import {RecommendUserBox} from '../components';
import PropTypes from 'prop-types';
import {Search} from '../components';

class RecommendViewTest extends Component{
    render(){

        const mapToComponents = data => {
            return data.map((recipe, i)=>{
                return (
                    <RecommendUserBox
                        data={recipe}
                        key={recipe.recipe_code}
                        index={i}
                        current={this.props.currentUser}
                        onScrap={this.props.onScrap}
                        onEat={this.props.onEat}
                    />

                );
            })
        };

        return(
            <div className="row">
                {mapToComponents(this.props.data)}
            </div>
        );
    }
}

RecommendViewTest.propTypes={
    mode: PropTypes.bool,
    data: PropTypes.array,
    onScrap: PropTypes.func,
    onEat: PropTypes.func,
    onSearch: PropTypes.func,
    history: PropTypes.object
};

RecommendViewTest.defaultProps={
    mode: true,
    data: [],
    onScrap: (user_id,recipe_code) =>{console.error("scrap function is not defined");},
    onEat: (user_id,recipe_code) =>{console.error("eat function is not defined");},
    onSearch:(searchWord, seafood, milk, egg)=>{console.error("search function is not defined")}
};


export default RecommendViewTest;