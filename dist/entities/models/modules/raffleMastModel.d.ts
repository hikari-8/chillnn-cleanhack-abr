import { RaffleMast } from "../../type";
import { BaseModel } from "./_baseModel";
import { Scalars } from "../../type";
export declare class RaffleMastModel extends BaseModel<RaffleMast> {
    static getBlanc(taskID: Scalars["ID"], taskName: Scalars["String"], groupID: Scalars["ID"], headCount: Scalars["Int"], joinUserIDArray: Array<string>): RaffleMast;
    get raffleID(): string;
    get groupID(): string;
    get createdAt(): number;
    get updatedAt(): number;
    get deletedAt(): import("../../type").Maybe<number> | undefined;
    get taskName(): string;
    set taskName(input: string);
    get headCount(): number;
    set headCount(input: number);
    get joinUserIDArray(): string[];
    set joinUserIDArray(input: string[]);
    get optionName(): string;
    set optionName(input: string);
    get optionValidUsers(): string[];
    set optionValidUsers(input: string[]);
    /**
     * RaffleMastModelをmastに解く関数
     *
     */
    raffleMastModelToTaskMast(): Promise<RaffleMast>;
}
