import {
	ChillnnTrainingError,
	compareNumDesc,
	IWeeklyRecordMastRepository,
} from "../..";
import { ErrorCode, Scalars, WeeklyRecordMast } from "../../entities";

type WeeklyRecordCache = {
	[userID: string]: WeeklyRecordMast | "blanc" | undefined;
};

export class WeeklyRecordMastRepositoryCacheAdaptor
	implements IWeeklyRecordMastRepository
{
	private userEachCache: WeeklyRecordCache = {};
	private userAllCache: WeeklyRecordCache | null = null;
	constructor(private repository: IWeeklyRecordMastRepository) {}

	async addWeeklyRecordMast(
		input: WeeklyRecordMast
	): Promise<WeeklyRecordMast> {
		const res = await this.repository.addWeeklyRecordMast(input);
		this.updateCacheEach(res.userID, res);
		this.myUserID = res.userID;
		return res;
	}

	async updateWeeklyRecordMast(
		input: WeeklyRecordMast
	): Promise<WeeklyRecordMast> {
		const res = await this.repository.updateWeeklyRecordMast(input);
		this.updateCacheEach(res.userID, res);
		this.myUserID = res.userID;
		return res;
	}

	async fetchMyWeeklyRecordMast(): Promise<WeeklyRecordMast | null> {
		if (this.myUserID)
			return this.fetchCacheWeeklyRecordMast(
				this.myUserID
			) as WeeklyRecordMast;
		const res = await this.repository.fetchMyWeeklyRecordMast();
		if (!res) {
			throw new ChillnnTrainingError(
				ErrorCode.chillnnTraining_401_notSignIn
			);
		} else {
			this.myUserID = res.userID;
			this.updateCacheEach(res.userID, res);
		}
		return res;
	}

	async fetchWeeklyRecordMastByUserID(
		userID: string
	): Promise<WeeklyRecordMast | null> {
		const cache = this.fetchCacheWeeklyRecordMast(userID);
		if (cache && cache === "blanc") {
			return null;
		} else if (cache) {
			return cache;
		}
		const res = await this.repository.fetchWeeklyRecordMastByUserID(userID);
		this.updateCacheEach(userID, res);
		return res;
	}

	async fetchAllUser(): Promise<WeeklyRecordMast[]> {
		const cache = this.fetchCacheUserAll();
		if (cache) return cache;
		const res = await this.repository.fetchAllUser();
		this.updateCacheBulk(res);
		return res;
	}

	// ===============================================================
	//
	// private
	//
	// ===============================================================
	private myUserID: string | null = null;
	private updateCacheEach(
		userID: Scalars["ID"],
		user: WeeklyRecordMast | null
	) {
		this.userEachCache[userID] = user || "blanc";
		if (this.userAllCache && user) {
			this.userAllCache[userID] = user;
		}
	}
	private updateCacheBulk(users: WeeklyRecordMast[]) {
		this.userAllCache = {};
		for (const user of users) {
			this.updateCacheEach(user.userID, user);
		}
	}

	private fetchCacheWeeklyRecordMast(userID: Scalars["ID"]) {
		return this.userEachCache[userID];
	}

	private fetchCacheUserAll() {
		if (!this.userAllCache) return null;
		return Object.keys(this.userAllCache)
			.map((key) => {
				return this.userAllCache![key]! as WeeklyRecordMast;
			})
			.sort((a, b) => compareNumDesc(a.createdAt, b.createdAt));
	}
}
