import { RoomMast } from "../../type";
import { BaseModel } from "./_baseModel";

export class RoomModel extends BaseModel<RoomMast> {
	// ============================================
	// getters
	// ============================================
	get roomID() {
		return this.mast.roomID;
	}
	get createdAt() {
		return this.mast.createdAt;
	}
	get updatedAt() {
		return this.mast.updatedAt;
	}
	get deletedAt() {
		return this.mast.deletedAt;
	}

	// ============================================
	// getter / setter
	// ============================================
	get roomName() {
		return this.mast.roomName;
	}
	set roomName(input: string) {
		this.mast.roomName = input;
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
	 * Admin権限があれば、Roomを追加、編集できる
	 */
	async register() {
		if (this.isRegisterable && this.isAdmin) {
			const now = new Date().getTime();
			if (this.isNew) {
				this.mast.createdAt = now;
				this.mast.updatedAt = now;
				await this.repositoryContainer.roomMastRepository.addRoom(
					this.mast
				);
			} else {
				this.mast.updatedAt = now;
				await this.repositoryContainer.roomMastRepository.updateRoom(
					this.mast
				);
			}
			this.isNew = false;
		}
	}
}
