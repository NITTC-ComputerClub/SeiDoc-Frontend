import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';


admin.initializeApp();
const env = functions.config();

import * as algoliaSearch from 'algoliasearch'

const client = algoliaSearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('testData');
const fireStoreIndex = 'testData';

type System = {
    Name: string,
    Department: string,
    Location: string,
    Site: string,
    Detail: string,
    Target: string,
    Method: Array<string>,
    Category: Array<string>,
    CreatedAt: number,
    UpdatedAt: number,
    isDeleted: boolean,
    ExpireAt: number
}


exports.onSystemCreated = functions.firestore.document(fireStoreIndex + '/{testId}').onCreate(
    (snap, context) => {
        const data   = snap.data() as System;
        index.addObject(data,(err,res)=>{
            if(err){
                console.error(err);
            }else{
                console.log(res);
            }
        })
    }
);

exports.addNewSystemsToAlgoliaSearch = functions.https.onRequest( (req, resp) => {
    if (req.method !== 'GET'){
        resp.status(405).send('Method Not Allowed');
        return;
    }
    const indexName = req.query.index
    if(indexName === undefined){
        resp.status(405).send('Index is Required')
        return;
    }

    const URL = "https://script.google.com/macros/s/AKfycbz4hzx40TvDLIl4MGARBmECM1Gpp3kjb_LUEafA81O3SQ3oC2Pk/exec"
    axios.get(URL).then(async res => {
        const systems: System[] = res.data;
        index.addObjects(systems, (err, response) => {
            if(err){
                resp.status(400).end()
            }
            console.log(response)
        })
    }
    ).then(res => {
        resp.status(200).end()
        return
    }).catch(err => console.error(err))
})
exports.addNewSystemsByGAS = functions.https.onRequest(
    (req, resp) => {
        if (req.method !== 'GET'){
            resp.status(405).send('Method Not Allowed');
            return;
        }

        const URL = "https://script.google.com/macros/s/AKfycbz4hzx40TvDLIl4MGARBmECM1Gpp3kjb_LUEafA81O3SQ3oC2Pk/exec"
        axios.get(URL).then(async res => {
            const systems: System[] = res.data;
            for(const system of systems) {
                system.CreatedAt = Date.now()
                system.UpdatedAt =  Date.now()
                system.isDeleted =  false
                system.UpdatedAt = 2262025600000
                await addNewData(system,fireStoreIndex)
            }
        }
        ).then(res => {
            resp.status(200).end()
            return
        }).catch(err => console.error(err))
    }
)


const addNewData = async (system: System, indexName: string) => {
    admin.firestore().collection(indexName)
        .add(system)
        .then(res => {
            console.log('Add: ', system.Name);
        }).catch(err => {
            console.error('error: ',err)
        })
}
