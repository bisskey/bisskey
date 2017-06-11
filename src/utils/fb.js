export function loadProfile (response) {
  return new Promise(resolve => {
    window.FB.api('/me?fields=email,picture,name', {
      access_token: response.accessToken
    }, response => resolve(response))
  })
}

export function checkLogin () {
  return new Promise(resolve => {
    window.FB.getLoginStatus(response => resolve(response))
  })
}
