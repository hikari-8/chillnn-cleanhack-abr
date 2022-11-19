import {
	IWeeklyRecordMastRepository,
	RoomMast,
	Scalars,
	WeeklyRecordMast,
} from "../../entities";
import { compareNumDesc } from "../../util";

type RoomCache = {
	[roomID: string]:
		| {
				[cleanPlaceID: string]: WeeklyRecordMast;
		  }
		| undefined;
};

type WeeklyRecordCache = {
	[cleanPlaceID: string]: WeeklyRecordMast | "blanc" | undefined;
};

export class WeeklyRecordMastRepositoryCacheAdapter
	implements IWeeklyRecordMastRepository
{
	private roomCache: RoomCache = {};
	private weeklyRecordCache: WeeklyRecordCache = {};

	constructor(private repository: IWeeklyRecordMastRepository) {}

	async addWeeklyRecord(input: WeeklyRecordMast): Promise<WeeklyRecordMast> {
		const res = await this.repository.addWeeklyRecord(input);
		res.createdAt = new Date().getDate();
		this.addCacheEach(res.weeklyRecordID, res);
		return res;
	}

	async updateWeeklyRecord(
		input: WeeklyRecordMast
	): Promise<WeeklyRecordMast> {
		const res = await this.repository.updateWeeklyRecord(input);
		res.updatedAt = new Date().getDate();
		this.addCacheEach(res.weeklyRecordID, res);
		return res;
	}

	async fetchWeeklyRecordsByWeeklyRecordID(
		weeklyRecordID: string
	): Promise<WeeklyRecordMast | null> {
		const cache = this.fetchWeeklyRecord(weeklyRecordID);
		if (cache && cache === "blanc") {
			return null;
		} else if (cache) {
			return cache;
		}
		const res = await this.repository.fetchWeeklyRecordsByWeeklyRecordID(
			weeklyRecordID
		);
		this.addCacheEach(weeklyRecordID, res);
		return res;
	}

	async fetchWeeklyRecordsByRoomID(
		roomID: string
	): Promise<WeeklyRecordMast[]> {
		const cache = await this.fetchWeeklyRecords(roomID);
		if (cache) return cache;
		const res = await this.repository.fetchWeeklyRecordsByRoomID(roomID);
		this.addCacheBulk(roomID, res);
		return res;
	}

	// ===============================================================
	//
	// private
	//
	// ===============================================================

	private addCacheEach(
		weeklyRecordID: Scalars["ID"],
		weeklyRecord: WeeklyRecordMast | null
	) {
		this.weeklyRecordCache[weeklyRecordID] = weeklyRecord || "blanc";
		if (!weeklyRecord) return;
		const roomCache = this.roomCache[weeklyRecord.roomID];
		if (roomCache) {
			roomCache[weeklyRecordID] = weeklyRecord;
		}
	}

	private addCacheBulk(
		roomID: Scalars["ID"],
		weeklyRecords: WeeklyRecordMast[]
	) {
		this.roomCache[roomID] = {};
		for (const weeklyRecord of weeklyRecords) {
			this.addCacheEach(weeklyRecord.weeklyRecordID, weeklyRecord);
		}
	}

	private fetchWeeklyRecord(weeklyRecordID: Scalars["ID"]) {
		return this.weeklyRecordCache[weeklyRecordID];
	}

	private fetchWeeklyRecords(roomID: Scalars["ID"]) {
		const roomCache = this.roomCache[roomID];
		if (!roomCache) return null;
		return Object.keys(roomCache)
			.map((key) => {
				return roomCache[key];
			})
			.sort((a, b) => compareNumDesc(a.createdAt, b.createdAt));
	}
}
