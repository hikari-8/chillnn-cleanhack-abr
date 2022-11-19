/* tslint:disable */
export type Maybe<T> = T | null;
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










export type CleanPlaceMast = {
  cleanPlaceID: Scalars['ID'];
  placeName: Scalars['String'];
  groupID: Scalars['String'];
  headCount?: Maybe<Scalars['Int']>;
  limitTime?: Maybe<Scalars['AWSTimestamp']>;
  createdAt: Scalars['AWSTimestamp'];
  updatedAt?: Maybe<Scalars['AWSTimestamp']>;
  deletedAt?: Maybe<Scalars['AWSTimestamp']>;
};

export type CleanPlaceMastInput = {
  cleanPlaceID: Scalars['ID'];
  placeName: Scalars['String'];
  groupID: Scalars['String'];
  headCount?: Maybe<Scalars['Int']>;
  limitTime?: Maybe<Scalars['AWSTimestamp']>;
  createdAt: Scalars['AWSTimestamp'];
  updatedAt?: Maybe<Scalars['AWSTimestamp']>;
  deletedAt?: Maybe<Scalars['AWSTimestamp']>;
};

export enum ErrorCode {
  chillnnTraining_401_notSignIn = 'chillnnTraining_401_notSignIn',
  chillnnTraining_404_resourceNotFound = 'chillnnTraining_404_resourceNotFound',
  chillnnTraining_500_systemError = 'chillnnTraining_500_systemError'
}

export type RoomMast = {
  roomID: Scalars['String'];
  roomName: Scalars['String'];
  createdAt: Scalars['AWSTimestamp'];
  updatedAt?: Maybe<Scalars['AWSTimestamp']>;
  deletedAt?: Maybe<Scalars['AWSTimestamp']>;
};

export type RoomMastInput = {
  roomID: Scalars['String'];
  roomName: Scalars['String'];
  createdAt: Scalars['AWSTimestamp'];
  updatedAt?: Maybe<Scalars['AWSTimestamp']>;
  deletedAt?: Maybe<Scalars['AWSTimestamp']>;
};

export type UserMast = {
  userID: Scalars['ID'];
  name: Scalars['String'];
  role: Scalars['String'];
  status: Scalars['String'];
  records?: Maybe<Array<Maybe<Scalars['String']>>>;
  createdAt: Scalars['AWSTimestamp'];
  updatedAt?: Maybe<Scalars['AWSTimestamp']>;
  deletedAt?: Maybe<Scalars['AWSTimestamp']>;
};

export type UserMastInput = {
  userID: Scalars['ID'];
  name: Scalars['String'];
  role: Scalars['String'];
  status: Scalars['String'];
  records?: Maybe<Array<Maybe<Scalars['String']>>>;
  createdAt: Scalars['AWSTimestamp'];
  updatedAt?: Maybe<Scalars['AWSTimestamp']>;
  deletedAt?: Maybe<Scalars['AWSTimestamp']>;
};

export type WeeklyRecordMast = {
  weeklyRecordID: Scalars['String'];
  cleanPlaceID?: Maybe<Scalars['String']>;
  placeName?: Maybe<Scalars['String']>;
  roomID: Scalars['String'];
  headCount?: Maybe<Scalars['Int']>;
  LimitTime?: Maybe<Scalars['AWSDateTime']>;
  createdAt: Scalars['AWSTimestamp'];
  updatedAt?: Maybe<Scalars['AWSTimestamp']>;
};

export type WeeklyRecordMastInput = {
  weeklyRecordID: Scalars['String'];
  cleanPlaceID?: Maybe<Scalars['String']>;
  placeName?: Maybe<Scalars['String']>;
  roomID: Scalars['String'];
  headCount?: Maybe<Scalars['Int']>;
  LimitTime?: Maybe<Scalars['AWSDateTime']>;
  createdAt: Scalars['AWSTimestamp'];
  updatedAt?: Maybe<Scalars['AWSTimestamp']>;
};
