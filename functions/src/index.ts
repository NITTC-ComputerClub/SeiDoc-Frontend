import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';


admin.initializeApp();
const env = functions.config();

import * as algoliaSearch from 'algoliasearch'

const client = algoliaSearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('test_firestore');

interface System {
    Name: string,
    Department: string,
    Location: string,
    Site: string,
    Detail: string,
    Target: string,
    Method: string,
    Category: string[]
}

exports.onSystemCreated = functions.firestore.document('systems/{testId}').onCreate(
    (snap, context) => {
        const data   = snap.data() as any;
        index.addObject({
            'Name': data.Name,
            'Department': data.Department,
            'Location' : data.Location,
            'Site': data.Site,
            'Detail': data.Detail,
            'Target' : data.Target,
            'Method': data.Method,
            'Category': data.Category
        },(err,res)=>{
            if(err){
                console.error(err);
            }else{
                console.log(res);
            }
        })
    }
);

exports.addNewSystemsByGAS = functions.https.onRequest(
    (req, resp) => {
        if (req.method !== 'GET'){
            resp.status(405).send('Method Not Allowed');
            return;
        }   
        const URL = "https://script.google.com/macros/s/AKfycbz4hzx40TvDLIl4MGARBmECM1Gpp3kjb_LUEafA81O3SQ3oC2Pk/exec"
        axios.get(URL).then(res => {
            const systems: System[] = res.data;
            systems.forEach(system => {
                addNewData(system);
            })
        }
        ).catch(err => console.error(err))
    }
)


const addNewData = (system: System) => {
    admin.firestore().collection('systems')
        .add(system)
        .then(res => {
            console.log('Add: ', system.Name);
        }).catch(err => {
            console.error('error: ',err)
        })
}