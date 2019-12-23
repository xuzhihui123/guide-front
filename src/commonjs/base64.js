/*
 * @Author: Lancer
 * @Date:2019/12/20
 * @Last Modified by:   Lancer
 * @Last Modified time: 2019/12/20
 */


//无兼容 放心使用~
let baseTofile = {
  dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}
}

export default  baseTofile