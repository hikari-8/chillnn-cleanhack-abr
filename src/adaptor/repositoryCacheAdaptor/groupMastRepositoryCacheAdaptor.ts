import { IGroupMastRepository, GroupMast, Scalars } from "../../entities";

type Groupcache = {
	[groupID: string]: GroupMast | "blanc" | undefined;
};

export class GroupMastRepositoryCacheAdaptor implements IGroupMastRepository {
	private GroupEachCache: Groupcache = {};
	private GroupAllCache: Groupcache | null = null;
	private mygroupID: string | null = null;
	constructor(private repository: IGroupMastRepository) {}

	async addGroup(input: GroupMast): Promise<GroupMast> {
		const res = await this.repository.addGroup(input);
		res.createdAt = new Date().getDate();
		this.addCacheEach(input.groupID, res);
		this.mygroupID = input.groupID;
		return res;
	}

	// async deleteGroup(input: GroupMast): Promise<GroupMast> {
	// 	const res = await this.repository.deleteGroup(input);
	// 	res.deletedAt = new Date().getDate();
	// 	this.addCacheEach(input.groupID, res);
	// 	return res;
	// }

	async updateGroup(input: GroupMast): Promise<GroupMast> {
		const res = await this.repository.updateGroup(input);
		res.updatedAt = new Date().getDate();
		this.addCacheEach(input.groupID, res);
		this.mygroupID = input.groupID;
		return res;
	}

	async fetchGroupByGroupID(groupID: string): Promise<GroupMast | null> {
		const cache = this.fetchGroup(groupID);
		if (cache && cache === "blanc") {
			return null;
		} else if (cache) {
			return cache;
		}
		const res = await this.repository.fetchGroupByGroupID(groupID);
		this.addCacheEach(groupID, res);
		return res;
	}

	// ===============================================================
	//
	// private
	//
	// ===============================================================
	private addCacheEach(groupID: Scalars["ID"], Group: GroupMast | null) {
		this.GroupEachCache[groupID] = Group || "blanc";
		if (this.GroupAllCache && Group) {
			this.GroupAllCache[groupID] = Group;
		}
	}

	private fetchGroup(groupID: Scalars["ID"]) {
		return this.GroupEachCache[groupID];
	}
}
