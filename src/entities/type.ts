/* tslint:disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
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

export enum ErrorCode {
  chillnnTraining_401_notSignIn = 'chillnnTraining_401_notSignIn',
  chillnnTraining_404_resourceNotFound = 'chillnnTraining_404_resourceNotFound',
  chillnnTraining_500_systemError = 'chillnnTraining_500_systemError'
}

export type GroupMast = {
  createdAt: Scalars['AWSTimestamp'];
  createdUserID: Scalars['ID'];
  deletedAt?: Maybe<Scalars['AWSTimestamp']>;
  groupID: Scalars['ID'];
  groupName?: Maybe<Scalars['String']>;
  updatedAt: Scalars['AWSTimestamp'];
};

export type GroupMastInput = {
  createdAt: Scalars['AWSTimestamp'];
  createdUserID: Scalars['ID'];
  deletedAt?: InputMaybe<Scalars['AWSTimestamp']>;
  groupID: Scalars['ID'];
  groupName?: InputMaybe<Scalars['String']>;
  updatedAt: Scalars['AWSTimestamp'];
};

export type RaffleJoinUser = {
  deletedAt?: Maybe<Scalars['AWSTimestamp']>;
  groupID: Scalars['ID'];
  joinAt: Scalars['AWSTimestamp'];
  userID: Scalars['ID'];
};

export type RaffleJoinUserInput = {
  deletedAt?: InputMaybe<Scalars['AWSTimestamp']>;
  groupID: Scalars['ID'];
  joinAt: Scalars['AWSTimestamp'];
  userID: Scalars['ID'];
};

export type RaffleMast = {
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

export type RaffleMastInput = {
  createdAt: Scalars['AWSTimestamp'];
  deletedAt?: InputMaybe<Scalars['AWSTimestamp']>;
  groupID: Scalars['ID'];
  raffleID: Scalars['ID'];
  taskID: Scalars['ID'];
  taskName: Scalars['String'];
  updatedAt: Scalars['AWSTimestamp'];
  userID?: InputMaybe<Array<Scalars['ID']>>;
};

export type RaffleObject = {
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

export type RaffleObjectInput = {
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

export enum RaffleStatus {
  DONE = 'DONE',
  EFFECTIVE = 'EFFECTIVE',
  EFFECTIVE_AND_FIXED = 'EFFECTIVE_AND_FIXED'
}

export type S3Object = {
  bucket: Scalars['String'];
  key: Scalars['String'];
  region: Scalars['String'];
  url: Scalars['AWSURL'];
};

export type S3ObjectInput = {
  bucket: Scalars['String'];
  key: Scalars['String'];
  region: Scalars['String'];
  url: Scalars['AWSURL'];
};

export type TaskMast = {
  createdAt: Scalars['AWSTimestamp'];
  deletedAt?: Maybe<Scalars['AWSTimestamp']>;
  groupID: Scalars['ID'];
  headCount?: Maybe<Scalars['Int']>;
  taskID: Scalars['ID'];
  taskName: Scalars['String'];
  updatedAt: Scalars['AWSTimestamp'];
};

export type TaskMastInput = {
  createdAt: Scalars['AWSTimestamp'];
  deletedAt?: InputMaybe<Scalars['AWSTimestamp']>;
  groupID: Scalars['ID'];
  headCount?: InputMaybe<Scalars['Int']>;
  taskID: Scalars['ID'];
  taskName: Scalars['String'];
  updatedAt: Scalars['AWSTimestamp'];
};

export type TaskMasterObject = {
  createdAt: Scalars['AWSTimestamp'];
  deletedAt?: Maybe<Scalars['AWSTimestamp']>;
  groupID: Scalars['ID'];
  limitTime?: Maybe<Scalars['AWSTimestamp']>;
  remindSlackTime?: Maybe<Scalars['AWSTimestamp']>;
  remindSlackWeek?: Maybe<Scalars['String']>;
  tasks: Array<TaskMast>;
  updatedAt: Scalars['AWSTimestamp'];
};

export type TaskMasterObjectInput = {
  createdAt: Scalars['AWSTimestamp'];
  deletedAt?: InputMaybe<Scalars['AWSTimestamp']>;
  groupID: Scalars['ID'];
  limitTime?: InputMaybe<Scalars['AWSTimestamp']>;
  remindSlackTime?: InputMaybe<Scalars['AWSTimestamp']>;
  remindSlackWeek?: InputMaybe<Scalars['String']>;
  tasks: Array<TaskMastInput>;
  updatedAt: Scalars['AWSTimestamp'];
};

export type UserMast = {
  createdAt: Scalars['AWSTimestamp'];
  deletedAt?: Maybe<Scalars['AWSTimestamp']>;
  email: Scalars['String'];
  groupID?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  records?: Maybe<Array<Scalars['String']>>;
  role: Scalars['String'];
  updatedAt: Scalars['AWSTimestamp'];
  userID: Scalars['ID'];
};

export type UserMastInput = {
  createdAt: Scalars['AWSTimestamp'];
  deletedAt?: InputMaybe<Scalars['AWSTimestamp']>;
  email: Scalars['String'];
  groupID?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  records?: InputMaybe<Array<Scalars['String']>>;
  role: Scalars['String'];
  updatedAt: Scalars['AWSTimestamp'];
  userID: Scalars['ID'];
};
