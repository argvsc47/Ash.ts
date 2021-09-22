import { Thread, Status } from './thread'

class Pool {
	
	constructor(pool_sz: number) {
		this.size = pool_sz;
		this.workers = [];
		
		for (var i = 0; i < this.size; i++) {
			this.workers.push(new Thread());
		}
	}

	getFree() {
		for (var id = 0; id < this.size; id++) {
			if (this.workers[id].status === Status.OK) {
				return this.workers[id];
			}
		}
	}

	async dispatch(handler: Function) {
		this.getFree().dispatch(handler);
	}

	size: number;
	workers: Thread[] = [];
}

export { Pool };
