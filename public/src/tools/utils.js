/**
 * 将前端需要的一些通用工具函数集合到这里
 */

const Utils = {
	/**
	 * 从url中获取某个参数
	 * @param key
	 * @returns {*|string}
	 */
  getQueryValue(key) {
    let match = location.search.match(new RegExp(`${key}=([^&]*)`));
    return match && match[1] || '';
  },
	/**
	 * 从URL获取所有参数
	 * @returns {{}}
	 */
  getAllQueryParams() {
    let str = window.location.href;
    if (!str) {
      return {};
    }

    let num = str.indexOf('?');
    str = str.substr(num + 1); // 取得所有参数

    const res = {};
    let name;
    let value;

    const arr = str.split('&'); // 各个参数放到数组里
    for (let i = 0; i < arr.length; i++) {
      num = arr[i].indexOf('=');
      if (num > 0) {
        name = arr[i].substring(0, num).trim();
        value = arr[i].substr(num + 1).trim();
        res[name] = value;
      }
    }

    return res;
  },
	/**
	 * object转化成url拼接样式
	 * @param obj 需要转化的参数
	 */
  objToUrl(obj) {
    let arr = [];
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        arr.push(`${i}=${obj[i]}`);
      }
    }
    return `?${arr.join('&')}`;
  },
	/**
	 * url转化成object拼接样式
	 * @param urlStr 需要转化的参数
	 */
  urlToObj(urlStr) {
    let string = '';
    if (urlStr.indexOf('?') === 0) {
      string = urlStr.substring(1);
    }
    string = string.split('&');
    let res = {};
    for (let i = 0; i < string.length; i++) {
      let str = string[i].split('=');
      if (str[0] != '') {
        res[str[0]] = str[1];
      }
    }
    return res;
  },
	/**
	 * 用于一个对象与location.search字符串进行对比
	 * 返回所有key:value是否相等
	 *
	 * obj无编码，searchStr已经编码
	 * diff时需要将obj的value进行编码后diff
	 */
  paramDiff(obj, searchStr) {
    let searchObj = this.urlToObj(searchStr);

    for (let objItem in obj) {
      let objItem_value = encodeURIComponent(obj[objItem]);
      if (searchObj[objItem] !== undefined) {
        let searchItem_value = searchObj[objItem];
        if (!isNaN(objItem_value)) {
          objItem_value = Number(objItem_value);
          searchItem_value = Number(searchItem_value);
        }
        if (objItem_value !== searchItem_value) {
          return false;
        }
      } else {
				// url中没有键的情况下
        return false;
      }
    }
    return true;
  },
	/**
	 * 接收一个对象,将其转化为url参数格式,并pushState到URL记录中
	 * @param obj
	 * @param historyLength: history.length属性,进行操作前的长度
	 */
  pushState(obj) {
    let urlParam = this.objToUrl(obj);
    let oldUrlSearch = location.search;

		// 值相等的时候不进行修改
    let isEqual = this.paramDiff(obj, oldUrlSearch);
    if (!isEqual) {
      history.replaceState(null, null, urlParam);
    }
  },
  /**
   * 转换状态为中文
   */
  strfStatus(str) {
    if (str === 0) return '成功';
    else if (str === -1) return '失败';
  },
	/**
   * 转换调试结果为中文
   */
  strfBoolean(str) {
    if (str) return '是';
    return '否';
  },

};

module.exports = Utils;
