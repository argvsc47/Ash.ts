class Route {
	constructor(rurl: string, rfunc: Function) {
		this.url = rurl;
		this.func = rfunc;
	}
	url: string;
	func: Function;
}

class Router {
	route(url: string, func: Function) {
		this.routes.push(new Route(url, func));
	}
	getHandler(url: string): Function {
		for (var i = 0; i < this.routes.length; i++) {
			if (this.routes[i].url === url) {
				return this.routes[i].func;
			}
		}
		return function (request, response) {
			response.status = 404;
			response.end();
		};
	}
	routes: Route[] = [];
}

export { Router };
