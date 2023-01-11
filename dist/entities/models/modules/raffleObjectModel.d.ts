import { RaffleObject, RaffleMast, RaffleStatus } from "../../type";
import { BaseModel } from "./_baseModel";
import { Scalars } from "../..";
import { GroupModel } from "./groupModel";
export declare class RaffleObjectModel extends BaseModel<RaffleObject> {
    static getBlanc(tasks: Array<RaffleMast>, groupID: Scalars["String"], limitTime: Scalars["String"], raffleStatus: RaffleStatus, remindSlackWeek: Scalars["String"], remindSlackTime: Scalars["String"]): RaffleObject;
    get raffleID(): string;
    get groupID(): string;
    get createdAt(): number;
    get updatedAt(): number;
    get deletedAt(): import("../..").Maybe<number> | undefined;
    get limitTime(): string;
    set limitTime(input: string);
    get raffleStatus(): string;
    set raffleStatus(input: string);
    get remindSlackWeek(): string;
    set remindSlackWeek(input: string);
    get remindSlackTime(): string;
    set remindSlackTime(input: string);
    get tasks(): RaffleMast[];
    set tasks(input: RaffleMast[]);
    get isRegisterable(): boolean;
    get isAdmin(): boolean;
    get isDone(): boolean;
    /**
     * ルームのそれぞれのくじのデータを一括で登録・編集する //後でroleで分岐作る
     */
    register(): Promise<void>;
    /**
     * ルームのそれぞれのくじのデータを一括で登録・編集する //後でroleで分岐作る
     * かつ、statusがDONEの時のみgroupのrecordsにもpushする
     */
    /**
     * raffleDataを追加後のgroupDataにpushの処理
     *
     */
    /**
     * グループDataをfetchできる(後でフロントでroleの分岐作る)
     *
     */
    fetchGroupMast(): Promise<GroupModel | null>;
    /**
     * raffleのmodelをmastに解く関数
     *
     */
    RaffleObjectModelToGroupObject(): Promise<RaffleObject>;
    fetchRaffleItem(): Promise<RaffleObjectModel | null>;
}
