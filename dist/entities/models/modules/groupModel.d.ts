import { GroupMast, TaskMasterObject } from "../../type";
import { BaseModel } from "./_baseModel";
import { Scalars } from "../../type";
export declare class GroupModel extends BaseModel<GroupMast> {
    static getBlanc(createdUserID: Scalars["String"]): GroupMast;
    get groupID(): string;
    get createdUserID(): string;
    get createdAt(): number;
    get updatedAt(): number;
    get deletedAt(): import("../../type").Maybe<number> | undefined;
    get groupName(): string;
    set groupName(input: string);
    get isRegisterable(): boolean;
    get isAdmin(): boolean;
    /**
     * グループを更新できる(後でフロントでroleの分岐作る)
     *
     */
    updateGroupMast(): Promise<void>;
    /**
     * グループをfetchできる(後でフロントでroleの分岐作る)
     *
     */
    fetchGroupMast(): Promise<GroupModel | null>;
    /**
     * このグループのマスターデータを取得する //多分使えん(モデファク入れとらんけ)
     * @returns
     */
    fetchTaskMasterObject(): Promise<TaskMasterObject | null>;
}
