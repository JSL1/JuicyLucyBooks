import credentials from "./credentials";
const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const sequelize = new Sequelize(
    
)