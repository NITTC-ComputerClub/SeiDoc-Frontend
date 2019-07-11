import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
const env = functions.config();

import * as algoliaSearch from 'algoliasearch'

const client = algoliaSearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('test_firestore');

exports.indexInstitutions = functions.firestore.document('test/{testId}').onCreate(
    (snap, context) => {
        const data = snap.data();
        const objectID = snap.id;

        return index.addObject({
            objectID,
            ...data
        });
    }
);

