import { TaskMast } from "../../type";
import { BaseModel } from "./_baseModel";
import { Scalars } from "../../type";
export declare class TaskMastModel extends BaseModel<TaskMast> {
    static getBlanc(groupID: Scalars["ID"], taskName: Scalars["String"]): TaskMast;
    get groupID(): string;
    get taskID(): string;
    get createdAt(): number;
    get updatedAt(): number;
    get deletedAt(): import("../../type").Maybe<number> | undefined;
    get taskName(): string;
    set taskName(input: string);
    get headCount(): number;
    set headCount(input: number);
}
