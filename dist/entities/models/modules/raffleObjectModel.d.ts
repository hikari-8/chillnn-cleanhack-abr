import { RaffleObject, RaffleMast, RaffleStatus, RaffleJoinUser } from "../../type";
import { BaseModel } from "./_baseModel";
import { Scalars } from "../..";
import { GroupModel } from "./groupModel";
export declare class RaffleObjectModel extends BaseModel<RaffleObject> {
    static getBlanc(tasks: Array<RaffleMast>, groupID: Scalars["String"], limitHour: Scalars["Int"], limitMin: Scalars["Int"], limitTimeUnix: Scalars["Int"], raffleStatus: RaffleStatus, remindSlackHour: Scalars["Int"], remindSlackMin: Scalars["Int"], remindTimeUnix: Scalars["Int"], channelID: Scalars["String"], activeMembers: Array<RaffleJoinUser>): RaffleObject;
    get raffleID(): string;
    get groupID(): string;
    get createdAt(): number;
    get updatedAt(): number;
    get deletedAt(): import("../..").Maybe<number> | undefined;
    get limitHour(): number;
    set limitHour(input: number);
    get limitMin(): number;
    set limitMin(input: number);
    get limitTimeUnix(): number;
    set limitTimeUnix(input: number);
    get remindSlackHour(): number;
    set remindSlackHour(input: number);
    get remindSlackMin(): number;
    set remindSlackMin(input: number);
    get remindTimeUnix(): number;
    set remindTimeUnix(input: number);
    get raffleStatus(): RaffleStatus;
    set raffleStatus(input: RaffleStatus);
    get tasks(): RaffleMast[];
    set tasks(input: RaffleMast[]);
    get activeMembers(): RaffleJoinUser[];
    set activeMembers(input: RaffleJoinUser[]);
    get channelID(): string;
    set slackURL(input: string);
    get isRegisterable(): boolean;
    get isAdmin(): boolean;
    get isDone(): boolean;
    /**
     * ルームのそれぞれのくじのデータを一括で登録・編集する //後でroleで分岐作る
     */
    register(): Promise<void>;
    /**
     * 全ての登録したくじをgorupIDでfetchできる(後でフロントでroleの分岐作る)
     *@returns
     */
    fetchRafflesByGroupID(): Promise<RaffleObjectModel[]>;
    /**
     * 全ての登録したくじの中で最後のくじをgorupIDでfetchできる
     *@returns
     */
    fetchLastRaffleItemByGroupID(): Promise<RaffleObjectModel | null>;
    /**
     * グループDataをfetchできる(後でフロントでroleの分岐作る)
     *
     */
    fetchGroupMast(): Promise<GroupModel | null>;
    /**
     * raffleのmodelをmastに解く関数
     *
     */
    raffleObjectModelToRaffleObject(): Promise<RaffleObject>;
    fetchRaffleItem(): Promise<RaffleObjectModel | null>;
}
