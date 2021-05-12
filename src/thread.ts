import { Worker } from 'worker_threads';

enum Status {
	OK = 0,
	WORKING = 1
}

class Thread {

    dispatch(handler: Function) {
    	this.status = Status.WORKING

	    return new Promise((resolve, reject) => {
	    	console.log(this.status)
	    	const worker_th = new Worker('./service.js', { workerData: {handler: handler.toString()} });
	    	worker_th.on('message', ()=>{resolve(0);this.status=Status.OK;});
	    	worker_th.on('error', reject);
	    	worker_th.on('exit', (code: number) => {
	        	if (code !== 0) {
	        		reject(new Error(`Worker stopped with exit code ${code}`));
	        	}
			})
		})
	}

	status: Status = Status.OK;
}

export { Thread, Status };