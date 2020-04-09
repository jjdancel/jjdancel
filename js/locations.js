//google map api
function initMap() {
  var seoulGarden = {lat: 32.895783, lng: -96.895291} //get Seoul Garden location
        var map = new google.maps.Map(document.getElementById('map'), {  //create map
          center: seoulGarden,
          zoom: 10
        });
        var marker = new google.maps.Marker({position: seoulGarden, map: map}); //marker on Seoul Garden location

        var infowindow = new google.maps.InfoWindow({
        content: "2502 Royal Ln, Dallas, TX 75229 USA"
        });

        google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
        });

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