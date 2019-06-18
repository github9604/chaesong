import React, {Component} from 'react';
import PropTypes from "prop-types";
import CanvasJSReact from '../../canvasjs.react.js';
import {connect} from "react-redux";
import {eatenListRequest, eatDeleteRequest} from "../actions/personal";
import EatView from "./EatView";
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class NutritionGraph extends Component{

    componentDidMount(){
        this.props.eatenListRequest(true, undefined);
    }

    handleEatDelete = (user_id, ingredient_code, EATEN_DATE, EATEN_TIME, option) =>{
        console.log("eat delete container ", user_id, ingredient_code, EATEN_DATE, EATEN_TIME, option);
        return this.props.eatDeleteRequest(user_id, ingredient_code, EATEN_DATE, EATEN_TIME, option).then(
            ()=>{
                if(this.props.eatStatus === "SUCCESS"){
                    console.log("eat delete container success");
                    this.props.eatenListRequest(true, undefined);
                    return true;
                }else{
                    console.log("eat delete container fail");
                    return false;
                }
            }
        );
    }

    render(){
        function sumProperty(arr, type) {
            return arr.reduce((total, obj) =>{
                if(typeof obj[type] == 'string') {
                    return total + Number(obj[type]);
                }
                return total + Number(obj[type]);
            }, 0);
        }

        let input = ["ENERGY", "PROCNP", "FAT", "CHOTDF", "CA", "NA", "FE"];

        let totalAmount0 = parseInt(sumProperty(this.props.eatenData, input[0]));
        let totalAmount1 = parseInt(sumProperty(this.props.eatenData, input[1]));
        let totalAmount2 = parseInt(sumProperty(this.props.eatenData, input[2]));
        let totalAmount3 = parseInt(sumProperty(this.props.eatenData, input[3]));
        let totalAmount4 = parseInt(sumProperty(this.props.eatenData, input[4]));
        let totalAmount5 = parseInt(sumProperty(this.props.eatenData, input[5]));
        let totalAmount6 = parseInt(sumProperty(this.props.eatenData, input[6]));


        let options = {
            title: {
                text: " 오늘 섭취한 영양소"
            },
            toolTip: {
                shared: true
            },
            legend: {
                verticalAlign: "top"
            },
            axisY: {
                labelFormatter : "",
                valueFormatString: "",
                gridThickness: 0
            },
            backgroundColor: 'transparent',
            data: [{
                type: "stackedBar100",
                color: "#4CAF50",
                name: "섭취",
                showInLegend: true,
                indexLabel: "{y}",
                indexLabelFontColor: "white",
                dataPoints: [
                    {label: "칼로리", y: totalAmount0},
                    {label: "단백질", y: totalAmount1},
                    {label: "지방", y: totalAmount2},
                    {label: "탄수화물", y: totalAmount3},
                    {label: "칼슘", y: totalAmount4},
                    {label: "나트륨", y: totalAmount5/10000},
                    {label: "철분", y: totalAmount6}
                ]
            },
                {
                    type: "stackedBar100",
                    color: "#999",
                    name: "미섭취",
                    showInLegend: true,
                    indexLabel: "{y}",
                    indexLabelFontColor: "white",
                    dataPoints: [
                        {label: "칼로리", y: (2100-totalAmount0 > 0) ? 2100-totalAmount0 : 0},
                        {label: "단백질", y: 100-totalAmount1},
                        {label: "지방", y: 100-totalAmount2},
                        {label: "탄수화물", y: 100-totalAmount3},
                        {label: "칼슘", y: 650-totalAmount4},
                        {label: "나트륨", y: 1.5-(totalAmount5/10000)},
                        {label: "철분", y: 14-totalAmount6}
                    ]
                }]
        };


        return (
            <div className="main-panel" id="main-panel">
                <div className="content" id="graph-content">
                    <div className="container-fluid">
                        <h4 className="page-title">Nutritional Status </h4>
                        <div className="row row-card-no-pd">
                            <div className = "col-md-12">
                                <CanvasJSChart options={options} />
                            </div>
                        </div>
                        <h4> 오늘 먹은 음식 </h4>
                        <EatView data={this.props.eatenData}
                                 currentUser = {this.props.currentUser}
                                 onEatDelete={this.handleEatDelete}
                        />
                    </div>
                </div>
            </div>
        );

    }
}

NutritionGraph.propTypes = {
    isLoggedIn : PropTypes.bool,
    onLogout: PropTypes.func
};

NutritionGraph.defaultProps = {
    isLoggedIn : true,
    onLogout: () => {console.error("logout function not defined")}
};

const mapStateToProps = (state) => {
    return{
        eatenData : state.personalgraph.list.data,
        listStatus : state.personalgraph.list.status,
        eatStatus : state.personalpage.eat.eatstatus
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        eatenListRequest: (isInitial, listType)=>{
            return dispatch(eatenListRequest(isInitial, listType));
        },
        eatDeleteRequest : (user_id, ingredient_code, EATEN_DATE, EATEN_TIME, option)=>{
            return dispatch(eatDeleteRequest(user_id, ingredient_code, EATEN_DATE, EATEN_TIME, option))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NutritionGraph);