import { Scalars, GroupMast } from "../../type";

export interface IGroupMastRepository {
	addGroup(input: GroupMast): Promise<GroupMast>;
	deleteGroup(groupID: Scalars["ID"]): Promise<GroupMast>;
	updateGroup(input: GroupMast): Promise<GroupMast>;
	fetchGroupByGroupID(groupID: Scalars["ID"]): Promise<GroupMast | null>;
}
