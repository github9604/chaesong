import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {EatBox} from "./index";


class EatView extends Component {
    render(){
        const mapToComponents = data => {
            return data.map((eatenData, i)=>{
                console.log("personal page test map to component");
                return (
                    <EatBox
                        data ={eatenData}
                        key={eatenData.ingredient_code}
                        index={i}
                        current={this.props.currentUser}
                        current_id={this.props.current_id}
                        onEatDelete = {this.props.onEatDelete}
                    />
                );
            })
        };
        return (
            <div>
                {mapToComponents(this.props.data)}
            </div>
        );
    }
}

EatView.propTypes={
    data: PropTypes.array,
    onEatDelete : PropTypes.func,
};
EatView.defaultProps={
    data: [],
    onEatDelete : (user_id, ingredient_code, EATEN_DATE, EATEN_TIME, option) =>{console.error("eat delete function is not defined");}
};

export default EatView;