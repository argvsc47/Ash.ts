//Web framework

import {
	port,
	protocol,
} from './config';
import http from 'http';
import https from 'https';

class Route {
	constructor (rurl: string, rfunc: Function) {
		this.url = rurl;
		this.func = rfunc;
	}
	url: string;
	func: Function;
}

class Router {
	routes: Route[] = [];
	route (url: string, func: Function) {
		this.routes.push(new Route(url, func));
	}
	getHandler (url: string): Function | void {
		for (var i = 0; i < this.routes.length; i++) {
			if (this.routes[i].url === url) {
				return this.routes[i].func;
			}
		}
	}
}

var used_protocol: any;

if (protocol === "http") {
	used_protocol = require('http')
} else if (protocol === "https") {
	used_protocol = require('https')
}

class Server {
	constructor (router: Router) {
		this.router = router
		this.listener = used_protocol.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
			console.log(`[+] - HTTP/1.1 ${request['method']} request from ${request.url} -`)
			var handler = this.router.getHandler(request.url || '/');
			handler && handler(request, response);
		})
		this.listen = (port: number) => {
			console.log('[*] Started server')
			console.log(`[*] Listening on port ${port}`)
			console.log('===========================================')
			this.listener.listen(port)
		}
	}
	router: Router;
	listener: http.Server | https.Server;
	listen: Function;
}

export {
	Route,
	Router,
	Server,
}