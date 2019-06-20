import React, {Component} from 'react';
import PropTypes from "prop-types";
import CanvasJSReact from '../../canvasjs.react.js';
import {connect} from "react-redux";
import {eatenListRequest, eatDeleteRequest} from "../actions/personal";
import EatView from "./EatView";
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class NutritionGraph extends Component{

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

        let calorieForDay = this.props.settingData.calorieForDay;
        let age = 2019 - this.props.settingData.birthyear ;
        let PROCNP = 0; let FAT = calorieForDay*0.25/9; let CHOTDF = calorieForDay*0.6/4;
        let CA = 0; let NA = 0; let FE = 0;
        console.log(age + " / " + this.props.settingData.sex);
        if( this.props.settingData.sex === 0){ //여자
            if (age <3){ //0~2
                PROCNP = 15;
                CA = 500;
                NA = 0.9;
                FE = 6;
            }else if (age <6){ //3~5
                PROCNP = 20;
                CA = 600;
                NA = 1.0;
                FE = 6;
            }else if (age <10){ //6~8
                PROCNP = 25;
                CA = 700;
                NA = 1.2;
                FE = 8;
            }else if (age <12){ ///9~11
                PROCNP = 40;
                CA = 800;
                NA = 1.4;
                FE = 10;
            }else if (age <15){ //12~14
                PROCNP = 50;
                CA = 900;
                NA = 1.4;
                FE = 16;
            }else if(age < 19){ //14~18
                PROCNP = 50;
                CA = 800;
                NA = 1.5;
                FE = 14;
            }else if (age <30){ //19~29
                PROCNP = 55;
                CA = 700;
                NA = 1.5;
                FE = 14;
            }else if (age <50){ //30~49
                PROCNP = 50;
                CA = 700;
                NA = 1.5;
                FE = 14;
            }else if (age <65){ //50~64
                PROCNP = 50;
                CA = 800;
                NA = 1.4;
                FE = 8;
            }else if (age <75){ //64~75
                PROCNP = 45;
                CA = 800;
                NA = 1.3;
                FE = 8;
            }else{ //75~
                PROCNP = 45;
                CA = 800;
                NA = 1.1;
                FE = 7;
            }

        }else{
            if (age <3){ //0~2
                PROCNP = 15;
                CA = 500;
                NA = 0.9;
                FE = 6;
            }else if (age <6){ //3~5
                PROCNP = 20;
                CA = 600;
                NA = 1.0;
                FE = 6;
            }else if (age <10){ //6~8
                PROCNP = 30;
                CA = 700;
                NA = 1.2;
                FE = 9;
            }else if (age <12){ ///9~11
                PROCNP = 40;
                CA = 800;
                NA = 1.4;
                FE = 10;
            }else if (age <15){ //12~14
                PROCNP = 55;
                CA = 1000;
                NA = 1.4;
                FE = 14;
            }else if(age < 19){ //14~18
                PROCNP = 65;
                CA = 900;
                NA = 1.5;
                FE = 14;
            }else if (age <30){ //19~29
                PROCNP = 65;
                CA = 800;
                NA = 1.5;
                FE = 100;
            }else if (age <50){ //30~49
                PROCNP = 60;
                CA = 800;
                NA = 1.5;
                FE = 10;
            }else if (age <65){ //50~64
                PROCNP = 60;
                CA = 750;
                NA = 1.4;
                FE = 10;
            }else if (age <75){ //64~75
                PROCNP = 55;
                CA = 700;
                NA = 1.3;
                FE = 9;
            }else{ //75~
                PROCNP = 55;
                CA = 700;
                NA = 1.1;
                FE = 9;
            }
        }
        let greenBar =[];
        let grayBar = [];
        let orangeBar = [];
        let redBar = [];

        if(totalAmount0 <= calorieForDay){
            greenBar.push({label: "칼로리", y: totalAmount0, x:6});
            grayBar.push({label: "칼로리", y: calorieForDay - totalAmount0, x:6});
        }else{
            orangeBar.push({label: "칼로리", y: calorieForDay, x:6});
            redBar.push({label: "칼로리", y: totalAmount0 - calorieForDay, x:6});
        }
        if(totalAmount1 <= PROCNP){
            greenBar.push({label: "단백질", y: totalAmount1, x:5});
            grayBar.push({label: "단백질", y: PROCNP - totalAmount1, x:5});
        }else{
            orangeBar.push({label: "단백질", y: PROCNP, x:5});
            redBar.push({label: "단백질", y: totalAmount1 - PROCNP, x:5});
        }
        if(totalAmount2 <= FAT){
            greenBar.push({label: "지방", y: totalAmount2, x:4});
            grayBar.push({label: "지방", y: FAT - totalAmount2, x:4});
        }else{
            orangeBar.push({label: "지방", y: FAT, x:4});
            redBar.push({label: "지방", y: totalAmount2 - FAT, x:4});
        }
        if(totalAmount3 <= CHOTDF){
            greenBar.push({label: "탄수화물", y: totalAmount3, x:3});
            grayBar.push({label: "탄수화물", y: CHOTDF - totalAmount3, x:3});
        }else{
            orangeBar.push({label: "탄수화물", y: CHOTDF, x:3});
            redBar.push({label: "탄수화물", y: totalAmount3 - CHOTDF, x:3});
        }
        if(totalAmount4 <= CA){
            greenBar.push({label: "칼슘", y: totalAmount4, x:2});
            grayBar.push({label: "칼슘", y: CA - totalAmount4, x:2});
        }else{
            orangeBar.push({label: "칼슘", y: CA, x:2});
            redBar.push({label: "칼슘", y: totalAmount4 - CA, x:2});
        }
        if(totalAmount5/10000 <= NA){
            greenBar.push({label: "나트륨", y: totalAmount5/10000, x:1});
            grayBar.push({label: "나트륨", y: NA - totalAmount5/10000, x:1});
        }else{
            orangeBar.push({label: "나트륨", y: NA, x:1});
            redBar.push({label: "나트륨", y: totalAmount5/10000 - NA, x:1});
        }
        if(totalAmount6 <= FE){
            greenBar.push({label: "철분", y: totalAmount6, x:0});
            grayBar.push({label: "철분", y: FE - totalAmount6, x:0});
        }else{
            orangeBar.push({label: "철분", y: FE, x:0});
            redBar.push({label: "철분", y: totalAmount6 - FE, x:0});
        }
        console.log(greenBar);
        console.log(grayBar);
        console.log(orangeBar);
        console.log(redBar);

        /*let greenBar = [
            {label: "칼로리", y: totalAmount0},
            {label: "단백질", y: totalAmount1},
            {label: "지방", y: totalAmount2},
            {label: "탄수화물", y: totalAmount3},
            {label: "칼슘", y: totalAmount4},
            {label: "나트륨", y: totalAmount5/10000},
            {label: "철분", y: totalAmount6}
        ];

        let grayBar = [
            {label: "칼로리", y: calorieForDay - totalAmount0},
            {label: "단백질", y: PROCNP - totalAmount1},
            {label: "지방", y: FAT - totalAmount2},
            {label: "탄수화물", y: CHOTDF - totalAmount3},
            {label: "칼슘", y: CA - totalAmount4},
            {label: "나트륨", y: NA - (totalAmount5/10000)},
            {label: "철분", y: FE - totalAmount6}
        ];*/

        let options = {
            title: {
                text: " 오늘 섭취한 영양소",
                fontSize: 30,
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
                dataPoints: greenBar
                },
                {
                    type: "stackedBar100",
                    color: "#999",
                    name: "미섭취",
                    showInLegend: true,
                    indexLabel: "{y}",
                    indexLabelFontColor: "white",
                    dataPoints: grayBar
                },
                {
                    type: "stackedBar100",
                    color: "#fbad4c",
                    name: "권장 섭취량",
                    showInLegend: true,
                    indexLabel: "{y}",
                    indexLabelFontColor: "white",
                    dataPoints: orangeBar
                },
                {
                    type: "stackedBar100",
                    color: "#dc3545",
                    name: "초과 섭취량",
                    showInLegend: true,
                    indexLabel: "{y}",
                    indexLabelFontColor: "white",
                    dataPoints: redBar
                }]
        };


        return (
            <div className="col-12">
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
        );

    }
}

NutritionGraph.propTypes = {
    isLoggedIn : PropTypes.bool,
    onLogout: PropTypes.func,
    settingData : PropTypes.object
};

NutritionGraph.defaultProps = {
    isLoggedIn : true,
    onLogout: () => {console.error("logout function not defined")},
    settingData:{
        sex: 0,
        calorieForDay : 2000
    },
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
        eatenListRequest: (isInitial, listType) => {
            return dispatch(eatenListRequest(isInitial, listType));
        },
        eatDeleteRequest : (user_id, ingredient_code, EATEN_DATE, EATEN_TIME, option)=>{
            return dispatch(eatDeleteRequest(user_id, ingredient_code, EATEN_DATE, EATEN_TIME, option))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NutritionGraph);