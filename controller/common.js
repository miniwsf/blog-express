
/*
* 公共方法
* author: wsf
* */
let Common={
    /*get time string,eg:2017-10-20 12:30*/
    getTimeStr(time){
        let year=time.getFullYear();
        let day=time.getDate();
        let month=time.getMonth()+1;
        let hour=time.getHours();
        let minute=time.getMinutes();
        let timeStr=year+"-"+month+"-"+day+" "+hour+":"+minute;
        return timeStr;
    },
    /*convert html to plain text*/
    getHTMLToText(htmlTag){
        let str=htmlTag;
        str = str.replace(/<\/?[^>]*>/g,""); //去除HTML tag
        str = str.replace(/[ | ]*\n/g,"\n"); //去除行尾空白
        str=str.replace(/&nbsp;/ig,"");//去掉&nbsp;
        str=str.replace(/\s/g,""); //将空格去掉
        return str;
    },
    /*get image src*/
    getImage(content){
        let imgReg=/.*!\[.*?\]\(.*?\).*/;
        let arr=content.match(imgReg);
        let image="";
        if(arr&&arr.length>0){
            for(let info of arr){
                let imgInfo=info.split("(");
                if(imgInfo.length>=2){
                    image=imgInfo[1].split(")")[0];
                    break;
                }
            }
        }
        return image;
    }
};

export default Common;