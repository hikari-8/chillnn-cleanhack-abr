import { TaskMast, TaskStatus } from "../../type";
import { BaseModel } from "./_baseModel";
import { Scalars } from "../../type";
export declare class TaskMastModel extends BaseModel<TaskMast> {
    static getBlanc(groupID: Scalars["ID"], taskName: Scalars["String"], headCount: Scalars["Int"], optionItem: Scalars["String"]): TaskMast;
    get groupID(): string;
    get taskID(): string;
    get createdAt(): number;
    get updatedAt(): number;
    get deletedAt(): import("../../type").Maybe<number> | undefined;
    get taskName(): string;
    set taskName(input: string);
    get headCount(): number;
    set headCount(input: number);
    get taskStatus(): TaskStatus;
    get optionItem(): string;
    set optionItem(input: string);
    set taskStatus(input: TaskStatus);
    /**
     * TaskMasterObjectのtaskspropertyに入れるmastを作成するために、TaskMastModelをmastに解く関数
     *
     */
    taskMastModelToTaskMast(): Promise<TaskMast>;
}
