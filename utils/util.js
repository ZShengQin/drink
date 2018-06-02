const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

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
  formatTime: formatTime,
  sleep: sleep,
  disableBtn: disableBtn
}
