import { IRaffleObjectRepository, RaffleObject, Scalars } from "../../entities";
import { compareNumDesc } from "../../util";

type RaffleMastGroupCache = {
	[groupID: string]: {
		[raffleID: string]: RaffleObject;
	};
};

type RaffleMastRaffleCache = {
	[raffleID: string]: RaffleObject | "blanc" | undefined;
};

export class RaffleObjectRepositoryCacheAdaptor
	implements IRaffleObjectRepository
{
	//後で名前raffleCacheに変える
	private groupCache: RaffleMastGroupCache = {};
	private raffleCache: RaffleMastRaffleCache = {};

	constructor(private repository: IRaffleObjectRepository) {}

	async addRaffleObject(input: RaffleObject): Promise<RaffleObject> {
		const res = await this.repository.addRaffleObject(input);
		res.createdAt = new Date().getDate();
		res.updatedAt = new Date().getDate();
		this.addCacheEach(res.raffleID, res);
		return res;
	}

	async updateRaffleObject(input: RaffleObject): Promise<RaffleObject> {
		const res = await this.repository.updateRaffleObject(input);
		res.updatedAt = new Date().getDate();
		this.addCacheEach(res.raffleID, res);
		return res;
	}

	async fetchRaffleObject(raffleID: string): Promise<RaffleObject | null> {
		const cache = this.fetchCacheRaffleObject(raffleID);
		if (cache && cache === "blanc") {
			return null;
		} else if (cache) {
			return cache;
		}
		const res = await this.repository.fetchRaffleObject(raffleID);
		this.addCacheEach(raffleID, res);
		return res;
	}

	async fetchRafflesByGroupID(groupID: string): Promise<RaffleObject[]> {
		const cache = this.fetchRaffles(groupID);
		if (cache) return cache;
		const res = await this.repository.fetchRafflesByGroupID(groupID);
		this.addCacheBulk(groupID, res);
		return res.sort((a, b) => compareNumDesc(a.createdAt, b.createdAt));
	}

	async fetchLastRaffleByGroupID(
		groupID: string
	): Promise<RaffleObject | null> {
		const cache = this.fetchCacheRaffleObjectByGroupID(groupID);
		if (cache && cache === "blanc") {
			return null;
		} else if (cache) {
			return cache;
		}
		const res = await this.repository.fetchLastRaffleByGroupID(groupID);
		if (!res) {
			return null;
		} else {
			this.addCacheEach(res!.raffleID, res);
			return res;
		}
	}

	// ===============================================================
	//
	// private
	//
	// ===============================================================

	private addCacheEach(raffleID: Scalars["ID"], raffle: RaffleObject | null) {
		this.raffleCache[raffleID] = raffle || "blanc";
		if (!raffle) return;
		const groupCache = this.groupCache[raffle.raffleID];
		if (groupCache) {
			groupCache[raffleID] = raffle;
		}
	}

	private addCacheBulk(groupID: Scalars["ID"], raffles: RaffleObject[]) {
		this.groupCache[groupID] = {};
		for (const raffle of raffles) {
			this.addCacheEach(raffle.raffleID, raffle);
		}
	}

	private fetchCacheRaffleObject(raffleID: Scalars["ID"]) {
		return this.raffleCache[raffleID];
	}

	private fetchCacheRaffleObjectByGroupID(groupID: Scalars["ID"]) {
		return this.raffleCache[groupID];
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
