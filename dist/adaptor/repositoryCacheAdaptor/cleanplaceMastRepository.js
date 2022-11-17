"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CleanPlaceMastRepositoryCacheAdaptor = void 0;
const __1 = require("../..");
class CleanPlaceMastRepositoryCacheAdaptor {
    constructor(repository) {
        this.repository = repository;
        this.cleanPlaceEachCache = {};
        this.cleanPlaceAllCache = null;
        // ===============================================================
        //
        // private
        //
        // ===============================================================
        this.myCleanPlaceID = null;
    }
    async addCleanPlaceMast(input) {
        const res = await this.repository.addCleanPlaceMast(input);
        this.updateCacheEach(res.cleanPlaceID, res);
        this.myCleanPlaceID = res.cleanPlaceID;
        return res;
    }
    async updateCleanPlaceMast(input) {
        const res = await this.repository.updateCleanPlaceMast(input);
        this.updateCacheEach(res.cleanPlaceID, res);
        this.myCleanPlaceID = res.cleanPlaceID;
        return res;
    }
    async fetchCleanPlaceMastByCleanPlaceID(CleanPlaceID) {
        const cache = this.fetchCacheCleanPlaceMast(CleanPlaceID);
        if (cache && cache === "blanc") {
            return null;
        }
        else if (cache) {
            return cache;
        }
        const res = await this.repository.fetchCleanPlaceMastByCleanPlaceID(CleanPlaceID);
        this.updateCacheEach(CleanPlaceID, res);
        return res;
    }
    async fetchAllCleanPlace() {
        const cache = this.fetchCacheCleanPlaceAll();
        if (cache)
            return cache;
        const res = await this.repository.fetchAllCleanPlace();
        this.updateCacheBulk(res);
        return res;
    }
    updateCacheEach(cleanPlaceID, cleanPlace) {
        this.cleanPlaceEachCache[cleanPlaceID] = cleanPlace || "blanc";
        if (this.cleanPlaceAllCache && cleanPlace) {
            this.cleanPlaceAllCache[cleanPlaceID] = cleanPlace;
        }
    }
    updateCacheBulk(cleanPlaces) {
        this.cleanPlaceAllCache = {};
        for (const cleanPlace of cleanPlaces) {
            this.updateCacheEach(cleanPlace.cleanPlaceID, cleanPlace);
        }
    }
    fetchCacheCleanPlaceMast(cleanPlaceID) {
        return this.cleanPlaceEachCache[cleanPlaceID];
    }
    fetchCacheCleanPlaceAll() {
        if (!this.cleanPlaceAllCache)
            return null;
        return Object.keys(this.cleanPlaceAllCache)
            .map((key) => {
            return this.cleanPlaceAllCache[key];
        })
            .sort((a, b) => __1.compareNumDesc(a.createdAt, b.createdAt));
    }
}
exports.CleanPlaceMastRepositoryCacheAdaptor = CleanPlaceMastRepositoryCacheAdaptor;
