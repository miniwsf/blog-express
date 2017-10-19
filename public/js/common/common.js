
var Common={
  getTimeNew(timestamp){
      "use strict";
      var time = new Date(timestamp);
      var year=time.getFullYear();
      var day=time.getDate();
      var month=time.getMonth()+1;
      var hour=time.getHours();
      var minute=time.getMinutes();
      var second=time.getSeconds();
      var timeStr=year+"年"+this.formateTime(month)+"月"+this.formateTime(day)+"日"+this.formateTime(hour)+":"+this.formateTime(minute);

      return timeStr;
  },
  formateTime(time){
      var newTime=time.toString();
      return newTime.length==1?"0"+newTime:newTime;
  }
}
//export default Common;
