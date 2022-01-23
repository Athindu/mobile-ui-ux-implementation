var config = {
    apiKey: "AIzaSyCfShr3T2oBF6q0jy3IZNgxNIjnfKpKNmo",
    authDomain: "test-project-b5e7d.firebaseapp.com",
    databaseURL: "https://test-project-b5e7d-default-rtdb.firebaseio.com",
    projectId: "test-project-b5e7d",
    storageBucket: "test-project-b5e7d.appspot.com",
    messagingSenderId: "751578353460",
    appId: "1:751578353460:web:819a5c83c9911d88625f61"
};
firebase.initializeApp(config);

var dbRef = firebase.database();

var scoreRef = dbRef.ref('scoreboard');
var scoreArray = [];
var latestScore;
let ps;


scoreRef.on("child_added", function (snap) {
    $('#userScore').append(scoreHtmlFromObject(snap.val()));
    console.log("added", snap.val());
    ps = snap.val()
    scoreArray.push(ps.Points)
    console.log('snap val '+ps)
    
    latestScore = scoreArray[scoreArray.length - 1]
    // localStorage.setItem('latest score',latestScore)

    // console.log('latest score '+ latestScore)

});

function scoreHtmlFromObject(ps) {
    console.log(JSON.stringify(ps) + "scr");

    var scr = '';

    scr += 'LP : ' + ps
    console.log('ps ',ps)

    return scr;
}
