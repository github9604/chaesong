import express from 'express';
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
const Op = Sequelize.Op;
const eat = express.Router();
eat.use(cors());

const MemberEat = sequelize.define(
    'MemberEat',
    {
        user_id: {
            type:Sequelize.STRING,
            primaryKey: true
        },
        EATEN_DATE:{
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            primaryKey: true
        },
        ingredient_code: {
            type:Sequelize.STRING,
            primaryKey: true
        },
        EATEN_TIME:{
            type: Sequelize.TIME,
            defaultValue: Sequelize.NOW,
            primaryKey: true
        },
    },{
        timestamps: false
    }
);

const Recipe = sequelize.define(
    'Recipe',
    {
        recipe_code: {
            type:Sequelize.STRING,
            primaryKey: true
        }
    },{
        timestamps: false
    }
);
const MemberJoin = sequelize.define(
    'memberJoin',
    {
        user_id: {
            type:Sequelize.STRING,
            primaryKey: true
        }
    },
    {
        timestamps: false
    }
);

eat.post('/', (req,res)=>{
    console.log("eat post route");

    const option = req.body.option;

    const date2 = new Date();
    const date3 = date2.toISOString().slice(0,10);
    console.log(date3);

    const eatData = {
        user_id : req.body.user_id,
        ingredient_code : req.body.ingredient_code
    };

    if(option === 0){
        console.log("eat post route2");
        MemberEat.findOne({
            where:{
                user_id : eatData.user_id,
                ingredient_code : eatData.ingredient_code,
                EATEN_DATE : {[Op.gte]: Date.parse(date3)}
            }
        }).then((memberEat)=>{
            if(!memberEat){
                MemberEat.create(eatData)
                    .then(memberEat=>{
                        console.log("eat create");
                        return res.json({success: true})
                    })
                    .catch(err=>{
                        console.log("eat error");
                        return res.send('error' + err)
                    })
            }else{
                console.log("eat duplicate error");
                return res.status(400).json({ // HTTP 요청에 대한 리스폰스 (json 형식으로)
                    error: "duplicate eat",
                    code: 1
                });
            }
        }).catch((err)=>{
            return res.send('error' + err);
        })

    } else if (option === 1){
        MemberEat.create(eatData)
            .then(memberEat=>{
                console.log("eat create");
                return res.json({success: true})
            })
            .catch(err=>{
                console.log("eat error");
                return res.send('error' + err)
            });
    }


    /*console.log("eat post route2");
    MemberEat.findOne({
        where:{
            user_id : eatData.user_id,
            ingredient_code : eatData.ingredient_code,
            EATEN_DATE : eatData.EATEN_DATE,
            EATEN_TIME : eatData.EATEN_TIME
        }
    }).then((memberEat)=>{
        if(!memberEat){
            MemberEat.create(eatData)
                .then(memberEat=>{
                    console.log("eat create");
                    return res.json({success: true})
                })
                .catch(err=>{
                    console.log("eat error");
                    return res.send('error' + err)
                })
        }else{
            MemberEat.destroy({
                where:{
                    user_id : eatData.user_id,
                    ingredient_code : eatData.ingredient_code
                }
            })
                .then(memberEat=>{
                    console.log("eat delete");
                    return res.json({success: true})
                })
                .catch(err=>{
                    console.log("eat error");
                    return res.send('error' + err)
                })
        }
    }).catch((err)=>{
        return res.send('error' + err);
    })*/
});

eat.post('/delete', (req,res)=>{
    console.log("eat delete post route");

    const option = req.body.option;

    const eatenData = {
        user_id : req.body.user_id,
        ingredient_code : req.body.ingredient_code,
        EATEN_DATE : req.body.EATEN_DATE,
        EATEN_TIME : req.body.EATEN_TIME
    };

    const date = new Date(eatenData.EATEN_DATE);
    const date2 = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    console.log(date2);

    if(option === 0){
        MemberEat.findOne({
            where :{
                user_id : eatenData.user_id,
                ingredient_code : eatenData.ingredient_code,
                EATEN_DATE : date,
                EATEN_TIME : eatenData.EATEN_TIME
            }
        }).then((memberEat)=>{
            if(memberEat){
                MemberEat.destroy({
                    where:{
                        user_id : eatenData.user_id,
                        ingredient_code : eatenData.ingredient_code,
                        EATEN_DATE : date,
                        EATEN_TIME : eatenData.EATEN_TIME
                    }
                })
                    .then(memberEat=>{
                        console.log("eat delete");
                        return res.json({success: true})
                    })
                    .catch(err=>{
                        console.log("eat error");
                        return res.send('error' + err)
                    })
            }
        }).catch((err)=>{
            return res.send('error' + err);
        })
    }

});

module.exports = eat;