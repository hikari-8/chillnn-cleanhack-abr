import { GroupMast, TaskMasterObject } from "../../type";
import { BaseModel } from "./_baseModel";
import { Scalars } from "../../type";
import { RaffleObjectModel } from "./raffleObjectModel";
export declare class GroupModel extends BaseModel<GroupMast> {
    static getBlanc(createdUserID: Scalars["String"]): GroupMast;
    get groupID(): string;
    get createdUserID(): string;
    get createdAt(): number;
    get updatedAt(): number;
    get deletedAt(): import("../../type").Maybe<number> | undefined;
    get groupName(): string;
    set groupName(input: string);
    get members(): string[];
    set members(input: string[]);
    get isRegisterable(): boolean;
    get isAdmin(): boolean;
    /**
     * グループを新規登録、または更新する
     */
    register(): Promise<void>;
    /**
     * Admin以外がgroupのparamsで入ってきた時、groupのmembersの配列にpushして、updateする
     */
    pushGroupMembers(userID: string): Promise<void>;
    /**
     * グループを更新できる
     *
     */
    updateGroupMast(): Promise<void>;
    /**
     * グループをfetchできる
     *
     */
    fetchGroupMast(): Promise<GroupModel | null>;
    /**
     * rafflesをgroupからfetchできる
     * @returns
     *
     */
    fetchRafflesByGroupID(): Promise<RaffleObjectModel[]>;
    /**
     * 全ての登録したくじの中で最後のくじをgorupIDでfetchできる
     *@returns
     */
    fetchLastRaffleItemByGroupID(): Promise<RaffleObjectModel | null>;
    /**
     * このグループのマスターデータを取得する //多分使えん(モデファク入れとらんけ)
     * @returns
     */
    fetchTaskMasterObject(): Promise<TaskMasterObject | null>;
    /**
     * groupのmodelをmastに解く関数
     *
     */
    GroupModelToGroupMast(): Promise<GroupMast>;
    /**
     * groupのmastをmodelに解く関数
     *
     */
    GroupMastToGroupModel(input: GroupMast): Promise<GroupModel | null>;
}
