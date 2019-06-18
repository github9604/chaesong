const express = require("express");
const mySetting = express.Router();
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
const MemberJoin = sequelize.define(
    'memberJoins',
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
        sex:{
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false
    }
);

mySetting.use(cors());

mySetting.post('/getSetting',(req,res)=>{
    MemberJoin.findOne({where:{user_id : req.body.user_id}})
        .then(memberJoin => {
            if(!memberJoin){
                return res.status(401).json({
                    error: "There is no user",
                    code:2
                });
            }
            return res.json(memberJoin);
        });
});

module.exports = mySetting;