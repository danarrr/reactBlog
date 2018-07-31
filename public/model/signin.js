/**
 * pageStructInfo model
 * Created by ocean on 17/11/20.
 */

'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserInfo', {
    username: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(55),
      allowNull: false,
    },
    id: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
    },
  }, {
    timestamps: false,
    tableName: 'userInfo',
    freezeTableName: true,
    indexes: []
  });
};
