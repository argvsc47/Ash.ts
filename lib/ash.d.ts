/// <reference types="node" />
import http from 'http';
import https from 'https';
declare class Route {
    constructor(rurl: string, rfunc: Function);
    url: string;
    func: Function;
}
declare class Router {
    routes: Route[];
    route(url: string, func: Function): void;
    getHandler(url: string): Function | void;
}
declare class Server {
    constructor(router: Router);
    router: Router;
    listener: http.Server | https.Server;
    listen: Function;
}
export { Route, Router, Server, };
