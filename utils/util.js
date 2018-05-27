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
 * 将index值转换为url中对应字符串
 */
const convertIndexToString = index => {
  switch (index) {
    case 0:
      return '/coffee'
    case 1:
      return '/yidiandian'
    case 2:
      return '/heytea'
    case 3:
      return '/more'
    default:
      return '/coffee'
  }
}

module.exports = {
  formatTime: formatTime,
  convertIndexToString: convertIndexToString
}
