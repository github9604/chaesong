import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-awesome-modal';
import Cookies from 'js-cookie';
import * as Scroll from 'react-scroll';

class RecommendUserBox extends Component{

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

    handleScrap = () => {
        console.log("scrap click");
        let user_id = Cookies.get('member');
        let recipe_code = this.props.data.recipe_code;
        this.props.onScrap(user_id,recipe_code);
        console.log("scrap recipe box : ",user_id, recipe_code);
    }

    handleEat = () => {
        console.log("eat click");
        let user_id = Cookies.get('member');
        let recipe_code = this.props.data.recipe_code;
        this.props.onEat(user_id,recipe_code, 0);
        console.log("eat recipe box : ",user_id, recipe_code, 0);
    }

    render() {

        const recipeModal = (
            <div>
                <Modal visible={this.state.visible} width="400" height="600" effect="fadeInRight" onClickAway={() => this.closeModal()}>
                    <div className="modal-header bg-primary">
                        <h4 id="modal-title"><i className="la la-smile-o">{this.props.data.recipe_name}</i> </h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.closeModal()}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body text-left element">
                        <img src={this.props.data.imgurl} alt="recipe"/>
                        <p>{this.props.data.content}</p>
                    </div>
                </Modal>
            </div>
        )

        return (
            <div className="col-md-3 recipe-box">
                <div className="card" >
                    <div className="card-header" onClick={() => this.openModal()}>
                        <h3 className="card-title" onClick={() => this.openModal()} >{this.props.data.recipe_name}</h3>
                    </div>
                    <div className="card-body" onClick={() => this.openModal()}>
                        <img src={this.props.data.imgurl} onClick={() => this.openModal()} alt="recipe"/>
                        <br/>
                    </div>
                    <div className="footer">
                        <button id="eatButton" className="btn btn-default btn-sm" onClick={this.handleEat}>
                            먹었음
                        </button>
                        <button id="scrapButton" className="btn btn-default btn-sm" onClick={this.handleScrap}>
                            스크랩
                        </button>
                    </div>
                </div>
                {recipeModal}
            </div>
        );
    }
}

RecommendUserBox .propTypes={
    data: PropTypes.object,
    onScrap: PropTypes.scrap,
    onEat: PropTypes.eat,
    currentUser: PropTypes.string
};

RecommendUserBox .defaultProps={
    data:{
        recipe_id : '315',
        recipe_code: 'B0030000009j',
        recipe_name: '감자튀김',
        content: '',
        imgurl: 'https://i.imgur.com/ryJzBgY.jpg'
    },
    onScrap: (user_id, recipe_code) =>{
        console.error('scrap recipe function net defined');
    },
    onEat: (user_id, recipe_code, option) =>{
        console.error('eat recipe function net defined');
    },
    currentUser: ''
};

export default RecommendUserBox