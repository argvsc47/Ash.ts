import { Config } from './config';
import fs from 'fs';

class Profiler {
	constructor() {
		var devcfg = new Config();
		var prdcfg = new Config();
		const extensions = {
			".html": "text/html",
			".css": "text/css",
			".ico": "image/x-icon",
			".jpg": "image/jpeg",
			".png": "image/png",
			".js": "application/javascript",
			".json": "application/json",
		};
		devcfg.readVARS(8080, "http", 6,  extensions); //port, protocol, pool_size extensions
		prdcfg.readVARS(8000, "https", 8, extensions);
		this.profiles = {
			"dev": devcfg,
			"prod": prdcfg
		};
	}

	loadProfileCfg(name: string, config: Config) {
		this.profiles[name] = config;
	}

	loadProfiles(filename: string) {
		const profiles = JSON.parse(fs.readFileSync(filename, 'utf-8'));
		for (const prf in profiles) {
			const profile = profiles[prf];
			var tmpcfg = new Config();
			tmpcfg.readVARS(profile.port, profile.protocol, profile.pool_sz, profile.exts);
			this.loadProfileCfg(prf, tmpcfg);
		}
	}

	saveProfiles(filename: string) {
		fs.writeFile(filename, JSON.stringify(this.profiles), (err)=>{throw err});
	}

	getProfile(name: string) {
		if (!(name in this.profiles)) {
			throw "Cannot find profile.";
		}
		return this.profiles[name];
	}

	profiles: object;
}

export { Profiler };
