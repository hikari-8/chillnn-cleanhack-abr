import { Scalars, GroupMast } from "../../type";

export interface IGroupMastRepository {
	addGroup(input: GroupMast): Promise<GroupMast>;
	deleteGroup(input: GroupMast): Promise<GroupMast>;
	updateGroup(input: GroupMast): Promise<GroupMast>;
	fetchGroupByGroupID(groupID: Scalars["ID"]): Promise<GroupMast | null>;
}
