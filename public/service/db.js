/**
 * sequelize.js的初始化服务类
 * Created by ocean on 17/11/20.
 */
'use strict';

const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');
// const config = require('../../conf/config');

let _models;
let _sequelize;
let config = {
  client: {
    // host: '100.84.72.201',
    // port: '5506',
    // user: 'test1',
    // password: 'abc123456',
    // database: 'bh',
    host: '127.0.0.1', //本地不要使用ip啊
    port: '3306',
    user: 'root',
    password: '050252',
    database: 'bh',
    // 是否启用加密密码
    encryptPassword: false,
    connector: 'mysql',
    dateStrings: true,
    connectionLimit: 10,
    timezone: '+08:00',
  },
  app: true,
  agent: false,
};

function initSequelize() {
  if (_sequelize) {
    return _sequelize;
  }
  let mysqlConf = config.client;
  // let sequelizeLog = config.sequelizeLog;
  _sequelize = new Sequelize(mysqlConf.database, mysqlConf.user, mysqlConf.password, {
    host: mysqlConf.host,
    port: mysqlConf.port,
    dialect: mysqlConf.connector,
    pool: {
      max: mysqlConf.connectionLimit,
      min: 2,
      idle: 30000,
    },
    timezone: mysqlConf.timezone,
    // logging: sequelizeLog || false,
  });
  return _sequelize;
}

class DBService {
  constructor() {
    this.sequelize = initSequelize();
    //测试连接
    this.sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.连接成功');
      })
      .catch(err => {
        console.error('Unable to connect to the database:连接失败', err);
      });


    this.loadModels();
  }

  loadModels() {
    if (_models) {
      for (let key in _models) {
        this[key] = _models[key];
      }
      return;
    }
    let that = this;
    let modelPath = path.resolve(__dirname, '../model/');
    _models = {};
    fs.readdirSync(modelPath)
      .filter(function(file) {
        return file.indexOf('.') !== 0 && file !== 'relation.js';
      })
      .forEach(function(file) {
        try {
          let model = that.sequelize.import(path.join(modelPath, file));
          _models[model.name] = model;
          that[model.name] = model;
        } catch (err) {
          console.log(`import error, file:${file}, err:${err}`)
          // that.app.logger.error(`import error, file:${file}, err:${err}`)
        }
      });

    that._loadRelations();
  }

  _loadRelations() {
    let relation = require('../model/relation');
    relation(_models);
  }
}

module.exports = DBService;
