import { TaskMasterObject, TaskMast } from "../../type";
import { BaseModel } from "./_baseModel";
import { Scalars } from "../..";
import { TaskMastModel } from "./taskMastModel";
export declare class TaskMasterObjectModel extends BaseModel<TaskMasterObject> {
    static getBlanc(groupID: Scalars["String"], tasks: Array<TaskMast>): TaskMasterObject;
    get groupID(): string;
    get createdAt(): number;
    get updatedAt(): number;
    get deletedAt(): import("../..").Maybe<number> | undefined;
    get limitTime(): number;
    set limitTime(input: number);
    get remindSlackWeek(): string;
    set remindSlackWeek(input: string);
    get remindSlackTime(): string;
    set remindSlackTime(input: string);
    get tasks(): TaskMast[];
    set tasks(input: TaskMast[]);
    get isRegisterable(): boolean;
    get isAdmin(): boolean;
    /**
     * roleがAdminなら、掃除場所情報を新規登録、または更新できる
     *
     */
    register(): Promise<void>;
    /**
     * roleがAdminなら、掃除場所情報を新規登録、または更新できる
     *
     */
    updateTaskMasterObj(input: TaskMasterObject): Promise<void>;
    getTaskMastModel(groupID: string): TaskMastModel;
}
