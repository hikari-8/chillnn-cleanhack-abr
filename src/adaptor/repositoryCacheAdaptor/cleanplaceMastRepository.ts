import {
	ChillnnTrainingError,
	compareNumDesc,
	ICleanPlaceMastRepository,
} from "../..";
import { ErrorCode, Scalars, CleanPlaceMast } from "../../entities";

type CleanPlaceCache = {
	[cleanPlaceID: string]: CleanPlaceMast | "blanc" | undefined;
};

export class CleanPlaceMastRepositoryCacheAdaptor
	implements ICleanPlaceMastRepository
{
	private cleanPlaceEachCache: CleanPlaceCache = {};
	private cleanPlaceAllCache: CleanPlaceCache | null = null;
	constructor(private repository: ICleanPlaceMastRepository) {}

	async addCleanPlaceMast(input: CleanPlaceMast): Promise<CleanPlaceMast> {
		const res = await this.repository.addCleanPlaceMast(input);
		this.updateCacheEach(res.cleanPlaceID, res);
		this.myCleanPlaceID = res.cleanPlaceID;
		return res;
	}

	async updateCleanPlaceMast(input: CleanPlaceMast): Promise<CleanPlaceMast> {
		const res = await this.repository.updateCleanPlaceMast(input);
		this.updateCacheEach(res.cleanPlaceID, res);
		this.myCleanPlaceID = res.cleanPlaceID;
		return res;
	}

	async fetchCleanPlaceMastByCleanPlaceID(
		CleanPlaceID: string
	): Promise<CleanPlaceMast | null> {
		const cache = this.fetchCacheCleanPlaceMast(CleanPlaceID);
		if (cache && cache === "blanc") {
			return null;
		} else if (cache) {
			return cache;
		}
		const res = await this.repository.fetchCleanPlaceMastByCleanPlaceID(
			CleanPlaceID
		);
		this.updateCacheEach(CleanPlaceID, res);
		return res;
	}

	async fetchAllCleanPlace(): Promise<CleanPlaceMast[]> {
		const cache = this.fetchCacheCleanPlaceAll();
		if (cache) return cache;
		const res = await this.repository.fetchAllCleanPlace();
		this.updateCacheBulk(res);
		return res;
	}

	// ===============================================================
	//
	// private
	//
	// ===============================================================
	private myCleanPlaceID: string | null = null;
	private updateCacheEach(
		cleanPlaceID: Scalars["ID"],
		cleanPlace: CleanPlaceMast | null
	) {
		this.cleanPlaceEachCache[cleanPlaceID] = cleanPlace || "blanc";
		if (this.cleanPlaceAllCache && cleanPlace) {
			this.cleanPlaceAllCache[cleanPlaceID] = cleanPlace;
		}
	}
	private updateCacheBulk(cleanPlaces: CleanPlaceMast[]) {
		this.cleanPlaceAllCache = {};
		for (const cleanPlace of cleanPlaces) {
			this.updateCacheEach(cleanPlace.cleanPlaceID, cleanPlace);
		}
	}

	private fetchCacheCleanPlaceMast(cleanPlaceID: Scalars["ID"]) {
		return this.cleanPlaceEachCache[cleanPlaceID];
	}

	private fetchCacheCleanPlaceAll() {
		if (!this.cleanPlaceAllCache) return null;
		return Object.keys(this.cleanPlaceAllCache)
			.map((key) => {
				return this.cleanPlaceAllCache![key]! as CleanPlaceMast;
			})
			.sort((a, b) => compareNumDesc(a.createdAt, b.createdAt));
	}
}
