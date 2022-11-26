import {
	ITaskMasterObjectRepository,
	GroupMast,
	TaskMast,
} from "../../entities";
import { Scalars, TaskMasterObject } from "../../entities";
import { compareNumDesc } from "../../util";

type TaskMastGroupCache = {
	[groupID: string]: {
		[taskID: string]: {
			mast: TaskMast;
			createdAt: number;
		};
	};
};

type TaskMastTaskCache = {
	[taskID: string]: {
		mast: TaskMast;
		createdAt: number;
	};
};

export class TaskMasterObjectRepositoryCacheAdaptor
	implements ITaskMasterObjectRepository
{
	private groupCache: TaskMastGroupCache;
	private taskCache: TaskMastTaskCache;

	constructor(
		private repository: ITaskMasterObjectRepository,
		optional?: {
			companyCache: TaskMastGroupCache;
			taskCache: TaskMastTaskCache;
		}
	) {
		this.groupCache = optional?.companyCache || {};
		this.taskCache = optional?.taskCache || {};
	}

	async addTaskMasterObject(
		input: TaskMasterObject
	): Promise<TaskMasterObject> {
		const res = await this.repository.addTaskMasterObject(input);
		res.createdAt = new Date().getDate();
		res.updatedAt = new Date().getDate();
		this.updateGroupCache(res.groupID, res.tasks, res.createdAt);
		return res;
	}

	async updateTaskMasterObject(
		input: TaskMasterObject
	): Promise<TaskMasterObject> {
		const res = await this.repository.updateTaskMasterObject(input);
		res.updatedAt = new Date().getDate();
		this.updateGroupCache(res.groupID, res.tasks, res.createdAt);
		return res;
	}

	async fetchTasksByGroupID(groupID: string): Promise<TaskMast[]> {
		const GroupCache = this.groupCache[groupID];
		if (GroupCache)
			return (Object.keys(GroupCache) || [])
				.map((key) => this.groupCache[groupID][key].mast)
				.sort((a, b) => compareNumDesc(a.updatedAt, b.updatedAt));

		return (Object.keys(GroupCache) || [])
			.map((key) => this.groupCache[groupID][key].mast)
			.sort((a, b) => compareNumDesc(a.updatedAt, b.updatedAt));
	}

	// ===============================================================
	//
	// private
	//
	// ===============================================================

	private updateGroupCache(
		groupID: Scalars["ID"],
		tasks: TaskMast[],
		createdAt: number
	): void {
		//groupCacheに保存
		this.groupCache[groupID] = {};
		tasks.forEach((task) => {
			this.groupCache[task.groupID][task.taskID] = {
				mast: task,
				createdAt,
			};
			this.taskCache[task.taskID] = { mast: task, createdAt };
		});
	}
}
