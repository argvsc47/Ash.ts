"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protocol = exports.port = void 0;
const doge_config_1 = require("doge-config");
const config = doge_config_1.getConfig('ash.ts', {
    port: 8080,
    protocol: 'http',
});
exports.default = config;
module.exports = config;
exports.port = config.__getNumber('port');
exports.protocol = config.__getString('protocol');
