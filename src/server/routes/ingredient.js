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

ingredient.get('/search/:ingredientname', (req,res) =>{
    let ingredientname = req.params.ingredientname;
    Ingredient.findAll({where:{
            ingredient_name : req.body.ingredient_name
        }
    }).then(ingredients=> {
        return res.json(ingredients);
    }).catch(err=>{
        return res.send('error' + err);
    });
});

ingredient.get('/search',(req,res)=>{
    res.json([]);
});

module.exports = ingredient;