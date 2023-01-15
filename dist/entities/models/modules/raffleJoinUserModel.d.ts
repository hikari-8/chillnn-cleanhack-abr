import { RaffleJoinUser } from "../../type";
import { BaseModel } from "./_baseModel";
import { Scalars } from "../../type";
export declare class RaffleJoinUserModel extends BaseModel<RaffleJoinUser> {
    static getBlanc(userID: Scalars["ID"], groupID: Scalars["ID"]): RaffleJoinUser;
    get userID(): string;
    get groupID(): string;
    get joinAt(): number;
    get deletedAt(): import("../../type").Maybe<number> | undefined;
    /**
     * mastに解く関数
     */
    raffleJoinUserModelToMast(): Promise<RaffleJoinUser>;
}
