/**
 * Created by ocean on 17/12/13.
 */

module.exports = {
  name: '黑洞 · 内容发现平台',
  footerText: 'UCWEB 版权所有 © 2017 [内容发现]提供技术支持',
  logoText: null,
  needLogin: true,
  iconFontUrl: 'https://at.alicdn.com/t/font_c4y7asse3q1cq5mi.js',
  interface: {
    spider: /test/.test(window.location.host) ?
			'http://backholeschedulecenterprea.test.uae.uc.cn' :
			(/100\.84/.test(window.location.host) ? 'http://100.84.248.2:10087' : 'https://spider.ucweb.com'),
    local: '/api',
  },
};
