import { workerData, parentPort } from 'worker_threads';

var task;

eval('task=' + workerData.handler);
task();

parentPort.postMessage({ status: 0 });
