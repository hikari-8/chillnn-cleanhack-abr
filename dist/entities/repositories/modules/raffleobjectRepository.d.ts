import { Scalars, RaffleObject } from "../../type";
export interface IRaffleObjectRepository {
    addRaffleObject(input: RaffleObject): Promise<RaffleObject>;
    fetchRaffleObject(raffleID: Scalars["ID"]): Promise<RaffleObject | null>;
}
