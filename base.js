/**
 * Created by Denis on 19.06.2017.
 */
export function getDataFromItem(item) {
    return item && Object.getOwnPropertyNames(item).reduce((prev, prop) => {prev[prop] = item[prop];return prev}, {});
}
export function fetchErrorHandling(type = 'text') {
    return function (res) {
        if(!res.ok) {
            res.text().then((err) => {throw new Error(err)});
        }
        if(res[type]) return res[type]();
        else return res.text();
    };
};

export function getQueryVariable(search, variable) {
    var query = search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
}