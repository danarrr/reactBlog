/**
 * 业务列表
 * Created by ocean on 17/12/20.
 */
//
//
// // const commFunc = require('../../tools/commFunc');
// // const auth = require('../../tools/auth');
//
// module.exports = function* listController() {
//   let ret = {
//     success: true,
//     code: 2000,
//     message: '',
//     data: [],
//   };
//
//
//   const query = this.query;
//   console.log("query______", this.query)
//   let operaterModel = this.service.db.articleInfo;
//
//
//   const total = yield operaterModel.findAll().then((results) => {
//     return results.map(x => x.toJSON());
//   });
//
//   ret.data = total;
//
//   return ret;
// };
