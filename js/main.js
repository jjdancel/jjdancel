// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBGjFMBT42JnkpZdOXe19S2wUIRU4W3UQw",
    authDomain: "final-project-94a07.firebaseapp.com",
    databaseURL: "https://final-project-94a07.firebaseio.com",
    projectId: "final-project-94a07",
    storageBucket: "final-project-94a07.appspot.com",
    messagingSenderId: "743780177320",
    appId: "1:743780177320:web:b920cc2e848f9f0f3a799d",
    measurementId: "G-48GC9BCSDK"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  var database = firebase.database();

var reservationData = {};

//users can reserve a day
$(".reservation-day li").on("click", function() {   
  reservationData.day = $(this).text();
});

//users can reserve their time
$(".reservation-time li").on("click", function() {   
  reservationData.time = $(this).text();
});

//when user submits reservation form
$(".reservation-form").on("submit", function(e) { 
  e.preventDefault(); //page will not reload

  reservationData.name = $(".reservation-name").val(); //user's input name will be stored in reservationData

// post to Firebase database
var reservationsReference = database.ref("reservations"); //create section for data in database
    reservationsReference.push(reservationData); //post reservation data to database
});  

function getReservations() {
  database.ref("reservations").on("value", function(results) {
  
  var allReservations = results.val();
  
  $(".reservation-list").empty();

//Loop through reservations
  for (var reservation in allReservations) {
    var context = {
                   name: allReservations[reservation].name,
                   day: allReservations[reservation].day,
                   time: allReservations[reservation].time,
                   reservationId: reservation 
          };
    var source = $("#reservation-template").html();

    var template = Handlebars.compile(source);

    var reservationListItem = template(context);

    $(".reservation-list").append(reservationListItem); 
   }
 });
}
getReservations(); 

//existing reservations toggle
$("#reserved").on("click", function(e) { 
  e.preventDefault(); // page will not reload
  $(".table").slideToggle(300); //table will toggle
});

//google map api
function initMap() {
  var seoulGarden = {lat: 32.895783, lng: -96.895291} //get Seoul Garden location
        var map = new google.maps.Map(document.getElementById("map"), {  //create map
          center: seoulGarden,
          zoom: 16
        });
        var marker = new google.maps.Marker({position: seoulGarden, map: map}); //marker on Seoul Garden location
}

//navbar becomes solid when user scrolls
$(document).ready(function() {
  $(window).scroll(function() {    
      var scroll = $(window).scrollTop();
      if (scroll >= 100) {
          $(".navbar").addClass("bg-dark");
      } else {
        $(".navbar").removeClass("bg-dark");
      }
    }); 
});