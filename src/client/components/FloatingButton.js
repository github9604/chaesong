import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jQuery from "jquery";
import Modal from 'react-awesome-modal';
import {ingredientSearchRequest, ingredientEatRequest} from "../actions/ingredient";
import {connect} from "react-redux";
import ReactAutocomplete from 'react-autocomplete';
import Cookies from "js-cookie";
window.$ = window.jQuery = jQuery;

class FloatingButton extends Component {
    constructor(props){
        super(props);
        this.state={
            user_id : Cookies.get('member'),
            values : '',
            visible : false,
            count : 1,
            unit: '',
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

    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    unitChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    componentDidMount(){
        this.props.ingredientSearchRequest(true, undefined);
    }

    handleEat= () =>{
        let user_id = this.state.user_id;
        let value = this.state.value;
        let count = this.state.count;
        let unit = this.state.unit;

        console.log("ingredient eat container " +  user_id + " / " + value + " / " + count  + " / " + unit);
        return this.props.ingredientEatRequest(user_id, value, count, unit).then(
            ()=>{
                if(this.props.eatstatus === "SUCCESS"){
                    console.log("ingredient eat container success");
                    return true;
                }else{
                    console.log("ingredient eat container fail");
                    return false;
                }
            }
        );
    }


    render(){

        const floatingModal = (
            <div>
                <Modal visible={this.state.visible} width="400" height="186" effect="fadeInRight" onClickAway={() => this.closeModal()}>
                    <div className="modal-header bg-success">
                        <h5 id="modal-title">먹은 재료 직접 입력 </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.closeModal()}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div id="auto-complete">
                        <ReactAutocomplete
                            items={this.props.ingredient_names}
                            shouldItemRender={(item, value) => item.ingredient_name.toLowerCase().indexOf(value.toLowerCase()) > -1}
                            getItemValue={item => item.ingredient_name}
                            renderItem={(item, highlighted) =>
                                <div
                                    key={item.ingredient_code}
                                    style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                                >
                                    {item.ingredient_name}
                                </div>
                            }
                            menuStyle={this.props.menuStyle}
                            value={this.state.value}
                            onChange={e => this.setState({ value: e.target.value })}
                            onSelect={value => this.setState({ value })}
                        />
                        <input
                            name="count"
                            type="text"
                            className="validate"
                            placeholder="1"
                            onChange={this.handleChange}
                            value={this.state.count}/>
                        <select className="form-control" name="unit" id="unit"
                                value={this.state.unit} onChange={this.unitChange}>
                            <option selected>단위</option>
                            <option name="unit"
                                    className="validate"
                                    value="0">직접 입력(기본 g)</option>
                            <option name="unit"
                                    className="validate"
                                    value="1">채소 한 줌(50g)</option>
                            <option name="unit"
                                    className="validate"
                                    value="2">말린 재료 한 줌(5g)</option>
                            <option name="unit"
                                    className="validate"
                                    value="3">말린 해산물 한 줌(15g)</option>
                            <option name="unit"
                                    className="validate"
                                    value="4">면 1인분(60g)</option>
                            <option name="unit"
                                    className="validate"
                                    value="5">밀가루 한 컵(100g)</option>
                            <option name="unit"
                                    className="validate"
                                    value="6">밥 한 공기(210g)</option>
                            <option name="unit"
                                    className="validate"
                                    value="7">설탕 한 컵(180g)</option>
                            <option name="unit"
                                    className="validate"
                                    value="8">소금 한 큰술(10g)</option>
                            <option name="unit"
                                    className="validate"
                                    value="9">소금 한 컵(120g)</option>
                            <option name="unit"
                                    className="validate"
                                    value="10">고추장 한 컵(250g)</option>
                            <option name="unit"
                                    className="validate"
                                    value="11">고춧가루 한 컵(100g)</option>
                        </select>
                        <button className="btn btn-default btn-sm" onClick={this.handleEat}>
                            먹었음
                        </button>
                    </div>

                </Modal>
            </div>
        )

        const floatingButton = (
            <div id="floatingbutton">
                <img src="https://i.imgur.com/pLResDr.png" onClick={() => this.openModal()} alt=""/>
            </div>
        )

        return(
            <div>
                {floatingButton}
                {floatingModal}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ingredient_names : state.ingredient.ingredient_names,
        menuStyle : {
            left: '10px',
            top: '110px',
            borderRadius: '3px',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '2px 0',
            fontSize: '90%',
            position: 'fixed',
            overflow: 'auto',
            height: '200px'
            },
        listStatus : state.ingredient.status,
        isLast: state.ingredient.isLast,
        eatstatus: state.ingredient.eat.eatstatus,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        ingredientSearchRequest:(isInitial, listType) =>{
            return dispatch(ingredientSearchRequest(isInitial, listType));
        },
        ingredientEatRequest:(user_id, value, count, unit) =>{
            return dispatch(ingredientEatRequest(user_id, value, count, unit))
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(FloatingButton);