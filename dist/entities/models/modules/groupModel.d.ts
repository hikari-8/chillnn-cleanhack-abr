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
     * roleがAdminなら、掃除場所情報を新規登録、または更新できる
     *
     */
    register(): Promise<void>;
    /**
     * このグループのグループデータを取得する
     * @returns
     */
    fetchGroupData(input: string): Promise<GroupMast | null>;
    /**
     * このグループのマスターデータを取得する
     * @returns
     */
    fetchTaskMasterObject(input: string): Promise<TaskMasterObject | null>;
}
