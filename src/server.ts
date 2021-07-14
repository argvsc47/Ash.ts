import { Router } from './router';
import { Pool } from './pool';
import { Config } from './config';
import http from 'http';
import https from 'https';
import fs from 'fs';

class asherver {
	constructor(config: Config) {
		this.router = new Router();
		this.pool = new Pool(config.pool_sz);

		this.port = config.port;
		this.exts = config.exts;

		var used_protocol: any;

		if (config.protocol === 'http') {
			used_protocol = require('http');
		} else if (config.protocol === 'https') {
			used_protocol = require('https');
		}

		this.listener = used_protocol.createServer(
			async (request: http.IncomingMessage, response: http.ServerResponse) => {
				console.log(
					`[+] - HTTP/1.1 ${request['method']} request from ${request.url} -`
				);
				for (const ext in this.exts) {
					if (request.url.endsWith(ext)) {
						this.resource(request.url, request, response);
						return;
					}
				}

				var handler = await this.router.getHandler(request.url);
				if (handler) {
					this.pool.dispatch(() => {
						handler(request, response);
					});
				}
			}
		);
	}

	listen() {
		console.log('[*] Started server');
		console.log(`[*] Listening on port ${this.port}`);
		console.log('===========================================');
		this.listener.listen(this.port);
	}

	resource(
		file: string,
		request: http.IncomingMessage,
		response: http.ServerResponse
	) {
		for (const rsrc of fs.readdirSync('./resources')) {
			if (file === '/' + rsrc) {
				response.setHeader('Content-Type', this.exts[rsrc]);
				response.statusCode = 200;
				response.write(fs.readFileSync(`./resources${file}`));
				response.end();
				return;
			}
		}
		response.statusCode = 404;
		response.end();
	}

	router: Router;
	listener: http.Server | https.Server;
	pool: Pool;
	port: number;
	exts: object;
}

export { asherver };
