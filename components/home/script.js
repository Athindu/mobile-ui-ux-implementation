// file: script.js
// Initialize Firebase
var config = {
  apiKey: "AIzaSyA_UKr9E3trZA323r4LvsfsH3lnpNCYtC8",
  authDomain: "lkiea-f3e19.firebaseapp.com",
  projectId: "lkiea-f3e19",
  databaseURL: "https://lkiea-f3e19-default-rtdb.firebaseio.com/",
  messagingSenderId: "67930827677",
  appId: "1:67930827677:web:15fafd962274021bd15d74"
};
firebase.initializeApp(config);

//create firebase database reference
var dbRef = firebase.database();
var contactsRef = dbRef.ref('contacts');

var today  = new Date();
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var stars =0;

//load older conatcts as well as any newly added one...
contactsRef.on("child_added", function(snap) {
  console.log("added", snap.key, snap.val());
  $('#contacts').append(contactHtmlFromObject(snap.val()));
});

$('.stars a').on('click', function(){
  $('.stars span, .stars a').removeClass('active');
  let st = $(this).attr("id");
  console.log("stars+   " + st)
switch (st) {
  case "st-1":
    stars = 1;
    break;
  case "st-2":
    stars = 2;
    break;
  case "st-3":
    stars = 3;
    break;
  case "st-4":
    stars = 4;
    break;
  case "st-5":
    stars = 5;
    break;
  default:
    stars = 0;
    break;
}
  $(this).addClass('active');
  $('.stars span').addClass('active');
  console.log("stars+" + stars)
});

//save contact
$('.addValue').on("click", function( event ) { 
  //  $('#popupLogin').addClass('hidden');
    event.preventDefault();
    if( $('#name').val() != '' || $('#email').val() != '' ){
      contactsRef.push({
        name: $('#name').val().replace(/<[^>]*>/ig, ""),
        email: $('#email').val().replace(/<[^>]*>/ig, ""),
        date: today.toLocaleDateString("en-US", options),
        star : stars
        // description: "Lighting makes the room. Strategically placed, lamps can bring any room into a deeper perspective and showcase your compelling decor. This guide will introduce you to many types of lamp shades available from The Home Depot that will address your lighting needs while enhancing your decor.",
        // main_img: "https://res.cloudinary.com/dgly8b9lq/image/upload/v1642139960/Lkia/joel-henry-pdIwPL3HU2s-unsplash_jtp9rn.jpg",
        // main_title: "Tripod Table Lamp - Modern Bedside Lamp for Room Lighting",
        // price: "£ 39.80",
        // stars: 5
      })
      contactForm.reset();
      $('.stars span, .stars a').removeClass('active');
      stars = 0;
    } else {
      alert('Please fill atlease name!');
    }
  });

//prepare conatct object's HTML
function contactHtmlFromObject(contact){
console.log(JSON.stringify(contact)+"Jaye");
  let count = contact.star;

  var star = '';

  for (let i = 0; i < 5; i++) {
    if(count != 'undefined'){
      if(count > 0){
        star +=  '<span class="active">';
    star +=  '<a id="readonly_rating">1</a>';
    star +='</span>';
    count--;
      } else{
        star +=  '<span class="read-only">';
        star +=  '<a id="readonly_rating">1</a>';
        star +='</span>';
      }
  }}

  var html = '';
  html +=  '<section class="section-50">';
		html +=  '<div class="container">';
		html += 	'<div class="notification-ui_dd-content">';
    html += 	'<div class="notification-list">';
    html += 	'<div class="notification-list_content">';
    html += 	'<div class="notification-list_img">';
    html += 	'<img src="https://res.cloudinary.com/dgly8b9lq/image/upload/v1642155403/Lkia/man_1_ilhh9d.png" alt="Feature image" alt="user">';
    html += 	'</div>';
    html += 	'<div class="notification-list_detail">';
    html += 	'<p><b>'+contact.name+'</b></p>';
    html += 	'<p class="text-muted">'+contact.email+'</p>';
    html += 	'<p class="text-muted"><p class="stars-read-only">';
    html += '<span class="read-only">'
    html += star;
    html +='</span>'
    html +='</p></p>';
    html += 	'<p class="text-muted"><small>'+contact.date+'</small></p>';
    html += 	'</div>';
    html += 	'</div>';
    html += '<div class="notification-list_feature-img">';
    html += 	'<img src="https://res.cloudinary.com/dgly8b9lq/image/upload/v1642139960/Lkia/joel-henry-pdIwPL3HU2s-unsplash_jtp9rn.jpg">';
    html += 	'</div>';
    html += 	'</div>';
		html += 	'</div>';
    html += 	'</div>';
    html += '</section>';
  return html;
}