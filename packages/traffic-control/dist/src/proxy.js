import http from "http";
http
    .createServer((req, res) => {
    const options = {
        hostname: "www.google.com",
        port: 80,
        path: req.url,
        method: req.method,
        headers: req.headers,
    };
    const proxy = http.request(options, function (res) {
        res.writeHead(res.statusCode, res.headers);
        res.pipe(res, {
            end: true,
        });
    });
    req.pipe(proxy, {
        end: true,
    });
})
    .listen(56015);
