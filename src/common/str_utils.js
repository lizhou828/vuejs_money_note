export function isEmail(_email){
  return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(_email)
}

export function isMobileNumber(_mobile){
  return /^1[3456789]\d{9}$/.test(_mobile)
}
