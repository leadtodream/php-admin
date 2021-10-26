// 授权
const KEY = 'Authorization'

export function getAuth() {
  return localStorage.getItem(KEY) || sessionStorage.getItem(KEY)
}

export function removeAuth() {
  localStorage.removeItem(KEY)
  sessionStorage.removeItem(KEY)
}

export function setAuth(auth, is_autologin = false) {
  removeAuth()
  if (is_autologin) {
    localStorage.setItem(KEY, auth)
  } else {
    sessionStorage.setItem(KEY, auth)
  }
}
