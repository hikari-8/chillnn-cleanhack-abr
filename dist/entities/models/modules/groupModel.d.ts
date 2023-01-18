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
    set joinUserIDArray(input: string[]);
    get isRegisterable(): boolean;
    get isAdmin(): boolean;
    /**
     * ユーザー情報を新規登録、または更新する
     */
    register(): Promise<void>;
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
     * rafflesをgroupからfetchできる(後でフロントでroleの分岐作る)
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
     * raffleDataを追加後のgroupDataにpushの処理
     *
     */
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
