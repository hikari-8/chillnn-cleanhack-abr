import { Scalars, RaffleObject } from "../../type";
export interface IRaffleObjectRepository {
    addRaffleObject(input: RaffleObject): Promise<RaffleObject>;
    updateRaffleObject(input: RaffleObject): Promise<RaffleObject>;
    fetchRaffleObject(groupID: Scalars["ID"]): Promise<RaffleObject | null>;
}
