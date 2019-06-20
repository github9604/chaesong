import express from 'express';
const cors = require("cors");
const Sequelize = require("sequelize");
const session = require("express-session");
const recommendPage = express.Router();

recommendPage.use(cors());

const Op = Sequelize.Op;
let tmp;

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

const Recipe = sequelize.define(
    'Recipe',
    {
        recipe_id:{
            type: Sequelize.INTEGER
        },
        recipe_code: {
            type:Sequelize.STRING,
            primaryKey: true
        },
        recipe_name: {
            type:Sequelize.STRING,
        },
        content: {
            type:Sequelize.TEXT,
        },
        imgurl: {
            type: Sequelize.TEXT
        },
        vegantype: {
            type: Sequelize.TEXT
        },
        seafood: {
            type: Sequelize.TEXT
        },
        milk: {
            type: Sequelize.TEXT
        },
        egg: {
            type: Sequelize.TEXT
        }
    },{
        timestamps: false
    }
);

const Ingredient = sequelize.define(
    'Ingredient',
    {
        ingredient_code: {
            type:Sequelize.STRING,
            primaryKey: true
        },
        sort1: {
            type:Sequelize.STRING
        }
    },{
        timestamps: false
    }
);

const memberRecommend = sequelize.define(
    'memberRecommend',
    {
        user_id: {
            type:Sequelize.STRING,
            primaryKey: true
        },
        recipe_code: {
            type:Sequelize.STRING,
            primaryKey: true
        },
        sort1: {
            type: Sequelize.STRING
        }
    },{
        timestamps: false
    }
);

recommendPage.get('/:searchWord/:seafood/:milk/:egg', (req,res)=>{
    console.log("recommend list routes");
    let searchWord = req.params.searchWord;
    let seafood = req.params.seafood;
    let milk = req.params.milk;
    let egg = req.params.egg;

    let session = req.session;
    //let new_query = 'SELECT * FROM MemberEats, Recipes WHERE Recipes.recipe_code = MemberEats.recipe_code AND MemberEats.user_id = :now_user';
    let new_query = 'SELECT DISTINCT sort1, count(sort1) as CountOf from memberRecommends where memberRecommends.user_id = :now_user group by sort1 ';
    let values = {
        now_user: session.loginInfo.user_id
    };
    sequelize.query(new_query, {replacements: values})
        .then(MemberScraps => {console.log(MemberScraps)})

    Recipe.findAll({
        limit: 4,
        where:{
            [Op.or]: [
                {
                    recipe_name: {
                        [Op.like]: "%" + searchWord + "%"
                    }
                },
                {
                    content:{
                        [Op.like]: "%" + searchWord + "%"
                    }
                },
            ],
            seafood : {
                [Op.lte] : req.params.seafood
            },
            milk : {
                [Op.lte] : req.params.milk
            },
            egg : {
                [Op.lte] : req.params.egg
            }
        }
    }).then(recipes=>{
        //console.log(recipes);
        return res.json(recipes)
    })
        .catch(err=>{
            return res.send('error' + err)
        })
});

recommendPage.post('/insert', (req, res) => {

    const recommendData = {
        user_id: req.body.user_id,
        recipe_code: req.body.recipe_code,
        sort1: tmp
    };

    console.log("recommendpage router");

    Ingredient.findOne({
        where:{
            ingredient_code: req.body.recipe_code
        }
    }).then(function(result){
            recommendData.sort1 = result.sort1;
        }
    )



    memberRecommend.findOne({
        where:{
            user_id : req.body.user_id,
            recipe_code : req.body.recipe_code
        }
    }).then((MemberRecommend)=>{
        if(!MemberRecommend){
            memberRecommend.create(recommendData)
                .then(memberRecommend=>{
                    console.log("저장 성공");
                    return res.json({success: true})
                })
                .catch(err=>{
                    return res.send('error' + err)
                })
        }
        else{
            memberRecommend.destroy({
                where:{
                    user_id : req.body.user_id,
                    recipe_code : req.body.recipe_code
                }
            })
                .then(memberRecommend=>{
                    console.log("scrap delete");
                    return res.json({success: true})
                })
                .catch(err=>{
                    console.log("scrap error");
                    return res.send('error' + err)
                })
        }
    })
        .catch(err=>{
            return res.send('error' + err)
        })
});

module.exports = recommendPage;