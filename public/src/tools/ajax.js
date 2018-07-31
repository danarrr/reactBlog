/**
 * ajax工具类
 * 基于axios进行一个封装 (https://github.com/axios/axios)
 * 便于后续统一的针对ajax函数做修改
 * Created by ocean on 17/12/13.
 */

import _Axiox from 'axios';
import wrapper from 'axios-cache-plugin';

const Axiox = wrapper(_Axiox, {
  maxCacheSize: 100,  // cached items amounts. if the number of cached items exceeds, the earliest cached item will be deleted. default number is 15.
  ttl: 6000, // time to live. if you set this option the cached item will be auto deleted after ttl(ms).
  excludeHeaders: true, // should headers be ignored in cache key, helpful for ignoring tracking headers
});

const Ajax = {
	/**
	 * 对axios api的封装
	 *
	 * @param method 要请求的方法
	 * @param url 要请求的url
	 * @param data 要发送的数据
	 * @param timeout 超时时间
	 * @param headers 额外设置的http header
	 * @param params 额外需要携带的参数
	 *
	 * 更多详细参数请参考：https://github.com/axios/axios
	 * @returns {Promise}
	 */
  request: async(config = {}) => {
    const results = await Axiox.request(config)
			.then((response) => {
    return response;
});
    return results;
  },
  get: (url, opts = {}) => {
    return Axiox.get(url, { ...opts });
  },
  post: async(url, data, opts = {}) => {
    return await Axiox.post(url, data, { ...opts });
  },
};


export default Ajax;
