export class GroupMastRepositoryCacheAdaptor {
    constructor(repository) {
        this.repository = repository;
        this.GroupEachCache = {};
        this.GroupAllCache = null;
        this.mygroupID = null;
    }
    async addGroup(input) {
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
    // async updateGroup(input: GroupMast): Promise<GroupMast> {
    // 	const res = await this.repository.updateGroup(input);
    // 	res.updatedAt = new Date().getDate();
    // 	this.addCacheEach(input.groupID, res);
    // 	this.mygroupID = input.groupID;
    // 	return res;
    // }
    async fetchGroupByGroupID(groupID) {
        const cache = this.fetchGroup(groupID);
        if (cache && cache === "blanc") {
            return null;
        }
        else if (cache) {
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
    addCacheEach(groupID, Group) {
        this.GroupEachCache[groupID] = Group || "blanc";
        if (this.GroupAllCache && Group) {
            this.GroupAllCache[groupID] = Group;
        }
    }
    fetchGroup(groupID) {
        return this.GroupEachCache[groupID];
    }
}
