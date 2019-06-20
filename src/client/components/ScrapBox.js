import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import Modal from "./RecipeBox";

class ScrapBox extends Component{

    constructor(props){
        super(props);
        this.state={
            visible : false
        }
    }

    openModal() {
        this.setState({
            visible : true
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
    }

    handleScrapDelete = () => {
        console.log("scrap delete click");
        let user_id = Cookies.get('member');
        let recipe_code = this.props.data.recipe_code;
        this.props.onScrapDelete(user_id,recipe_code);
        console.log("scrap box delete : ",user_id, recipe_code);
    }

    render(){
        let current_id = Cookies.get('member');
        console.log(current_id);

        return (
            <div className = "col-md-4 scrap-box" >
                <div className = "card">
                    <div className="card-header" >
                        <h3 className="card-title" >{this.props.data.recipe_name}</h3>
                        <button type="button" className="close" data-dismiss="modal"
                                aria-label="Close" onClick={() => this.handleScrapDelete()}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="card-body">
                        <img src={this.props.data.imgurl} alt="recipe"/>
                        <br/>
                    </div>
                </div>
            </div>
        );
    }
}

ScrapBox.propTypes={
    data: PropTypes.object,
    currentUser: PropTypes.string,
    current_id : PropTypes.string,
    onScrapDelete : PropTypes.scrap
};

ScrapBox.defaultProps = {
    data:{
        recipe_code:'E0040000009a',
        user_id: 'hello'
    },
    currentUser: '',
    onScrapDelete: (user_id, recipe_code) =>{
        console.error('scrap box delete function net defined');
    },
};

export default ScrapBox