import express from 'express';
const cors = require("cors");
const Sequelize = require("sequelize");
const session = require("express-session");

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

const personalpage = express.Router();
const MemberScrap = sequelize.define(
    'MemberScrap',
    {
        user_id: {
            type: Sequelize.STRING,
            primaryKey : true
        },
        recipe_code: {
            type: Sequelize.STRING,
            primaryKey : true
        }
    }
);

const MemberEat = sequelize.define(
    'MemberEat',
    {
        recipe_code:{
            type: Sequelize.STRING,
            primaryKey: true
        },

        recipe_name: {
            type:Sequelize.STRING
        },
        ENERGY: {
            type: Sequelize.DOUBLE
        },
        PROCPN: {
            type: Sequelize.DOUBLE
        },
        FAT: {
            type: Sequelize.DOUBLE
        },
        CHOTDF: {
            type: Sequelize.DOUBLE
        },
        CA: {
            type: Sequelize.DOUBLE
        },
        NA: {
            type: Sequelize.DOUBLE
        },
        FE: {
            type: Sequelize.DOUBLE
        },
        user_id: {
            type: Sequelize.STRING
        }
    },{
        timestamps: false
    }
);

const Recipe = sequelize.define(
    'Recipe',
    {
        recipe_code:{
            type: Sequelize.STRING,
            primaryKey: true
        },
        recipe_name: {
            type:Sequelize.STRING
        },
        ENERGY: {
            type: Sequelize.DOUBLE
        },
        PROCPN: {
            type: Sequelize.DOUBLE
        },
        FAT: {
            type: Sequelize.DOUBLE
        },
        CHOTDF: {
            type: Sequelize.DOUBLE
        },
        CA: {
            type: Sequelize.DOUBLE
        },
        NA: {
            type: Sequelize.DOUBLE
        },
        FE: {
            type: Sequelize.DOUBLE
        },
        user_id: {
            type: Sequelize.STRING
        }
    },{
        timestamps: false
    }
);

personalpage.use(cors());

//SELECT * FROM MemberEats T1 INNER JOIN RECIPES T2 ON (T2.recipe_code = T1.recipe_code)

personalpage.get('/scrap', (req, res) => {
    let session = req.session;
    //let new_query = 'SELECT * FROM MemberEats, Recipes WHERE Recipes.recipe_code = MemberEats.recipe_code AND MemberEats.user_id = :now_user';
    let new_query = 'SELECT * FROM MemberScraps, Recipes WHERE MemberScraps.recipe_code = Recipes.recipe_code AND MemberScraps.user_id = :now_user ORDER BY MemberScraps.SCRAP_DATE DESC';
    let values = {
        now_user: session.loginInfo.user_id
    };
    sequelize.query(new_query, {replacements: values, model: MemberScrap})
        .then(MemberScraps => {return res.json(MemberScraps);})
    // sequelize.query('SELECT * FROM MemberEats, Recipes WHERE Recipes.recipe_code = MemberEats.recipe_code AND MemberEats.user_id = "main"',{model: MemberEat})
    //   .then(MemberEats =>{ return res.json(MemberEats);})
});

personalpage.get('/eaten', (req,res) => {
    let session2 = req.session;
    let new_query2 = 'SELECT * FROM MemberEats, Ingredients, memberJoins WHERE MemberEats.ingredient_code = Ingredients.ingredient_code AND MemberEats.user_id = :now_user AND memberJoins.user_id = :now_user AND MemberEats.EATEN_DATE > CURRENT_DATE() ORDER BY MemberEats.EATEN_TIME DESC';
    let values2 = {
        now_user : session2.loginInfo.user_id
    };
    sequelize.query(new_query2, {replacements: values2, model : MemberEat})
        .then(MemberEats => {return res.json(MemberEats);})
})

module.exports = personalpage;