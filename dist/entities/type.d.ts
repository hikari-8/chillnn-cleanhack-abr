export declare type Maybe<T> = T | null;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    AWSDate: string;
    AWSDateTime: string;
    AWSEmail: string;
    AWSIPAddress: string;
    AWSJSON: string;
    AWSPhone: string;
    AWSTime: string;
    AWSTimestamp: number;
    AWSURL: string;
};
export declare enum ErrorCode {
    chillnnTraining_401_notSignIn = "chillnnTraining_401_notSignIn",
    chillnnTraining_404_resourceNotFound = "chillnnTraining_404_resourceNotFound",
    chillnnTraining_500_systemError = "chillnnTraining_500_systemError"
}
export declare type GroupMast = {
    groupID: Scalars['ID'];
    groupName: Scalars['String'];
    createdAt: Scalars['AWSTimestamp'];
    updatedAt: Scalars['AWSTimestamp'];
    deletedAt?: Maybe<Scalars['AWSTimestamp']>;
};
export declare type GroupMastInput = {
    groupID: Scalars['ID'];
    groupName: Scalars['String'];
    createdAt: Scalars['AWSTimestamp'];
    updatedAt: Scalars['AWSTimestamp'];
    deletedAt?: Maybe<Scalars['AWSTimestamp']>;
};
export declare type RaffleJoinUser = {
    userID: Scalars['ID'];
    groupID: Scalars['ID'];
    joinAt: Scalars['AWSTimestamp'];
    deletedAt?: Maybe<Scalars['AWSTimestamp']>;
};
export declare type RaffleJoinUserInput = {
    userID: Scalars['ID'];
    groupID: Scalars['ID'];
    joinAt: Scalars['AWSTimestamp'];
    deletedAt?: Maybe<Scalars['AWSTimestamp']>;
};
export declare type RaffleMast = {
    raffleID: Scalars['ID'];
    taskID: Scalars['ID'];
    groupID: Scalars['ID'];
    taskName: Scalars['String'];
    headCount?: Maybe<Scalars['Int']>;
    userID?: Maybe<Array<Scalars['ID']>>;
    createdAt: Scalars['AWSTimestamp'];
    updatedAt: Scalars['AWSTimestamp'];
    deletedAt?: Maybe<Scalars['AWSTimestamp']>;
};
export declare type RaffleMastInput = {
    raffleID: Scalars['ID'];
    taskID: Scalars['ID'];
    groupID: Scalars['ID'];
    taskName: Scalars['String'];
    userID?: Maybe<Array<Scalars['ID']>>;
    createdAt: Scalars['AWSTimestamp'];
    updatedAt: Scalars['AWSTimestamp'];
    deletedAt?: Maybe<Scalars['AWSTimestamp']>;
};
export declare type RaffleObject = {
    raffleID: Scalars['ID'];
    tasks: Array<RaffleMast>;
    groupID: Scalars['ID'];
    activeMembers?: Maybe<Array<RaffleJoinUser>>;
    limitTime: Scalars['AWSTimestamp'];
    raffleStatus: RaffleStatus;
    remindSlackWeek: Scalars['String'];
    remindSlackTime: Scalars['AWSTimestamp'];
    createdAt: Scalars['AWSTimestamp'];
    updatedAt: Scalars['AWSTimestamp'];
    deletedAt?: Maybe<Scalars['AWSTimestamp']>;
};
export declare type RaffleObjectInput = {
    raffleID: Scalars['ID'];
    tasks: Array<RaffleMast>;
    groupID: Scalars['ID'];
    activeMembers?: Maybe<Array<RaffleJoinUser>>;
    limitTime: Scalars['AWSTimestamp'];
    raffleStatus: RaffleStatus;
    remindSlackWeek: Scalars['String'];
    remindSlackTime: Scalars['AWSTimestamp'];
    createdAt: Scalars['AWSTimestamp'];
    updatedAt: Scalars['AWSTimestamp'];
    deletedAt?: Maybe<Scalars['AWSTimestamp']>;
};
export declare enum RaffleStatus {
    EFFECTIVE = "EFFECTIVE",
    EFFECTIVE_AND_FIXED = "EFFECTIVE_AND_FIXED",
    DONE = "DONE"
}
export declare type S3Object = {
    url: Scalars['AWSURL'];
    bucket: Scalars['String'];
    key: Scalars['String'];
    region: Scalars['String'];
};
export declare type S3ObjectInput = {
    url: Scalars['AWSURL'];
    bucket: Scalars['String'];
    key: Scalars['String'];
    region: Scalars['String'];
};
export declare type TaskMast = {
    taskID: Scalars['ID'];
    groupID: Scalars['ID'];
    taskName: Scalars['String'];
    headCount?: Maybe<Scalars['Int']>;
    createdAt: Scalars['AWSTimestamp'];
    updatedAt: Scalars['AWSTimestamp'];
    deletedAt?: Maybe<Scalars['AWSTimestamp']>;
};
export declare type TaskMastInput = {
    taskID: Scalars['ID'];
    groupID: Scalars['ID'];
    taskName: Scalars['String'];
    headCount?: Maybe<Scalars['Int']>;
    createdAt: Scalars['AWSTimestamp'];
    updatedAt: Scalars['AWSTimestamp'];
    deletedAt?: Maybe<Scalars['AWSTimestamp']>;
};
export declare type TaskMasterObject = {
    tasks: Array<TaskMast>;
    groupID: Scalars['ID'];
    limitTime?: Maybe<Scalars['AWSTimestamp']>;
    remindSlackWeek?: Maybe<Scalars['String']>;
    remindSlackTime?: Maybe<Scalars['AWSTimestamp']>;
    createdAt: Scalars['AWSTimestamp'];
    updatedAt: Scalars['AWSTimestamp'];
    deletedAt?: Maybe<Scalars['AWSTimestamp']>;
};
export declare type TaskMasterObjectInput = {
    tasks: Array<TaskMast>;
    groupID: Scalars['ID'];
    limitTime?: Maybe<Scalars['AWSTimestamp']>;
    remindSlackWeek?: Maybe<Scalars['String']>;
    remindSlackTime?: Maybe<Scalars['AWSTimestamp']>;
    createdAt: Scalars['AWSTimestamp'];
    updatedAt: Scalars['AWSTimestamp'];
    deletedAt?: Maybe<Scalars['AWSTimestamp']>;
};
export declare type UserMast = {
    userID: Scalars['ID'];
    name: Scalars['String'];
    groupID: Scalars['String'];
    role: Scalars['String'];
    records?: Maybe<Array<Scalars['String']>>;
    createdAt: Scalars['AWSTimestamp'];
    updatedAt: Scalars['AWSTimestamp'];
    deletedAt?: Maybe<Scalars['AWSTimestamp']>;
};
export declare type UserMastInput = {
    userID: Scalars['ID'];
    name: Scalars['String'];
    groupID: Scalars['String'];
    role: Scalars['String'];
    records?: Maybe<Array<Scalars['String']>>;
    createdAt: Scalars['AWSTimestamp'];
    updatedAt: Scalars['AWSTimestamp'];
    deletedAt?: Maybe<Scalars['AWSTimestamp']>;
};
