"use strict";

import DemoModel from "../models/Demo";
import Common from "../controller/common";

class Demo {
    constructor(){
        this.getDemoData = this.getDemoData.bind(this);
        this.deleteDemo = this.deleteDemo.bind(this);
        this.getDemoMore = this.getDemoMore.bind(this);
        this.addDemo = this.addDemo.bind(this);
        this.updateDemo = this.updateDemo.bind(this);
        this.updateAndSave=this.updateAndSave.bind(this);
    }

    //搜索数据  _id和title
    getDemoData(req, res, next){
        let id="";
        if(req.query.demoId){
            id=req.query.demoId;
        }
        else if(req.body.demoId){
            id=req.query.demoId;
        }
        else {
            id=req.params.demoId;
        }

        let title=req.body.title;
        let page=req.body.page?req.body.page-1:0;
        let limit=req.body.limit?req.body.limit:5;
        let selectParam={};
        if(id){
            selectParam._id=id;
        }
        if(title){
            selectParam.demoTitle=title;
        }

        //获取分页数据
        let status="1";
        let msg="数据查询失败";
        let demoData=[];
        return new Promise((resolve, reject) => {
            DemoModel.find(selectParam).skip(page*limit).limit(parseInt(limit)).sort({"create_time":"desc"}).populate(["author"]).exec(function (err, data) {
                if (err) {
                    reject();
                    throw err;
                }
                else{
                    data.forEach(item => {
                        let time = new Date(parseInt(item.create_time));
                        item.create_time=Common.getTimeStr(time);

                        let itemNew={
                            author:{
                                nickName:item.author.nickName,
                                avatar:item.author.avatar
                            },
                            demoImages:item.demoImages,
                            demoTitle:item.demoTitle,
                            create_time:item.create_time,
                            demoDescription:item.demoDescription,
                            demoLink:item.demoLink,
                            codeUrl:item.codeUrl,
                            _id: item._id
                        };
                        demoData.push(itemNew);
                    });
                    msg="成功";
                    status="0";
                    resolve(demoData,status,msg);
                }
            });
        });
    }

    getDemoMore(req, res, next){
        let that=this;
        that.getDemoData(req, res, next).then(function (demo,code,msg) {
            res.send({code,msg,demo});
        });
    }

    /*删除*/
    deleteDemo(req,res){
        DemoModel.remove({"_id":req.body.demoId}, function (err, data) {
            if (err) {
                res.send({
                    code:"1",
                    msg:err
                });
            }
            else{
                res.send({
                    code:"0",
                    msg:"删除成功"
                });
            }
        });
    }
    //更新或保存
    updateAndSave(req,res,next){
        let that=this;
        let code="0";
        let msg="成功";
        if(!req.body.demoId){
            that.addDemo(req,res,next);
            res.send({code,msg});
        }
        else{
            that.getDemoData(req, res, next).then(function (data,code,msg) {
                if(!data||data.length<=0){
                    that.addDemo(req,res,next);
                }
                else{
                    let condition={_id:req.body.demoId};
                    let param={
                        demoTitle: req.body.titleAdd,
                        demoDescription:req.body.descriptionAdd,
                        demoLink:req.body.demoLinkAdd,
                        demoImages:req.body.demoImagesAdd,
                        codeUrl:req.body.codeUrlAdd,
                    };
                    that.updateDemo(condition,param);
                }
                res.send({code,msg});
            });
        }
    }

    addDemo(req,res,next){
        try {
            let article = new DemoModel({
                demoTitle: req.body.titleAdd,
                demoDescription:req.body.descriptionAdd,
                demoLink:req.body.demoLinkAdd,
                demoImages:req.body.demoImagesAdd,
                codeUrl:req.body.codeUrlAdd,
                create_time: new Date().getTime(),
                author: req.api_user.id
            });
            article.save(function (err) {
                if (err) {
                    throw err;
                }
            });
        }catch (e){
            throw e;
        }
    }

    /*更新数据，木有写好*/
    updateDemo(condition,param){
        DemoModel.update(condition,param,{upsert:true},function (err, response) {
            if(err){
                throw err;
            }
        });
    }
}

export default new Demo();
