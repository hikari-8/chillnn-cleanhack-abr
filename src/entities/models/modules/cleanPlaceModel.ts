import { CleanPlaceMast } from "../../type";
import { BaseModel } from "./_baseModel";
import { UserMast } from "../../type";
import { UserModel } from "./userModel";
import { Scalars } from "../..";
import { generateUUID } from "../../..";

export class CleanPlaceModel extends BaseModel<CleanPlaceMast> {
	static getBlanc(): CleanPlaceMast {
		return {
			cleanPlaceID: generateUUID(),
			placeName: Scalars["String"],
			createdAt: new Date().getTime(),
		};
	}
	// ============================================
	// getters
	// ============================================
	get cleanPlaceID() {
		return this.mast.cleanPlaceID;
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
		return this.mast.placeName;
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

	// ============================================
	// validation
	// ============================================
	get isRegisterble() {
		return true;
	}
	// ============================================
	// functions
	// ============================================
	/**
	 * アイコン画像をセットする
	//  * @param file
	 */
	// async setIcon(file: File) {
	// 	const path = `user/${this.userID}/iconImage/${new Date().getTime()}`;
	// 	this.mast.userIcon =
	// 		await this.repositoryContainer.s3Repository.addFile(path, file);
	// }

	/**
	 * 掃除場所情報を新規登録、または更新する
	 * roleがある=Adminに設定
	 */
	async register() {
		if (UserModel.role === "admin") {
			const now = new Date().getTime();
			if (this.isNew) {
				this.mast.createdAt = now;
				this.mast.updatedAt = now;
				await this.repositoryContainer.cleanPlaceMastRepository.addCleanPlaceMast(
					this.mast
				);
			} else {
				this.mast.updatedAt = now;
				await this.repositoryContainer.cleanPlaceMastRepository.updateCleanPlaceMast(
					this.mast
				);
			}
			this.isNew = false;
		}
	}

	// /**
	//  * このユーザーの投稿を取得する
	//  * @returns
	//  */
	// async fetchMyPosts(input: string): Promise<PostModel[]> {
	// 	const res =
	// 		await this.repositoryContainer.postMastRepository.fetchPostsByOwnerUserID(
	// 			this.userID
	// 		);
	// 	return res.map((item) => this.modelFactory.PostModel(item));
	// }

	// createNewPost(): PostModel {
	// 	return this.modelFactory.PostModel(
	// 		PostModel.getBlanc(
	// 			this.userID,
	// 			this.repositoryContainer.s3Repository.getSampleImage()
	// 		),
	// 		{
	// 			isNew: true,
	// 		}
	// 	);
	// }
}
