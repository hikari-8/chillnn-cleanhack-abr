import { GroupMast, RaffleObject, TaskMasterObject } from "../../type";
import { BaseModel } from "./_baseModel";
import { Scalars } from "../../type";
import { RaffleObjectModel } from "./raffleObjectModel";
export declare class GroupModel extends BaseModel<GroupMast> {
    static getBlanc(createdUserID: Scalars["String"], records: Array<RaffleObject>): GroupMast;
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
     * raffleオブジェクトをgroupからfetchできる(後でフロントでroleの分岐作る)
     *
     */
    fetchRaffleObjectModel(raffleID: string): Promise<RaffleObjectModel | null>;
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
