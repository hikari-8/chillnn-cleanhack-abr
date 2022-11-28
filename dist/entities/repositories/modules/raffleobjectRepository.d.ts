import { Scalars, RaffleObject, RaffleMast } from "../../type";
export interface IRaffleObjectRepository {
    addRaffleObject(input: RaffleObject): Promise<RaffleObject>;
    updateRaffleObject(input: RaffleObject): Promise<RaffleObject>;
    fetchRaffleTasksByGroupID(groupID: Scalars["ID"]): Promise<RaffleMast[]>;
}
