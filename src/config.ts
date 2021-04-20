import { getConfig } from 'doge-config';

const config = getConfig('ash.ts', {
	port: 8000,
	protocol: 'http',
	urls: {
		'/':''
	},
});

export default config;
module.exports = config;

export const port = config.__getNumber('port');
export const protocol = config.__getString('protocol');
export const urls = config.__getField('urls');
