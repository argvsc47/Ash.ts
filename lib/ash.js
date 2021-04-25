"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = exports.Router = exports.Route = void 0;
const config_1 = require("./config");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
        this.loadRouter = () => {
            for (const handler of fs_1.default.readdirSync('./handlers')) {
                var name = handler.replace("/\.[^/.]+$/", "");
                var rt = path_1.default.resolve('./handlers', handler);
                var route_handler = require(rt).handler;
                if (name === "index") {
                    var route = "/";
                }
                else {
                    var route = name;
                }
                this.router.route(route, route_handler);
            }
        };
    }
}
exports.Server = Server;
