export function checkPassword(password) {
  var str = password;
  if (str == null || str.length < 8) {
    return false;
  }
  var reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
  return reg.test(str);
}
