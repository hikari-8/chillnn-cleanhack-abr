import {
	IRaffleObjectRepository,
	RaffleObject,
	RaffleMast,
	Scalars,
	RaffleJoinUser,
} from "../../entities";
import { compareNumDesc } from "../../util";

type RaffleMastGroupCache = {
	[groupID: string]: {
		[taskID: string]: {
			mast: RaffleMast;
			createdAt: number;
		};

		//Userのキャッシュ余裕があれば実装する
		// [userID: string]: {
		// 	mast: RaffleJoinUser;
		// 	createdAt: number;
		// };
	};
};

type RaffleMastRaffleCache = {
	[taskID: string]: {
		mast: RaffleMast;
		createdAt: number;
	};
};

export class RaffleObjectRepositoryCacheAdaptor
	implements IRaffleObjectRepository
{
	//後で名前raffleCacheに変える
	private groupCache: RaffleMastGroupCache;
	private taskCache: RaffleMastRaffleCache;

	constructor(
		private repository: IRaffleObjectRepository,
		optional?: {
			companyCache: RaffleMastGroupCache;
			taskCache: RaffleMastRaffleCache;
		}
	) {
		this.groupCache = optional?.companyCache || {};
		this.taskCache = optional?.taskCache || {};
	}

	async addRaffleObject(input: RaffleObject): Promise<RaffleObject> {
		const res = await this.repository.addRaffleObject(input);
		res.createdAt = new Date().getDate();
		res.updatedAt = new Date().getDate();
		this.updateGroupCache(res.groupID, res.tasks, res.createdAt);
		return res;
	}

	async updateRaffleObject(input: RaffleObject): Promise<RaffleObject> {
		const res = await this.repository.updateRaffleObject(input);
		res.updatedAt = new Date().getDate();
		this.updateGroupCache(res.groupID, res.tasks, res.createdAt);
		return res;
	}

	async fetchRaffleObject(raffleID: string): Promise<RaffleObject | null> {
		const cache = this.fetchCacheRaffleObject(raffleID);
		if (cache) {
			return null;
		} else if (cache) {
			return cache;
		}
		const res = await this.repository.fetchRaffleObject(raffleID);
		this.updateRaffleCacheByGroupID(raffleID);
		return res;
	}

	//超適当キャッシュ
	async fetchRafflesByGroupID(groupID: string): Promise<RaffleObject[]> {
		const res = await this.repository.fetchRafflesByGroupID(groupID);
		return res;

		// const cache = this.fetchRaffles(groupID);
		// if (cache) return cache;
		// const res = await this.repository.fetchRafflesByGroupID(groupID);
		// this.addcacheBulk(groupID, res);
		// return res.sort((a, b) => compareNumDesc(a.createdAt, b.createdAt));
	}

	// ===============================================================
	//
	// private
	//
	// ===============================================================

	private updateGroupCache(
		groupID: Scalars["ID"],
		tasks: RaffleMast[],
		createdAt: number
	): void {
		//groupCacheに保存
		this.groupCache[groupID] = {};
		tasks.forEach((task) => {
			this.groupCache[task.groupID][task.taskID] = {
				mast: task,
				createdAt,
			};
			this.taskCache[task.taskID] = { mast: task, createdAt };
		});
	}

	// private addCacheEach(raffleID: Scalars["ID"], raffle: RaffleObject | null) {
	// 	this.taskCache[raffleID] = raffle || "blanc";
	// 	if (!raffle) return;
	// 	const groupCache = this.groupCache[raffle.raffleID];
	// 	if (groupCache) {
	// 		groupCache[raffleID] = raffle;
	// 	}
	// }

	// private addCacheBulk(groupID: Scalars["ID"], raffles: RaffleObject[]) {
	// 	this.groupCache[groupID] = {};
	// 	for (const raffle of raffles) {
	// 		this.addCacheEach(raffle.raffleID, raffle);
	// 	}
	// }

	//とりま簡易的に設置しているけど、後で見返した方が良さそう
	private updateRaffleCacheByGroupID(raffleID: Scalars["ID"]) {
		this.groupCache[raffleID] = {};
		if (!this.groupCache) return;
	}

	private fetchCacheRaffleObject(groupID: Scalars["ID"]) {
		return this.groupCache[groupID];
	}

	private fetchRaffles(groupID: Scalars["ID"]) {
		const groupCache = this.groupCache[groupID];
		if (!groupCache) return null;
		return (
			Object.keys(groupCache)
				.map((key) => {
					return groupCache[key];
				})
				// .filter((item) => !item.deletedAt)
				.sort((a, b) => compareNumDesc(a.createdAt, b.createdAt))
		);
	}
}
