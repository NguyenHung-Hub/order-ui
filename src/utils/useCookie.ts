type CookieMethods = {
  setCookie: (name: string, value: string, times: number) => void;
  getCookie: (name: string) => string | null;
  eraseCookie: (name: string) => void;
};

export default (): CookieMethods => {
  function setCookie(name: string, value: string, times: number) {
    var expires = '';
    if (times) {
      var date = new Date();
      date.setTime(date.getTime() + times);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  }
  function getCookie(name: string) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  function eraseCookie(name: string) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  return { setCookie, getCookie, eraseCookie };
};
