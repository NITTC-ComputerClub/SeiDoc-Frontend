import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";

admin.initializeApp();
const env = functions.config();

import * as algoliaSearch from "algoliasearch";

const client = algoliaSearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex("testData");
const fireStoreIndex = "testData";

export const detailPageLogIndex = "detailPageLog";
export const popularPageIndex = "popularSystem";
export const systemIndex = "testData2";
export const productionSystemIndex = "testData";
export type UserState = {
  userId: string;
  nickName: string;
  birthday: string;
  income: number;
  address: string;
  family: string;
  sex: 'male' | 'female';
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

type System = {
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
};
const getNowYMD = () => {
  const dt = new Date();
  dt.setTime(dt.getTime() + 1000 * 60 * 60 * 15);
  const y = dt.getFullYear();
  const m = ("00" + (dt.getMonth() + 1)).slice(-2);
  const d = ("00" + dt.getDate() ).slice(-2);
  const result = y + "-" + m + "-" + d;
  return result;
};
/*
const calcAge = function(birthday: string){
  const d = new Date();
  const today = ''+d.getFullYear()+('0'+(d.getMonth()+1)).slice(-2)+('0'+d.getDate()).slice(-2);
  const b = new Date(birthday);
  const b_day = ''+b.getFullYear()+('0'+(b.getMonth()+1)).slice(-2)+('0'+b.getDate()).slice(-2);
  return Math.floor((parseInt(today)-parseInt(b_day))/10000);
};
*/

exports.backup = functions.https.onRequest(() => {
  return admin.firestore().collection(productionSystemIndex).get().then(
    snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data() as System
        data.totalView = 0;
        data.dailyView = 0;
        data.weeklyView = Array(7).fill(0);
        data.monthlyView = 0;
        admin.firestore().collection(systemIndex).doc(data.documentID).set(data).catch(err => console.error(err))
      })
    }
  ).then(() => console.log("ばっくあっぷ だん"))
})

exports.aggregate0 = functions.https.onRequest(() => {
  const date = ["2019-08-30","2019-08-31","2019-09-01","2019-09-02","2019-09-03","2019-09-04","2019-09-05"]
  aggregate(date[0]).catch(err=>console.error(err))
})
exports.aggregate1 = functions.https.onRequest(() => {
  const date = ["2019-08-30","2019-08-31","2019-09-01","2019-09-02","2019-09-03","2019-09-04","2019-09-05"]
  aggregate(date[1]).catch(err=>console.error(err))
})
exports.aggregate2 = functions.https.onRequest(() => {
  const date = ["2019-08-30","2019-08-31","2019-09-01","2019-09-02","2019-09-03","2019-09-04","2019-09-05"]
  aggregate(date[2]).catch(err=>console.error(err))
})
exports.aggregate3 = functions.https.onRequest(() => {
  const date = ["2019-08-30","2019-08-31","2019-09-01","2019-09-02","2019-09-03","2019-09-04","2019-09-05"]
  aggregate(date[3]).catch(err=>console.error(err))
})
exports.aggregate4 = functions.https.onRequest(() => {
  const date = ["2019-08-30","2019-08-31","2019-09-01","2019-09-02","2019-09-03","2019-09-04","2019-09-05"]
  aggregate(date[4]).catch(err=>console.error(err))
})
exports.aggregate5 = functions.https.onRequest(() => {
  const date = ["2019-08-30","2019-08-31","2019-09-01","2019-09-02","2019-09-03","2019-09-04","2019-09-05"]
  aggregate(date[5]).catch(err=>console.error(err))
})
exports.aggregate6 = functions.https.onRequest(() => {
  const date = ["2019-08-30","2019-08-31","2019-09-01","2019-09-02","2019-09-03","2019-09-04","2019-09-05"]
  aggregate(date[6]).catch(err=>console.error(err))
})

exports.aggregate_Cron = functions.pubsub
  .schedule("5 0 * * *")
  .timeZone("Asia/Tokyo")
  .onRun(() => {
    aggregate(getNowYMD()).catch(err=>console.error(err));
});

exports.resetWeeklyView = functions.pubsub
  .schedule("10 0 * * 1")
  .timeZone("Asia/Tokyo")
  .onRun(() => {
    return admin.firestore().collection(systemIndex).get().then(
      snapshot => {
        snapshot.forEach(doc => {
          const data = doc.data() as System;
          data.weeklyView = [data.weeklyView[6],0,0,0,0,0,0];
          admin.firestore().collection(systemIndex).doc(data.documentID).update(data).catch(err=>console.error(err));
        })
      }
    )
  })
exports.resetMonthlyView = functions.pubsub
  .schedule("15 0 1 * *")
  .timeZone("Asia/Tokyo")
  .onRun(() => {
    return admin.firestore().collection(systemIndex).get().then(
      snapshot => {
        snapshot.forEach(doc => {
          const data = doc.data() as System;
          data.monthlyView = 0;
          admin.firestore().collection(systemIndex).doc(data.documentID).update(data).catch(err=>console.error(err));
        })
      }
    );
  });

const aggregate = (day: string) => {
  const dailyRanking: rankingType[] = [];
  const tmp = new Date(day);
  const today = tmp.getTime(); 
  const yesterday = today - 86400000; // 86400000 = 一日
  return admin
    .firestore()
    .collection(detailPageLogIndex)
    .where("createdAt", "<", today)
    .where("createdAt", ">", yesterday)
    .get()
    .then(snapshot => {
      console.log("create DailyRanking");
      snapshot.forEach(doc => {
        const data = doc.data() as logType;
        const target = dailyRanking.find(logData => {
          return logData.documentID === data.documentID;
        });
        if (target === undefined) {
          const r: rankingType = {
            documentID: data.documentID,
            system: data.system,
            count: 1
          };
          dailyRanking.push(r);
        } else {
          target.count++;
        }
      });
    }).then(() => {
      console.log("Log write at: " + day);
      admin
        .firestore()
        .collection(popularPageIndex)
        .doc(getNowYMD())
        .set({ ranking: dailyRanking })
        .then(res => console.log(res))
        .catch(err => console.error(err));
    })
    .then(() => {
      console.log("Update each systems")
      admin
        .firestore()
        .collection(systemIndex)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            const data = doc.data() as System;
            const target = dailyRanking.find(logData => {
              return logData.documentID === data.documentID;
            });

            data.weeklyView.shift();
            if (target === undefined) {
              data.dailyView = 0;
              data.weeklyView.push(0);
            } else {
              data.dailyView = target.count;
              data.weeklyView.push(target.count);
            }
            data.monthlyView += data.dailyView;
            data.totalView += data.dailyView;
            admin
              .firestore()
              .collection(systemIndex)
              .doc(data.documentID)
              .update(data)
              .catch(err => console.error(err));
          });
        })
          .then(() => console.log("だん"))
          .catch(err => console.error(err))
      .catch(err => console.error(err));
    });
}

exports.onSystemCreated = functions.firestore
  .document(fireStoreIndex + "/{testId}")
  .onCreate((snap, context) => {
    const data = snap.data() as System;
    data.documentID = snap.id;
    admin
      .firestore()
      .collection(fireStoreIndex)
      .doc(snap.id)
      .update(data)
      .then(() => {
        index.addObject(data, (err, res) => {
          if (err) {
            console.error(err);
          } else {
            console.log(res);
          }
        });
      })
      .catch(err => console.error(err));
  });

exports.addNewSystemsToAlgoliaSearch = functions.https.onRequest(
  (req, resp) => {
    if (req.method !== "GET") {
      resp.status(405).send("Method Not Allowed");
      return;
    }
    const indexName = req.query.index;
    if (indexName === undefined) {
      resp.status(405).send("Index is Required");
      return;
    }

    const URL =
      "https://script.google.com/macros/s/AKfycbz4hzx40TvDLIl4MGARBmECM1Gpp3kjb_LUEafA81O3SQ3oC2Pk/exec";
    axios
      .get(URL)
      .then(async res => {
        const systems: System[] = res.data;
        index.addObjects(systems, (err, response) => {
          if (err) {
            resp.status(400).end();
          }
          console.log(response);
        });
      })
      .then(res => {
        resp.status(200).end();
        return;
      })
      .catch(err => console.error(err));
  }
);
exports.addNewSystemsByGAS = functions.https.onRequest((req, resp) => {
  if (req.method !== "GET") {
    resp.status(405).send("Method Not Allowed");
    return;
  }

  const URL =
    "https://script.google.com/macros/s/AKfycbz4hzx40TvDLIl4MGARBmECM1Gpp3kjb_LUEafA81O3SQ3oC2Pk/exec";
  axios
    .get(URL)
    .then(async res => {
      const systems: System[] = res.data;
      for (const system of systems) {
        system.CreatedAt = Date.now();
        system.UpdatedAt = Date.now();
        system.isDeleted = false;
        system.UpdatedAt = 2262025600000;
        await addNewData(system, fireStoreIndex);
      }
    })
    .then(res => {
      resp.status(200).end();
      return;
    })
    .catch(err => console.error(err));
});

const addNewData = async (system: System, indexName: string) => {
  admin
    .firestore()
    .collection(indexName)
    .add(system)
    .then(res => {
      console.log("Add: ", system.Name);
    })
    .catch(err => {
      console.error("error: ", err);
    });
};
