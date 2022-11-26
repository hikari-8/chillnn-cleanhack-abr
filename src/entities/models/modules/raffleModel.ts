import { WeeklyRecordMast } from "../../type";
import { BaseModel } from "./_baseModel";
import { Scalars } from "../..";
import { generateUUID } from "../../..";

export class RaffleModel extends BaseModel<WeeklyRecordMast> {
	static getBlanc(roomID: Scalars["String"]): WeeklyRecordMast {
		return {
			weeklyRecordID: generateUUID(),
			roomID,
			createdAt: new Date().getTime(),
		};
	}

	// ============================================
	// getters
	// ============================================
	get weeklyRecordID() {
		return this.mast.cleanPlaceID;
	}
	get cleanPlaceID() {
		return this.mast.cleanPlaceID;
	}
	get roomID() {
		return this.mast.roomID;
	}
	get createdAt() {
		return this.mast.createdAt;
	}
	get updatedAt() {
		return this.mast.updatedAt;
	}

	// ============================================
	// getter / setter
	// ============================================
	get placeName() {
		return this.mast.placeName || "";
	}
	set placeName(input: string) {
		this.mast.placeName = input;
	}
	get headCount() {
		return this.mast.headCount || 0;
	}
	set headCount(input: number) {
		if (input) {
			this.mast.headCount = input;
		} else {
			this.mast.headCount = null;
		}
	}

	get limitTime() {
		return this.mast.limitTime || "";
	}

	set limitTime(input: string) {
		if (input) {
			this.mast.limitTime = input;
		} else {
			this.mast.limitTime = null;
		}
	}

	// ============================================
	// validation
	// ============================================
	get isRegisterable() {
		return true;
	}

	get isAdmin() {
		return true;
	}

	/**
	 * ルームのそれぞれのくじのデータを一括で登録・編集する
	 */
	async register() {
		if (this.isRegisterable && this.isAdmin) {
			const now = new Date().getTime();
			if (this.isNew) {
				this.mast.createdAt = now;
				this.mast.updatedAt = now;
				await this.repositoryContainer.weeklyRecordMastRepository.addWeeklyRecord(
					this.mast
				);
			} else {
				this.mast.updatedAt = now;
				await this.repositoryContainer.weeklyRecordMastRepository.updateWeeklyRecord(
					this.mast
				);
			}
			this.isNew = false;
		}
	}

	// /**
	//  * 今週のくじのデータを取得する
	//  * @returns
	//  */
	async fetchEachWeeklyRecordDataBygroupID(): Promise<WeeklyRecordModel[]> {
		const res =
			await this.repositoryContainer.weeklyRecordMastRepository.fetchWeeklyRecordsByWeeklyRecordID(
				this.weeklyRecordID
			);
		return res.map((item) => this.modelFactory.WeeklyRecordModel(item));
	}

	// /**
	//  * 隔週のくじのデータを全て取得する
	//  * @returns
	//  */
	async fetchAllWeeklyRecordByRoomID(): Promise<WeeklyRecordModel> {
		const res =
			await this.repositoryContainer.weeklyRecordMastRepository.fetchWeeklyRecordsByRoomID(
				this.roomID
			);
		return res.map((item) => this.modelFactory.WeeklyRecordModel(item));
	}
}
