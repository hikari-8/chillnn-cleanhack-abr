import { IGroupMastRepository, GroupMast } from "../../entities";
export declare class GroupMastRepositoryCacheAdaptor implements IGroupMastRepository {
    private repository;
    private GroupEachCache;
    private GroupAllCache;
    private mygroupID;
    constructor(repository: IGroupMastRepository);
    addGroup(input: GroupMast): Promise<GroupMast>;
    fetchGroupByGroupID(groupID: string): Promise<GroupMast | null>;
    private addCacheEach;
    private fetchGroup;
}
