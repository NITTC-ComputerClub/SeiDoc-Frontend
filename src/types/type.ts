export type validationType = {
  data: string
  message: string | null
  status: boolean
}

export type loginDataType = {
  email: validationType
  password: validationType
};

export type signInDataType = {
  email: validationType
  password: validationType
  secondPassword: validationType
}

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
  targetFamily: TargetFamily
  family: Array<FamilyType>;
  isAdmin: boolean;
  department: string;
  sex: TargetSex;
  searchedWords: string[];
  viewedCategory: [{ categoryName: string, count: number }]
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
  targetAge: TargetAge;
  targetFamily: TargetFamily[];
  targetSex: TargetSex;
};
export enum TargetSex {
  male,
  female,
  other
}
export type FamilyType = {
  relationship: string,
  age: number,
  gender: TargetSex
}
export enum TargetFamily {
  独身,
  夫婦,
  子持ち,
  二世帯,
  ひとり親,
  介護,
  不明
}
export enum TargetAge {
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

export type awsRekognition = {
  AgeRange: {
    High: number
    Low: number
  },
  BoundingBox: {
    Height: number
    Left: number
    Top: number
    Width: number
  },
  Gender: {
    Value: string,
    Confidence: number
  }
}

export type awsResData = {
  AgeRange: { Low: number, High: number }
  Beard: { Value: boolean, Confidence: number }
  BoundingBox: { Width: number, Height: number, Left: number, Top: number }
  Confidence: number
  Emotions: Array<{ Type: string, Confidence: number }>
  Eyeglasses: { Value: boolean, Confidence: number }
  EyesOpen: { Value: boolean, Confidence: number }
  Gender: { Value: string, Confidence: number }
  Landmarks: Array<{ Type: string, X: number, Y: number }>
  MouthOpen: { Value: boolean, Confidence: number }
  Mustache: { Value: false, Confidence: number }
  Pose: { Roll: number, Yaw: number, Pitch: number }
  Quality: { Brightness: number, Sharpness: number }
  Smile: { Value: boolean, Confidence: number }
  Sunglasses: { Value: boolean, Confidence: number }
}

export type profileDataType = {
  age: number,
  boundingBox: {
    width: number,
    height: number,
    left: number,
    top: number
  },
  gender: string,
  relationship: string,
  isMyself: boolean
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
  targetSex: TargetSex
  targetAge: TargetAge
  targetFamily: TargetFamily
};

/* もしものために残しておく */
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

export type tabsType = {
  title: string,
  content: JSX.Element
}

export type TabsState = {
  region: string,
  systems: Array<System>
}

