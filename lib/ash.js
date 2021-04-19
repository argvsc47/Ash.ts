"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = exports.Router = exports.Route = void 0;
const config_1 = require("./config");
class Route {
    constructor(rurl, rfunc) {
        this.url = rurl;
        this.func = rfunc;
    }
}
exports.Route = Route;
class Router {
    constructor() {
        this.routes = [];
    }
    route(url, func) {
        this.routes.push(new Route(url, func));
    }
    getHandler(url) {
        for (var i = 0; i < this.routes.length; i++) {
            if (this.routes[i].url === url) {
                return this.routes[i].func;
            }
        }
    }
}
exports.Router = Router;
var used_protocol;
if (config_1.protocol === "http") {
    used_protocol = require('http');
}
else if (config_1.protocol === "https") {
    used_protocol = require('https');
}
class Server {
    constructor(router) {
        this.router = router;
        this.listener = used_protocol.createServer((request, response) => {
            console.log(`[+] - HTTP/1.1 ${request['method']} request from ${request.url} -`);
            var handler = this.router.getHandler(request.url || '/');
            handler && handler(request, response);
        });
        this.listen = (port) => {
            console.log('[*] Started server');
            console.log(`[*] Listening on port ${port}`);
            console.log('===========================================');
            this.listener.listen(port);
        };
    }
}
exports.Server = Server;
