
/**
 * 休眠
 * @pram sleepTime: 休眠的时间，毫秒
 */
const sleep = sleepTime => {
  let now = new Date();
  let exitTime = now.getTime() + sleepTime;
  while (true) {
    now = new Date();
    if (now.getTime() > exitTime) {
      return;
    }
  }
}

/**
 * 检测是否可以提交分享
 */
const disableBtn = function(){
  for(let i = 0; i < arguments.length; i++){
    if(!arguments[i]){
      return true;
    }
  }
  return false;
}

module.exports = {
  sleep: sleep,
  disableBtn: disableBtn
}
