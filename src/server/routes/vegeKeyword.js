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
const vegeKeyword = express.Router();
vegeKeyword.use(cors());

const VegeKeyword = sequelize.define(
    'VegeKeyword',
    {
        date:{
            type: Sequelize.DATE,
            primaryKey:true
        },
        keyword:{
            type: Sequelize.STRING
        },
        indexes:{
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    },{
    timestamps: false
    }
);

vegeKeyword.get('/', (req,res)=>{
    console.log("vegekeyword routes");
    let query = "select * from VegeKeywords ";

    sequelize.query(query, {})
        .then(vegeKeywords=>{
            //console.log(vegeKeywords);
            return res.json(vegeKeywords)
        })
        .catch(err=>{
            return res.send('error' + err)
        })
});

module.exports = vegeKeyword;