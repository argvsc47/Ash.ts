import { getConfig } from 'doge-config';

const config = getConfig('ash.ts', {
	port: 8080,
	protocol: 'http',
});

export default config;
module.exports = config;

export const port = config.__getNumber('port');
export const protocol = config.__getString('protocol');
