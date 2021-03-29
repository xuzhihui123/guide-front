export function debounce (fn, delay) {
  // 定时器，用来 setTimeout
  var timer

  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
  return function () {
    // 保存函数调用时的上下文和参数，传递给 fn
    var context = this
    var args = arguments

    // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
    clearTimeout(timer)

    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 fn
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

// 节流函数
export function throttle (fn, wait) {
  var isExecute = false
  return function () {
    var args = Array.prototype.slice.apply(arguments)
    if (isExecute) {
      return
    }
    isExecute = true
    setTimeout(function () {
      fn.apply(this, args)
      isExecute = false
    }, wait)
  }
}

export function utf16toEntities (str) {
  var patt = /[\ud800-\udbff][\udc00-\udfff]/g // 检测utf16字符正则
  str = str.replace(patt, function (char) {
    var H, L, code
    if (char.length === 2) {
      H = char.charCodeAt(0) // 取出高位
      L = char.charCodeAt(1) // 取出低位
      code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00 // 转换算法
      return '&#' + code + ';'
    } else {
      return char
    }
  })
  return str
}

export function uncodeUtf16 (str) {
  // eslint-disable-next-line no-useless-escape
  var reg = /\&#.*?;/g
  var result = str.replace(reg, function (char) {
    var H, L, code
    // eslint-disable-next-line eqeqeq
    if (char.length == 9) {
      code = parseInt(char.match(/[0-9]+/g))
      H = Math.floor((code - 0x10000) / 0x400) + 0xD800
      L = (code - 0x10000) % 0x400 + 0xDC00
      return unescape('%u' + H.toString(16) + '%u' + L.toString(16))
    } else {
      return char
    }
  })
  return result
}

export function getItem (key) {
  if (localStorage.getItem(key) && Object.keys(JSON.parse(localStorage.getItem(key))).length) {
    return JSON.parse(localStorage.getItem(key))
  } else {
    return false
  }
}
