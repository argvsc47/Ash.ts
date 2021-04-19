//Web framework
declare function require(name:string)

var url = require('url')
var fs = require('fs')

function Route (rurl,rfunc) {
	this.url = rurl
	this.func = rfunc
}

function Router() {
	this.routes = []
	this.route = (url,func) => {
		this.routes.push(new Route(url,func))
	}
	this.getHandler = (url) => {
		for (var i = 0; i < this.routes.length; i++) {
			if (this.routes[i].url === url) {
				return this.routes[i].func
			}
		}
	}
}

function Config() {
	
	var data = JSON.parse(fs.readFileSync('./config.ash', 'utf8'))
	this.port = data["port"]
	this.protocol = data["proto"]
}

var http;

var x = new Config()
if (x.protocol === "http") {
	var http = require('http')
} else if (x.protocol === "https") {
	var http = require('https')
}

function Server(router) {
	this.router = router
	this.listener = http.createServer((request,response) => {
		console.log(`[+] - HTTP/1.1 ${request['method']} request from ${request.url} -`)
		var handler = this.router.getHandler(request.url)
		handler(request,response)
	})
	this.listen = port => {
		console.log('[*] Started server')
		console.log(`[*] Listening on port ${port}`)
		console.log('===========================================')
		this.listener.listen(port)
	}
}