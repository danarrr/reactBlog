'use strict'
const log4js = require('log4js');
const glbConfig = require('../../conf/config');
const OpenDebug = glbConfig.debug;
const LoggerFilePath = glbConfig.loggerFilePath;
const cluster = require('cluster');

let fileAppender =
    {
        type: 'dateFile',
        level: 'INFO',
        layout: {
            type: 'messagePassThrough',
        },
        filename: LoggerFilePath + 'instmedia_log',
        pattern: ".yyyy-MM-dd_hh",
        //maxLogSize: 1048000,
        alwaysIncludePattern: true,
        //backups: 100,
    };

let logger = null;
if (cluster.isMaster) {
    let logCf = {
        appenders: [{
            type: 'clustered',
            "appenders": [fileAppender],
        }],
    };
    if (glbConfig.useConsoleLog) {
        let consoleCfg = {
            type: 'console',
            level: 'INFO',
            layout: {
                type: 'messagePassThrough',
                //type: '[%d] %p %m %n',
            },
        };
        logCf.appenders[0].appenders.push(consoleCfg);
    }
    log4js.configure(logCf);
    logger = log4js.getLogger('master');
    logger.setLevel(logger.level.info);
} else {
    let cfg = {appenders: [{type: 'clustered',}]};
    log4js.configure(cfg);
    logger = log4js.getLogger('worker');
}


module.exports = {
    //type  用来标记日志是哪个业务打印出来的
    g: 'g', //公共模块日志
    http: 'http', //http log
    ps: "persis",
    //type  用来标记日志是哪个业务打印出来的 end
    doubleDigitFormat: function (num) {
        let result = num;
        if (result < 10) {
            result = `0${result}`;
        }
        return result;
    },
    millisecondsFormat: function (num) {
        let result = num;
        if (result < 10) {
            result = `00${result}`;
        } else if (result < 100 && result >= 10) {
            result = `0${result}`;
        }
        return result;
    },
    formatDate: function (date) {
        const year = this.doubleDigitFormat(date.getFullYear());
        const Month = this.doubleDigitFormat(date.getMonth() + 1);
        const day = this.doubleDigitFormat(date.getDate());
        const hours = this.doubleDigitFormat(date.getHours());
        const minutes = this.doubleDigitFormat(date.getMinutes());
        const seconds = this.doubleDigitFormat(date.getSeconds());
        const milliseconds = this.millisecondsFormat(date.getMilliseconds());
        return `${year}-${Month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    },
    debug: function (type, loggerContent) {
        if (OpenDebug) {
            let Content = '';
            if (undefined !== loggerContent) {
                Content = `tm=${this.formatDate(new Date())}\`lt=[D]\`type=${type}\`` + loggerContent;
            } else {
                Content = `tm=${this.formatDate(new Date())}\`lt=[D]\`type=${type}\``;
            }
            logger.debug(Content);
        }
    },
    info: function (type, loggerContent) {
        let Content = '';
        if (undefined !== loggerContent) {
            Content = `tm=${this.formatDate(new Date())}\`lt=[I]\`type=${type}\`` + loggerContent;
        } else {
            Content = `tm=${this.formatDate(new Date())}\`lt=[I]\`type=${type}\``;
        }
        logger.info(Content);
    },
    warn: function (type, loggerContent) {
        let Content = '';
        if (undefined !== loggerContent) {
            Content = `tm=${this.formatDate(new Date())}\`lt=[W]\`type=${type}\`` + loggerContent;
        } else {
            Content = `tm=${this.formatDate(new Date())}\`lt=[W]\`type=${type}\``;
        }
        logger.warn(Content);
    },
    error: function (type, loggerContent) {
        let Content = '';
        if (undefined !== loggerContent) {
            Content = `tm=${this.formatDate(new Date())}\`lt=[E]\`type=${type}\`` + loggerContent;
        } else {
            Content = `tm=${this.formatDate(new Date())}\`lt=[E]\`type=${type}\``;
        }
        logger.error(Content);
    },
    statistical: function (type, loggerContent) {
        let Content = '';
        if (undefined !== loggerContent) {
            Content = `tm=${this.formatDate(new Date())}\`lt=[S]\`type=${type}\`` + loggerContent;
        } else {
            Content = `tm=${this.formatDate(new Date())}\`lt=[S]\`type=${type}\``;
        }
        logger.info(Content);
    },
    rawLog: logger,
}
