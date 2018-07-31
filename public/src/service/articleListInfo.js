import ajax from '../tools/ajax';
import config from '../tools/config';

const articleListInfo = {
	/**
	 * 获取文章列表
	 */
  getAllData: (params) => {
    let data = ajax.post(`${config.interface.local}/getArticleList`, params)
      .then((response) => {
        return response.data;
      });
    return data;
  },
  /**
	 * 存储文章
	 */
   saveArticle: (params) => {
     let data = ajax.post(`${config.interface.local}/update`, params)
       .then((response) => {
         return response.data;
       });
     return data;
   },
   /**
      * 删除文章
      */
   deleteArticle: (params) => {
     let data = ajax.post(`${config.interface.local}/delete`, params)
       .then((response) => {
         return response.data;
       });
     return data;
   },
}

export default articleListInfo;
