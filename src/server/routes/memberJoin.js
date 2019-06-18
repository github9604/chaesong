const express = require("express");
const router = express.Router();
const cors = require("cors");

const Sequelize = require("sequelize");

const sequelize = new Sequelize('chaesongdb', 'comhong', 'sook2019', {
        host: "chaesong.cccteklwfdo9.ap-northeast-2.rds.amazonaws.com",
        dialect: 'mysql',
        operatorsAliases: false,
        pool:{
            max:5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

const MemberJoin = sequelize.define(
    'memberJoin',
    {
        user_id: {
            type:Sequelize.STRING,
            primaryKey: true
        },
        pw:{
            type: Sequelize.STRING
        },
        birthyear:{
            type: Sequelize.INTEGER
        },
        height:{
            type: Sequelize.INTEGER
        },
        weight:{
            type: Sequelize.INTEGER
        },
        active:{
            type: Sequelize.INTEGER
        },
        register_date:{
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        vegantype:{
            type: Sequelize.INTEGER
        },
        calorieForDay:{
            type: Sequelize.INTEGER
        },
        sex:{
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false
    }
);

router.use(cors());

router.get('/nowinfo', (req, res) => {
    let session = req.session;
    let new_query = 'SELECT * FROM memberJoins WHERE memberJoins.user_id = :now_user';
    let values = {
        now_user: session.loginInfo.user_id
    };
    sequelize.query(new_query, {replacements: values, model: MemberJoin})
        .then(memberJoins => {return res.json(memberJoins);})
})

router.post('/refreshsignup', (req, res) => {

    let new_calorieForDay = 0;

    const grantStandWeight = (height) => {
        let standWeight;
        if(height < 150) { standWeight = height - 100; }
        else if(height >= 150 && height < 160) { standWeight = (height - 150) / 2 + 50; }
        else if(height >= 160) { standWeight = (height - 100) * 0.9; }
        return standWeight;
    }
    const grantWeightRange = (weight, standWeight) => {
        let overweightPercent = weight / standWeight * 100.0;
        if (overweightPercent <= 90) { return 1; } //저체중
        else if (overweightPercent >= 90 && overweightPercent < 110) { return 2;	} //정상
        else if (overweightPercent >= 110 && overweightPercent < 120) { return 3; } //과체중
        else if (overweightPercent >= 120 && overweightPercent < 140) { return 4; } //비만
        else if (overweightPercent > 140) { return 5; } //심한 비만
    }
    //1kg당 필요한 칼로리(requiredCalPerKg)는 체중범위(weightRange)와 활동량(active)으로 측정한다
    const grantRequiredCalPerKg = (weightRange, active) => {
        let requiredCalPerKg;
        if(weightRange >= 3) {
            switch(active) {
                case "1": requiredCalPerKg = 22.5; break;
                case "2": requiredCalPerKg = 27.5; break;
                case "3": requiredCalPerKg = 32.5; break;
            }
        }
        else if(weightRange === 2) {
            switch(active) {
                case "1": requiredCalPerKg = 27.5; break;
                case "2": requiredCalPerKg = 32.5; break;
                case "3": requiredCalPerKg = 37.5; break;
            }
        }
        else if(weightRange === 1) {
            switch(active) {
                case "1": requiredCalPerKg = 32.5; break;
                case "2": requiredCalPerKg = 37.5; break;
                case "3": requiredCalPerKg = 42.5; break;
            }
        }
        return requiredCalPerKg;
    }
    const calorieForDay = (height, weight, active) => {
        let standWeight = grantStandWeight(height);
        let weightRange = grantWeightRange(weight, standWeight);
        let totalCalRequired = weight * grantRequiredCalPerKg(weightRange, active);
        return totalCalRequired;
    }

    new_calorieForDay = calorieForDay(req.body.height, req.body.weight, req.body.active);

    let session = req.session;
    let new_query = 'UPDATE memberJoins SET memberJoins.weight = :now_weight, memberJoins.calorieForDay = :now_calorieForDay, memberJoins.active = :now_active, memberJoins.vegantype = :now_vegantype, memberJoins.birthyear = :now_birth, memberJoins.height = :now_height, memberJoins.sex = :now_sex WHERE memberJoins.user_id = :now_user';
    let values = {
        now_user: session.loginInfo.user_id,
        now_height: req.body.height,
        now_birth: req.body.birthyear,
        now_weight: req.body.weight,
        now_active : req.body.active,
        now_vegantype : req.body.vegantype,
        now_sex : req.body.sex,
        now_calorieForDay : new_calorieForDay
    };
    sequelize.query(new_query, {replacements: values})
        .then(memberJoins => {return res.json(memberJoins);})

});

router.post('/signup', (req, res)=>{
   const today = new Date();
   const memberData = {
       user_id : req.body.user_id,
       pw: req.body.pw,
       birthyear: req.body.birthyear,
       sex: req.body.sex,
       height: req.body.height,
       weight: req.body.weight,
       active: req.body.active,
       register_date: today,
       vegantype: req.body.vegantype,
       calorieForDay : 0
   };
   console.log(memberData.vegantype+" / " + memberData.sex);

    const grantStandWeight = (height) => {
        let standWeight;
        if(height < 150) { standWeight = height - 100; }
        else if(height >= 150 && height < 160) { standWeight = (height - 150) / 2 + 50; }
        else if(height >= 160) { standWeight = (height - 100) * 0.9; }
        return standWeight;
    }
    const grantWeightRange = (weight, standWeight) => {
        let overweightPercent = weight / standWeight * 100.0;
        if (overweightPercent <= 90) { return 1; } //저체중
        else if (overweightPercent >= 90 && overweightPercent < 110) { return 2;	} //정상
        else if (overweightPercent >= 110 && overweightPercent < 120) { return 3; } //과체중
        else if (overweightPercent >= 120 && overweightPercent < 140) { return 4; } //비만
        else if (overweightPercent > 140) { return 5; } //심한 비만
    }
    //1kg당 필요한 칼로리(requiredCalPerKg)는 체중범위(weightRange)와 활동량(active)으로 측정한다
    const grantRequiredCalPerKg = (weightRange, active) => {
        let requiredCalPerKg;
        if(weightRange >= 3) {
            switch(active) {
                case "1": requiredCalPerKg = 22.5; break;
                case "2": requiredCalPerKg = 27.5; break;
                case "3": requiredCalPerKg = 32.5; break;
            }
        }
        else if(weightRange === 2) {
            switch(active) {
                case "1": requiredCalPerKg = 27.5; break;
                case "2": requiredCalPerKg = 32.5; break;
                case "3": requiredCalPerKg = 37.5; break;
            }
        }
        else if(weightRange === 1) {
            switch(active) {
                case "1": requiredCalPerKg = 32.5; break;
                case "2": requiredCalPerKg = 37.5; break;
                case "3": requiredCalPerKg = 42.5; break;
            }
        }
        return requiredCalPerKg;
    }
    const calorieForDay = (height, weight, active) => {
        let standWeight = grantStandWeight(height);
        let weightRange = grantWeightRange(weight, standWeight);
        let totalCalRequired = weight * grantRequiredCalPerKg(weightRange, active);
        return totalCalRequired;
    }


    memberData.calorieForDay = calorieForDay(req.body.height, req.body.weight, req.body.active);

    let userIDRegex = /^[a-z0-9]+$/;

    if(!userIDRegex.test(req.body.user_id)) {
        return res.status(400).json({ // HTTP 요청에 대한 리스폰스 (json 형식으로)
            error: "BAD USERNAME",
            code: 1
        });
    }

    // CHECK PASS LENGTH
    // 비밀번호 유형 검사 (4보다 작거나, 들어온 비밀번호의 값이 문자열이 아닐 경우)
    if(req.body.pw.length < 4 || typeof req.body.pw !== "string") {
        return res.status(400).json({
            error: "BAD PASSWORD",
            code: 2
        });
    }

   MemberJoin.findOne({
       where:{
           user_id : req.body.user_id
       }
   })
       .then(memberJoin=>{
           if(!memberJoin){
               MemberJoin.create(memberData)
                   .then(memberJoin=>{
                       console.log("회원가입 성공");
                       return res.json({success: true})
                   })
                   .catch(err=>{
                       return res.send('error' + err)
                   })
           }else{
               console.log("회원가입 실패");
               return res.json({
                   error: "ID already exists",
                   code : 3
               })
           }
       })
       .catch(err=>{
           return res.send('error' + err)
           })
});


module.exports = router;