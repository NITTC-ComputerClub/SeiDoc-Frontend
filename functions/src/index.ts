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
  dailyView: number;
};
const getNowYMD = () => {
  const dt = new Date();
  dt.setTime(dt.getTime() + 1000 * 60 * 60 * 15);
  const y = dt.getFullYear();
  const m = ("00" + (dt.getMonth() + 1)).slice(-2);
  const d = ("00" + dt.getDate()).slice(-2);
  const result = y + "-" + m + "-" + d;
  return result;
};

exports.aggregate_Cron = functions.pubsub
  .schedule("5 0 * * *")
  .timeZone("Asia/Tokyo")
  .onRun(context => {
  const dailyRanking: rankingType[] = [];
  const tmp = new Date(getNowYMD());
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
      console.log("Log write at: " + getNowYMD());
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
});

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
