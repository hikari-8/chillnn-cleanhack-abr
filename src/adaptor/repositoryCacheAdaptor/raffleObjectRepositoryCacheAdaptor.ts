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

		//Userのキャッシュよゆうがあれば実装する
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

	async fetchRaffleTasksByGroupID(groupID: string): Promise<RaffleMast[]> {
		const GroupCache = this.groupCache[groupID];
		if (GroupCache)
			return (Object.keys(GroupCache) || [])
				.map((key) => this.groupCache[groupID][key].mast)
				.sort((a, b) => compareNumDesc(a.updatedAt, b.updatedAt));

		return (Object.keys(GroupCache) || [])
			.map((key) => this.groupCache[groupID][key].mast)
			.sort((a, b) => compareNumDesc(a.updatedAt, b.updatedAt));
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
}
