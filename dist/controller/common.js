"use strict";Object.defineProperty(exports, "__esModule", { value: true });
/*
                                                                            * 公共方法
                                                                            * author: wsf
                                                                            * */
var Common = {
    /*get time string,eg:2017-10-20 12:30*/
    getTimeStr: function getTimeStr(time) {
        var year = time.getFullYear();
        var day = time.getDate();
        var month = time.getMonth() + 1;
        var hour = time.getHours();
        var minute = time.getMinutes();
        var timeStr = year + "-" + month + "-" + day + " " + hour + ":" + minute;
        return timeStr;
    },
    /*convert html to plain text*/
    getHTMLToText: function getHTMLToText(htmlTag) {
        var str = htmlTag;
        str = str.replace(/<\/?[^>]*>/g, ""); //去除HTML tag
        str = str.replace(/[ | ]*\n/g, "\n"); //去除行尾空白
        str = str.replace(/&nbsp;/ig, ""); //去掉&nbsp;
        str = str.replace(/\s/g, ""); //将空格去掉
        return str;
    },
    /*get image src*/
    getImage: function getImage(content) {
        var imgReg = /.*!\[.*?\]\(.*?\).*/;
        var arr = content.match(imgReg);
        var image = "";
        if (arr && arr.length > 0) {var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {
                for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var info = _step.value;
                    var imgInfo = info.split("(");
                    if (imgInfo.length >= 2) {
                        image = imgInfo[1].split(")")[0];
                        break;
                    }
                }} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}
        }
        return image;
    } };exports.default =


Common;