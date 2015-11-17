export default class xhr {

    constructor() {

    }

    x() {
        let xmlhttp;
        if (window.XMLHttpRequest) {
           xmlhttp = new XMLHttpRequest();
       } else {
           var versions = [
             "MSXML2.XmlHttp.6.0",
             "MSXML2.XmlHttp.5.0",
             "MSXML2.XmlHttp.4.0",
             "MSXML2.XmlHttp.3.0",
             "MSXML2.XmlHttp.2.0",
             "Microsoft.XmlHttp"
         ];
         for(var i = 0; i < versions.length; i++) {
             try {
                 xmlhttp = new ActiveXObject(versions[i]);
                 break;
             } catch (e) {
             }
         }
       }
       return xmlhttp;
    }


    get(opts) {
        var query = [];
        for (var key in opts.data) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(opts.data[key]));
        }
        return this._send({
            url: opts.url + (query.length ? '?' + query.join('&') : ''),
            callback: opts.callback,
            method: 'GET',
            data: null,
            sync: opts.sync || false
        });
    }

    post(opts) {
        var query = [];
       for (var key in opts.data) {
           query.push(encodeURIComponent(key) + '=' + encodeURIComponent(opts.data[key]));
       }
       return this._send({
           url: opts.url,
           callback: opts.callback,
           method: 'POST',
           data: query.join('&'),
           sync: opts.sync || false
       });
    }


    _send(opts) {
        var self = this;
        return new Promise((resolve, reject) => {
            var x = self.x();
            x.open(opts.method, opts.url, opts.sync);
            x.onreadystatechange = () => {
                if (x.readyState == 4) {
                    resolve(JSON.parse(x.responseText));
                } else {
                    reject('Error');
                }
            };
            if (opts.method == 'POST') {
                x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            }
            x.send(opts.data);

        });
    }
}
