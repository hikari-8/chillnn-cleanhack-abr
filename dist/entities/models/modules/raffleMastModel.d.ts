import { RaffleMast } from "../../type";
import { BaseModel } from "./_baseModel";
import { Scalars } from "../../type";
export declare class RaffleMastModel extends BaseModel<RaffleMast> {
    static getBlanc(taskID: Scalars["ID"], taskName: Scalars["String"], groupID: Scalars["ID"]): RaffleMast;
    get raffleID(): string;
    get groupID(): string;
    get createdAt(): number;
    get updatedAt(): number;
    get deletedAt(): import("../../type").Maybe<number> | undefined;
    get taskName(): string;
    set taskName(input: string);
    get headCount(): number;
    set headCount(input: number);
    /**
     * RaffleMastModelをmastに解く関数
     *
     */
    raffleMastModelToTaskMast(): Promise<RaffleMast>;
}
