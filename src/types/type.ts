export type loginDataType = {
  email: string;
  password: string;
};

export type adminLoginType = {
  cities: string;
  department: string;
  email: string;
  password: string;
}

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

export type sexDataType = {
  sex: 'male' | 'female' | 'None';
}

export type logType = {
  createdAt: number;
  documentID: string;
  system: System;
  user: UserState;
};

export type searchLogType = {
  createdAt: number;
  searchWord: string;
  user: UserState;
  userID: string
}

export type rankingType = {
  documentID: string;
  system: System;
  count: number;
  ageGroup: ageGroup[];
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
  family: targetFamily;
  isAdmin: boolean; //
  city: string; 
  department: string;
  sex: targetSex;
  searchedWords: string[];
  viewedCategory: [{categoryName: string, count: number}]
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
  totalView: number;
  weeklyView: number[];
  monthlyView: number;
  dailyView: number;
  ageGroup: ageGroup[];
  targetAge: targetAge;
  targetFamily: targetFamily;
  targetSex: targetSex;
};
export enum targetSex {
  male,
  female,
  other
}
export enum targetFamily {
  独身,
  夫婦,
  子持ち,
  ひとり親,
  介護
}
export enum targetAge  {
  乳児,
  幼児,
  小学生,
  小学生以下,
  中学生,
  小中学生,
  中学生以下,
  高校生,
  高校生以下の就学児童,
  拾八歳未満,
  拾八歳以下,
  未成年,
  成人,
  老人,
  全年齢
}
// 乳児・幼児・小学生・小学生以下・中学生・小中学生・中学生以下・高校生・高校生以下の就学児童・18歳未満・18歳以下・未成年・成人・老人・全年齢
export type ageGroup = {
  count: number;
  age: '0' | '10' | '20' | '30' | '40' | '50' | '60' | '70'
}

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

export type userProfile = {
  age: string,
  gender: string
}

export type sendData = {
  Name: string
  Location: string
  Department: string
  Target: string
  Site: string
  Detail: string
  Method: Array<string>
  Category: Array<string>
};