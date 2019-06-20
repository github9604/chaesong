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
const ingredient = express.Router();

ingredient.use(cors());

const Ingredient = sequelize.define(
    'Ingredient',
    {
        ingredient_id:{
            type: Sequelize.INTEGER
        },
        ingredient_code: {
            type:Sequelize.STRING,
            primaryKey: true
        },
        ingredient_name: {
            type:Sequelize.STRING,
        }
    },{
        timestamps: false
    }
);

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
        quantity:{
            type: Sequelize.DOUBLE,
            defaultValue: 1
        }
    },{
        timestamps: false
    }
);

ingredient.get('/search', (req,res) =>{
    Ingredient.findAll().then(ingredients=> {
        return res.json(ingredients);
    }).catch(err=>{
        return res.send('error' + err);
    });
});


ingredient.post('/eat',(req,res)=>{
    console.log("ingredint eat post route");
    const count = req.body.count;
    let unit = req.body.unit;
    Ingredient.findOne({
        where:{
            ingredient_name : req.body.value
        },
        raw: true
    }).then((ingredient) =>{
        const ingredientCode = ingredient.ingredient_code;

        let Quantity  = 0;

        switch(unit){
            case "0":
                Quantity = count / 100;
                break;
            case "1":
                Quantity = count * 0.5;
                break;
            case "2":
                Quantity = count * 0.05;
                break;
            case "3":
                Quantity = count * 0.5;
                break;
            case "4":
                Quantity = count * 0.6;
                break;
            case "5":
                Quantity = count;
                break;
            case "6":
                Quantity = count * 210;
                break;
            case "7":
                Quantity = count * 1.8;
                break;
            case "8":
                Quantity = count * 0.1;
                break;
            case "9":
                Quantity = count * 1.2;
                break;
            case "10":
                Quantity = count * 2.5;
                break;
            case "10":
                Quantity = count;
                break;
            default:
                console.log("default");
                Quantity = 1;
                break;
        }
        const eatData = {
            user_id : req.body.user_id,
            ingredient_code : ingredientCode, quantity: Quantity
        };
        console.log(ingredientCode + " | " +  Quantity);
        console.log(eatData.ingredient_code + " / " + eatData.quantity);
        console.log(eatData);
        MemberEat.create(eatData)
            .then(memberEat=>{
                console.log("eat create");
                return res.json({success: true})
            })
            .catch(err=>{
                console.log("eat create error");
                return res.send('error' + err)
            });

        /*MemberEat.findOne({
            where:{
                user_id : eatData.user_id,
                ingredient_code : eatData.ingredient_code,
                EATEN_DATE : eatData.EATEN_DATE,
                EATEN_TIME : eatData.EATEN_TIME
            }
        }).then((memberEat)=>{
            if(!memberEat){
                console.log(eatData);
                MemberEat.create(eatData)
                    .then(memberEat=>{
                        console.log("eat create");
                        return res.json({success: true})
                    })
                    .catch(err=>{
                        console.log("eat create error");
                        return res.send('error' + err)
                    })
            }else{
                console.log('duplicate error');
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
            console.log(err);
            return res.send('error' + err);
        })*/
    });
});

module.exports = ingredient;