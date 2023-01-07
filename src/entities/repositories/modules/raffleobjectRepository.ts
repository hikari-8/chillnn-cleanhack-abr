import { Scalars, RaffleObject, RaffleMast, RaffleJoinUser } from "../../type";

export interface IRaffleObjectRepository {
	//くじの新規作成・更新
	addRaffleObject(input: RaffleObject): Promise<RaffleObject>;
	updateRaffleObject(input: RaffleObject): Promise<RaffleObject>;
	fetchRaffleObject(raffleID: Scalars["ID"]): Promise<RaffleObject | null>;
}
