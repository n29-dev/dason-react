// Set a Cookie
function setCookie({ name, value, expires }) {
    const date = new Date();
    date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

function getCookie(cName) {
    const name = `${cName}=`;
    const cDecoded = decodeURIComponent(document.cookie); // to be careful
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach((val) => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    });
    return res;
}

export { setCookie, getCookie };
