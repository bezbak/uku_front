export function getUserToken() {
  return JSON.parse(localStorage.getItem("token"))
}