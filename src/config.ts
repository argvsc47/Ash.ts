import fs from 'fs';

interface IConfig {
	port: number,
	protocol: string,
	pool_sz: number,
	exts: object,
}

class Config {

	readVARS(port: number, protocol: string, pool_sz: number, exts: object) {
		this.port = port;
		this.protocol = protocol;
		this.pool_sz = pool_sz;
		this.exts = exts;
	}
	
	readENV() {
		this.port = parseInt(process.env.PORT);
		this.protocol = process.env.PROTOCOL;
		this.pool_sz = parseInt(process.env.POOL_SIZE);
		this.exts = JSON.parse(process.env.EXTS);
	}

	readJSON(filename: string) {
		const cfg : IConfig = JSON.parse(fs.readFileSync(filename, 'utf-8'));
		this.port = cfg.port;
		this.protocol = cfg.protocol;
		this.pool_sz = cfg.pool_sz;
		this.exts = cfg.exts;
	}
	
	port: number;
	protocol: string;
	pool_sz: number;
	exts: object;
}

export { Config };