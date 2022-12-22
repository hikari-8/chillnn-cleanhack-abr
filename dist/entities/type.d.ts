export declare type Maybe<T> = T | null;
export declare type InputMaybe<T> = Maybe<T>;
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
    createdAt: Scalars['AWSTimestamp'];
    createdUserID: Scalars['ID'];
    deletedAt?: Maybe<Scalars['AWSTimestamp']>;
    groupID: Scalars['ID'];
    groupName?: Maybe<Scalars['String']>;
    updatedAt: Scalars['AWSTimestamp'];
};
export declare type GroupMastInput = {
    createdAt: Scalars['AWSTimestamp'];
    createdUserID: Scalars['ID'];
    deletedAt?: InputMaybe<Scalars['AWSTimestamp']>;
    groupID: Scalars['ID'];
    groupName?: InputMaybe<Scalars['String']>;
    updatedAt: Scalars['AWSTimestamp'];
};
export declare type RaffleJoinUser = {
    deletedAt?: Maybe<Scalars['AWSTimestamp']>;
    groupID: Scalars['ID'];
    joinAt: Scalars['AWSTimestamp'];
    userID: Scalars['ID'];
};
export declare type RaffleJoinUserInput = {
    deletedAt?: InputMaybe<Scalars['AWSTimestamp']>;
    groupID: Scalars['ID'];
    joinAt: Scalars['AWSTimestamp'];
    userID: Scalars['ID'];
};
export declare type RaffleMast = {
    createdAt: Scalars['AWSTimestamp'];
    deletedAt?: Maybe<Scalars['AWSTimestamp']>;
    groupID: Scalars['ID'];
    headCount?: Maybe<Scalars['Int']>;
    raffleID: Scalars['ID'];
    taskID: Scalars['ID'];
    taskName: Scalars['String'];
    updatedAt: Scalars['AWSTimestamp'];
    userID?: Maybe<Array<Scalars['ID']>>;
};
export declare type RaffleMastInput = {
    createdAt: Scalars['AWSTimestamp'];
    deletedAt?: InputMaybe<Scalars['AWSTimestamp']>;
    groupID: Scalars['ID'];
    raffleID: Scalars['ID'];
    taskID: Scalars['ID'];
    taskName: Scalars['String'];
    updatedAt: Scalars['AWSTimestamp'];
    userID?: InputMaybe<Array<Scalars['ID']>>;
};
export declare type RaffleObject = {
    activeMembers?: Maybe<Array<RaffleJoinUser>>;
    createdAt: Scalars['AWSTimestamp'];
    deletedAt?: Maybe<Scalars['AWSTimestamp']>;
    groupID: Scalars['ID'];
    limitTime: Scalars['AWSTimestamp'];
    raffleID: Scalars['ID'];
    raffleStatus: RaffleStatus;
    remindSlackTime: Scalars['AWSTimestamp'];
    remindSlackWeek: Scalars['String'];
    tasks: Array<RaffleMast>;
    updatedAt: Scalars['AWSTimestamp'];
};
export declare type RaffleObjectInput = {
    activeMembers?: InputMaybe<Array<RaffleJoinUserInput>>;
    createdAt: Scalars['AWSTimestamp'];
    deletedAt?: InputMaybe<Scalars['AWSTimestamp']>;
    groupID: Scalars['ID'];
    limitTime: Scalars['AWSTimestamp'];
    raffleID: Scalars['ID'];
    raffleStatus: RaffleStatus;
    remindSlackTime: Scalars['AWSTimestamp'];
    remindSlackWeek: Scalars['String'];
    tasks: Array<RaffleMastInput>;
    updatedAt: Scalars['AWSTimestamp'];
};
export declare enum RaffleStatus {
    DONE = "DONE",
    EFFECTIVE = "EFFECTIVE",
    EFFECTIVE_AND_FIXED = "EFFECTIVE_AND_FIXED"
}
export declare type S3Object = {
    bucket: Scalars['String'];
    key: Scalars['String'];
    region: Scalars['String'];
    url: Scalars['AWSURL'];
};
export declare type S3ObjectInput = {
    bucket: Scalars['String'];
    key: Scalars['String'];
    region: Scalars['String'];
    url: Scalars['AWSURL'];
};
export declare type TaskMast = {
    createdAt: Scalars['AWSTimestamp'];
    deletedAt?: Maybe<Scalars['AWSTimestamp']>;
    groupID: Scalars['ID'];
    headCount?: Maybe<Scalars['Int']>;
    taskID: Scalars['ID'];
    taskName: Scalars['String'];
    updatedAt: Scalars['AWSTimestamp'];
};
export declare type TaskMastInput = {
    createdAt: Scalars['AWSTimestamp'];
    deletedAt?: InputMaybe<Scalars['AWSTimestamp']>;
    groupID: Scalars['ID'];
    headCount?: InputMaybe<Scalars['Int']>;
    taskID: Scalars['ID'];
    taskName: Scalars['String'];
    updatedAt: Scalars['AWSTimestamp'];
};
export declare type TaskMasterObject = {
    createdAt: Scalars['AWSTimestamp'];
    deletedAt?: Maybe<Scalars['AWSTimestamp']>;
    groupID: Scalars['ID'];
    limitTime?: Maybe<Scalars['AWSTimestamp']>;
    remindSlackTime?: Maybe<Scalars['AWSTimestamp']>;
    remindSlackWeek?: Maybe<Scalars['String']>;
    tasks: Array<TaskMast>;
    updatedAt: Scalars['AWSTimestamp'];
};
export declare type TaskMasterObjectInput = {
    createdAt: Scalars['AWSTimestamp'];
    deletedAt?: InputMaybe<Scalars['AWSTimestamp']>;
    groupID: Scalars['ID'];
    limitTime?: InputMaybe<Scalars['AWSTimestamp']>;
    remindSlackTime?: InputMaybe<Scalars['AWSTimestamp']>;
    remindSlackWeek?: InputMaybe<Scalars['String']>;
    tasks: Array<TaskMastInput>;
    updatedAt: Scalars['AWSTimestamp'];
};
export declare type UserMast = {
    createdAt: Scalars['AWSTimestamp'];
    deletedAt?: Maybe<Scalars['AWSTimestamp']>;
    email: Scalars['String'];
    groupID: Scalars['String'];
    name: Scalars['String'];
    records?: Maybe<Array<Scalars['String']>>;
    role: Scalars['String'];
    updatedAt: Scalars['AWSTimestamp'];
    userID: Scalars['ID'];
};
export declare type UserMastInput = {
    createdAt: Scalars['AWSTimestamp'];
    deletedAt?: InputMaybe<Scalars['AWSTimestamp']>;
    email: Scalars['String'];
    groupID: Scalars['String'];
    name: Scalars['String'];
    records?: InputMaybe<Array<Scalars['String']>>;
    role: Scalars['String'];
    updatedAt: Scalars['AWSTimestamp'];
    userID: Scalars['ID'];
};
