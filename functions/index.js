const functions = require('firebase-functions');
const LINKS_NR = 10;
const admin = require('firebase-admin'); 

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://hacker-news-like.firebaseio.com"
}); 
const db = admin.firestore(); 

exports.pagination = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET');
  response.set('Access-Control-Allow-Headers', '*');
  
  const offset = Number(request.query.offset);
  let linksRef = db.collection('links');
  linksRef.orderBy("created", "desc").startAfter(cursor.created).limit(LINKS_NR).offset(offset).get().then(snapShot => {
    const links = snapShot.docs.map(doc => {
      return { id: doc.id, ...doc.data() }
    });
    response.json(links);
  })
}); 