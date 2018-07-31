import ajax from '../tools/ajax';
import config from '../tools/config';

// const userInfoStatus = (function(params){
//     let task //存储状态
//     return function (params) {
//         if (task) return task;
//         task = ajax.post(`${config.interface.local}/signin`, params)
//           .then((response) => {
//               console.log("-----".repeat(20))
//               console.log(params)
//               console.log("------".repeat(20))
//             return response.data;
//           });
//         return task;
//     }
// })()
// const main = {
//     getUserInfo(params){
//         return userInfoStatus(params)
//     }
// }
//
// export default main;


const userInfo = {
	/**
	 * 获取文章列表
	 */
  signIn: (params) => {
    let data = ajax.post(`${config.interface.local}/signin`, params)
      .then((response) => {
        return response.data;
      });
    return data;
  },
}

export default userInfo;
