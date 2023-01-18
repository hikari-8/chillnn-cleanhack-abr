import { TaskMasterObject, TaskMast } from "../../type";
import { BaseModel } from "./_baseModel";
import { Scalars } from "../..";
import { TaskMastModel } from "./taskMastModel";
import { RaffleObjectModel } from "./raffleObjectModel";
export declare class TaskMasterObjectModel extends BaseModel<TaskMasterObject> {
    static getBlanc(groupID: Scalars["String"], tasks: Array<TaskMast>): TaskMasterObject;
    get groupID(): string;
    get taskMasterObjectID(): string;
    get createdAt(): number;
    get updatedAt(): number;
    get deletedAt(): import("../..").Maybe<number> | undefined;
    get limitTime(): string;
    set limitTime(input: string);
    get remindSlackWeek(): string;
    set remindSlackWeek(input: string);
    get remindSlackTime(): string;
    set remindSlackTime(input: string);
    get slackURL(): string;
    set slackURL(input: string);
    get tasks(): TaskMast[];
    set tasks(input: TaskMast[]);
    get isRegisterable(): boolean;
    get isAdmin(): boolean;
    /**
     * 掃除場所情報を新規登録、または更新できる/ !roleがAdminかどうか後で分岐を作るべき
     *
     */
    updateTaskMasterObj(): Promise<void>;
    getTaskMastModel(groupID: string): TaskMastModel;
    /**
     * くじの初期化オブジェクトを作成する
     *
     */
    getRaffleModel(): Promise<RaffleObjectModel>;
    /**
     * このグループのくじデータをくじのuuidで取得する
     * @returns
     */
    fetchRaffleItemByRaffleID(raffleID: string): Promise<RaffleObjectModel | null>;
    /**
     * このグループのtasksから、statusがdeletedを省いて返す
     *
     */
    filterActiveTasks(): Promise<TaskMastModel[]>;
    /**
     * このグループのtasksから、statusがdeletedを省いて返す(mastで返す版)
     *
     */
    filterActiveTasksMast(): Promise<TaskMast[]>;
}
