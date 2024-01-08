// DEPENDENCIES:
// require sequelize library
const { Model, DataTypes } = require('sequelize');
// require db connection
const sequelize = require('../config/connection.js');

// Creating Category model:
class Category extends Model {}

Category.init(
  {
    // define columns
    // define types, rules for each column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
