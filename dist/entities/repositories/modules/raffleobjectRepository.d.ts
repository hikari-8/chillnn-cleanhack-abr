import { Scalars, RaffleObject } from "../../type";
export interface IRaffleObjectRepository {
    addRaffleObject(input: RaffleObject): Promise<RaffleObject>;
    updateRaffleObject(input: RaffleObject): Promise<RaffleObject>;
    fetchRaffleObject(raffleID: Scalars["ID"]): Promise<RaffleObject | null>;
    fetchRafflesByGroupID(groupID: string): Promise<RaffleObject[]>;
}
