import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";

admin.initializeApp();

const env = functions.config();

import * as algoliaSearch from "algoliasearch";

export const productionSystemIndex = "systems";
export const detailPageLogIndex = "detailPageLog";
export const popularPageIndex = "popularSystem";

const client = algoliaSearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex(productionSystemIndex);



export type UserState = {
  userId: string;
  nickName: string;
  birthday: string;
  income: number;
  address: string;
  family: string;
  sex: 'male' | 'female' | 'None';
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
  ageGroup: ageGroup[];
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
  weeklyView: number[]; //[0,0,0,0,0,0,0]
  monthlyView: number;
  dailyView: number;
  ageGroup: ageGroup[]
};

type ageGroup = {
  count: number;
  age: '0' | '10' | '20' | '30' | '40' | '50' | '60' | '70'
}

const getNowYMD = () => {
  const dt = new Date();
  dt.setTime(dt.getTime() + 1000 * 60 * 60 * 15);
  const y = dt.getFullYear();
  const m = ("00" + (dt.getMonth() + 1)).slice(-2);
  const d = ("00" + dt.getDate() ).slice(-2);
  const result = y + "-" + m + "-" + d;
  return result;
};

const calcAge = function(birthday: string){
  const d = new Date();
  const today = ''+d.getFullYear()+('0'+(d.getMonth()+1)).slice(-2)+('0'+d.getDate()).slice(-2);
  const b = new Date(birthday);
  const b_day = ''+b.getFullYear()+('0'+(b.getMonth()+1)).slice(-2)+('0'+b.getDate()).slice(-2);
  return Math.floor((parseInt(today)-parseInt(b_day))/10000);
};

const getAgeGroup = (age: number) => {
  if(0 < age && age <= 10){
    return '0'
  }else if(10 < age && age <= 20){
    return '10'
  }else if(20 < age && age <= 30){
    return '20'
  }else if(30 < age && age <= 40){
    return '30'
  }else if(40 < age && age <= 50){
    return '40'
  }else if(50< age && age <= 60){
    return '50'
  }else if(60 < age && age <= 70){
    return '60'
  }else {
    return '70'
  }
}

exports.test = functions.https.onRequest(() => {
  return admin.firestore().collection(detailPageLogIndex).get().then(
    snapshot => {
      snapshot.forEach(d => {
        const data = d.data() as logType;
        if(data.system.documentID === "0er615WNs8UDvJ0Fuj4S"){
          console.log(data.user.birthday)
        }
      })
    }
  ).catch(err => console.error(err))
});

exports.backup = functions.https.onRequest(() => {
  return admin.firestore().collection(productionSystemIndex).get().then(
    snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data() as System
        data.totalView = 0;
        data.dailyView = 0;
        data.weeklyView = Array(7).fill(0);
        data.monthlyView = 0;
        data.ageGroup = [];
        //admin.firestore().collection(CAREGORY_NAME).doc(data.documentID).set(data).catch(err => console.error(err))
      })
    }
  ).then(() => console.log("ばっくあっぷ だん"))
})

/*
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
*/
exports.aggregate_Cron = functions.pubsub
  .schedule("5 0 * * *")
  .timeZone("Asia/Tokyo")
  .onRun(() => {
    return aggregate(getNowYMD()).catch(err=>console.error(err));
});

exports.resetWeeklyView = functions.pubsub
  .schedule("10 0 * * 1")
  .timeZone("Asia/Tokyo")
  .onRun(() => {
    return admin.firestore().collection(productionSystemIndex).get().then(
      snapshot => {
        snapshot.forEach(doc => {
          const data = doc.data() as System;
          data.weeklyView = [data.weeklyView[6],0,0,0,0,0,0];
          admin.firestore().collection(productionSystemIndex).doc(data.documentID).update(data).catch(err=>console.error(err));
        })
      }
    )
  });

exports.resetMonthlyView = functions.pubsub
  .schedule("15 0 1 * *")
  .timeZone("Asia/Tokyo")
  .onRun(() => {
    return admin.firestore().collection(productionSystemIndex).get().then(
      snapshot => {
        snapshot.forEach(doc => {
          const data = doc.data() as System;
          data.monthlyView = 0;
          data.ageGroup = [];
          admin.firestore().collection(productionSystemIndex).doc(data.documentID).update(data).catch(err=>console.error(err));
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
        const currentAge = getAgeGroup(calcAge(data.user.birthday));
        const target = dailyRanking.find(logData => {
          return logData.documentID === data.documentID;
        });
        if (target === undefined) { // Log一発目
          const aG: ageGroup = {
            count: 1,
            age : currentAge
          }
          const r: rankingType = {
            documentID: data.documentID,
            system: data.system,
            count: 1,
            ageGroup: [aG]
          };
          dailyRanking.push(r);
        } else { // Logに記録されてる
          const targetAge = target.ageGroup.find(ag => {
            return ag.age === currentAge
          })
          if(targetAge === undefined){ // この年代は最初
            target.ageGroup.push({
              count: 1,
              age : currentAge
            })
          }else{
            targetAge.count++
          }
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
        .collection(productionSystemIndex)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            const data = doc.data() as System;
            const target = dailyRanking.find(logData => {
              return logData.documentID === data.documentID;
            });

            data.weeklyView.shift();
            data.weeklyView.push(0);
            if (target !== undefined) { 
              target.ageGroup.forEach(aG => {
                const t = data.ageGroup.find(d => {return d.age === aG.age});
                if (t === undefined){
                  data.ageGroup.push(aG)
                }else{
                  t.count++
                }
              });
            }

            
            data.dailyView = 0;
            //保存
            admin
              .firestore()
              .collection(productionSystemIndex)
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

exports.onSystemDeleted = functions.fireStore.document(productionSystemIndex + "/{testId}").onDelete((snap,context) => {
  //const data = snap.data() as System;
  const filter = 'documentID:' + snap.id;
  index.deleteBy({filters: filter},((err,res) => {
    if (err) {
      console.error(err)
      return false;
    }else{
      console.log(res)
      return true;
    }
  }));
});

exports.onSystemCreated = functions.firestore
  .document(productionSystemIndex + "/{testId}")
  .onCreate((snap, context) => {
    const data = snap.data() as System;
    data.documentID = snap.id;
    return admin
      .firestore()
      .collection(productionSystemIndex)
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

  exports.addIndexToAlgoliaSearch = functions.https.onRequest(() => {
    return admin.firestore().collection(productionSystemIndex).get().then(
      snapshot => {
        snapshot.forEach(doc => {
          const data = doc.data() as System;
          index.addObject(data, (err, res) => {
            if (err) {
              console.error(err);
            }else {
              console.log(res);
            }
          });
        });
      }
    ).catch(err => console.error(err));
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
        await addNewData(system, productionSystemIndex);
      }
    })
    .then(res => {
      resp.status(200).end();
      return;
    })
    .catch(err => console.error(err));
});

const addNewData = async (system: System, indexName: string) => {
  return admin
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

