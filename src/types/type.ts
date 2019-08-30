export type loginDataType = {
  email: string;
  password: string;
};

export type locationDataType = {
  prefecture: string;
  city: string;
  municipality: string;
};

export type birthdayDataType = {
  year: string;
  month: string;
  date: string;
};

export type logType = {
  createdAt: number;
  documentID: string;
  system: System;
  user: UserState;
};

export type rankingType = {
  documentID: string;
  system: System;
  count: number;
};

export type detailPageLogData = {
  documentID: string;
  system: System;
  user: UserState;
  createdAt: number;
};

export type UserState = {
  userId: string;
  nickName: string;
  birthday: string;
  income: string;
  address: string;
  family: string;
};

export type DetailState = {
  detail: System;
};

export type System = {
  Name: string;
  Department: string;
  Location: string;
  Site: string;
  Detail: string;
  Target: string;
  Method: Array<string>;
  Category: Array<string>;
  CreatedAt: number;
  UpdatedAt: number;
  isDeleted: boolean;
  ExpireAt: number;
  documentID: string;
};

export type SystemsState = {
  systems: Array<System>;
  loading: boolean;
};

export type TagState = {
  tag: string;
};

export type systemData = {
  id: string,
  data: System,
  willDelete: boolean,
  isNewCreate: boolean // True if it is a new system
};

export type showOrderType = {
  order: Array<string>
};

export type machineLearningType = {
  age: {
    min: number,
    max: number,
    score: number
  },
  face_location: {
    height: number,
    left: number,
    top: number,
    width: number
  },
  gender: {
    gender: string,
    gender_label: string,
    score: number
  }
}