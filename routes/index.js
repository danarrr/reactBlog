var express = require('express');
var router = express.Router();
// const logger = require('./../tools/logger');

//service
const Mysql = require('./../public/service/db');
const mysql = new Mysql();

let articleModel = mysql.ArticleInfo;
let userModel = mysql.UserInfo;
let ret = {
  "success": true,
  "code": 200,
  "message": "",
  "data": [],
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//查询文章
router.post('/api/getArticleList', function(req, res) {
  /*TODO
  * 错误的返回
  *网络问题
  */

  let param =  req.body
  let ret = {
    "success": true,
    "code": 200,
    "message": "",
    "data": [],
  }

  const getAllArticles = new Promise((resolve, reject) => {
    let {id, pageSize, currPage} = param;
    const query = id
    ? {where: {id}}
    : {
        limit: pageSize ? pageSize : 10,                   // 每页多少条
        offset: pageSize ? pageSize * (currPage - 1) : 0,  // 跳过多少条
    }
    articleModel.findAndCountAll(query).then(data => {
        resolve(data)
    }).catch(err => {
        reject(err)
    })
  })


  getAllArticles.then(data => {
    res.send(
      Object.assign({}, ret, {data: data.rows,count: data.count})
    )
  })
});

//更新 或 新建文章
router.post('/api/update', async function(req, res){
  let param =  req.body
  function hasArticle(){
      return new Promise((resolve, reject) => {
          articleModel.findOne({where: {id: param.id}}).then(data => {
              resolve(data)
          }).catch( err => {
              reject(err)
          })
      })
  }
  const hasArticles = await hasArticle();

  if(!hasArticles){
      await articleModel.create({...param})
        .then(data => {
          res.send(
            Object.assign({}, ret, {data})
          )
        })
  }else{
      await articleModel.update({...param},{ where: {id: param.id}})
        .then(data => {
          res.send(
            Object.assign({}, ret, {data})
          )
      })
  }
})

//删除
router.post('/api/delete', async function(req, res){
     const param =  req.body
     const article = await articleModel.findOne({where: {id: param.id}})
     await article.destroy().then(data => {
         res.send(ret)
     })
     // await articleModel.destroy({where: {id: param.id}}).then(data => {
     //     console.log("删除成功");
     //     res.send(Object.assign({}, ret))
     // })
})

//登录
router.post('/api/signin', async function(req, res){
    let param =  req.body;
    await userModel.findOne({where: {id: param.id}}).then(data => {
        const getData = JSON.parse(JSON.stringify(data))
        if(getData.password !== param.password){
            res.send(Object.assign({}, ret, {
                data: '用户名账号或密码错误',
                success: false,
            }))
        }else{
            res.send(Object.assign({}, ret, {data}))
        }
    }).catch(err => {
        res.send(
          Object.assign({}, ret, {
              success: false,
              data: err,
          })
        )
    })
 })

module.exports = router;
