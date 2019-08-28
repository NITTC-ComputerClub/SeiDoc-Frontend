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
};
const getNowYMD = () => {
  const dt = new Date();
  dt.setTime(dt.getTime() + 1000*60*60*15)
  const y = dt.getFullYear();
  const m = ("00" + (dt.getMonth() + 1)).slice(-2);
  const d = ("00" + (dt.getDate())).slice(-2);
  const result = y + "-" + m + "-" + d;
  return result;
};
//exports.aggregate = functions.https.onRequest((req, resp) => {
exports.aggregate_Cron = functions.pubsub.schedule('5 0 * * *').timeZone('Asia/Tokyo').onRun(context => {
  //const today = Date.now();
  //const aWeekAgo = today - 604800;
  const ranking: rankingType[] = [];
  return admin
    .firestore()
    .collection(detailPageLogIndex)
    //.where("createdAt", "<", today)
    //.where("createdAt", ">", aWeekAgo)
    .get()
    .then(snapshot => {
      console.log(snapshot);
      snapshot.forEach(doc => {
        const data = doc.data() as logType;
        const target = ranking.find(logData => {
          return logData.documentID === data.documentID;
        });
        if (target === undefined) {
          const r: rankingType = {
            documentID: data.documentID,
            system: data.system,
            count: 1
          };
          ranking.push(r);
        } else {
          target.count++;
        }
      });
    })
    .then(() => {
      console.log(ranking);
      console.log('Write at: ' + getNowYMD())
      admin
        .firestore()
        .collection(popularPageIndex)
        .doc(getNowYMD())
        .set({ranking:ranking})
        .then(res => console.log(res))
        .catch(err => console.error(err));
    })
    .catch(err => {
        console.error(err)
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
