import {
	Scalars,
	RaffleObject,
	RaffleTaskMast,
	RaffleJoinUser,
} from "../../type";

export interface IRaffleObjectRepository {
	//くじの新規作成・更新
	addRaffleObject(input: RaffleObject): Promise<RaffleObject>;
	updateRaffleObject(input: RaffleObject): Promise<RaffleObject>;

	//taskIDから個別のタスクを新規作成・更新・削除する
	addRaffleTaskMast(input: RaffleTaskMast): Promise<RaffleTaskMast>;
	updateRaffleTaskMast(input: RaffleTaskMast): Promise<RaffleTaskMast>;
	deleteRaffleTaskMast(taskID: Scalars["ID"]): Promise<RaffleTaskMast>;

	//くじに参加したUserのステータス変更・くじから削除
	addRaffleJoinUser(input: RaffleJoinUser): Promise<RaffleJoinUser>;
	deleteRaffleJoinUser(userID: Scalars["ID"]): Promise<RaffleJoinUser>;

	//taskIDから個別のタスクをfetchする
	fetchRaffleTaskMastByTaskID(taskID: Scalars["ID"]): Promise<RaffleTaskMast>;

	// グループIDから特定のくじのマスターデータを取得する
	fetchRaffleObjectByGroupID(
		groupID: Scalars["ID"]
	): Promise<RaffleObject | null>;

	// グループIDから全てのくじの履歴を取得する
	fetchRaffleObjectByGroupID(groupID: Scalars["ID"]): Promise<RaffleObject[]>;
}
