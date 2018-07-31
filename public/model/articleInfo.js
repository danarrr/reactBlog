/**
 * pageStructInfo model
 * Created by ocean on 17/11/20.
 */

'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ArticleInfo', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
    tag: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    timestamps: false,
    tableName: 'articleInfo',
    freezeTableName: true,
    indexes: []
  });
};
