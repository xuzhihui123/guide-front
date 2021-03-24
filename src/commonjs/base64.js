/*
 * @Author: Lancer
 * @Date:2019/12/20
 * @Last Modified by:   Lancer
 * @Last Modified time: 2019/12/20
 */

// 无兼容 放心使用~
const baseTofile = {
  dataURLtoFile (dataurl, filename) {
    var arr = dataurl.split(','); var mime = arr[0].match(/:(.*?);/)[1]
    var bstr = atob(arr[1]); var n = bstr.length; var u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
  }
}

export default baseTofile
