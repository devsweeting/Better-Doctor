import { Api } from './api';
import { Map } from './map';
import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const loadGoogleMapsApi = require('load-google-maps-api')
import 'load-google-maps-api';


function errorMessage(error){
  $("#error")
    .show()
    .slideDown(500)
    .delay(8000)
    .slideUp(500);
  $(".error")
    .html(`There was error processing your query: ${error.message}. Please Try Again`)
    .delay(8000)
    .slideUp(1000);
}

function accept(check) {
  if (this === true) {
    return "Accpeting new patients! call and apply now!"
  } else {
    return "Unfortunately this doctor is not accepting new patients"
  }
}

$(document).ready(function() {

  // ----- Calls list of conditions in DOM -----
  let symptons = new Api();
  let symptonsPromise = symptons.callSymptons();
  symptonsPromise.then(function(response) {
    let selections = JSON.parse(response);
    console.log(selections);
    selections.data.forEach(function(sympton) {
      $("#symptons").append("<option value=" + sympton.uid + ">" + sympton.name + "</option>");
    });
  });

  // ----- Where user selects search parameters to find local doctor ----
  $('#doctor-search').submit(function(event) {
    event.preventDefault();
    $("#doctors-form").empty();
    const userSymptons = $("#symptons").val();
    const userAddress = $("#address").val();
    const userDistance =$("#distance").val();
    const sortBy = $("#sort-by").val();
    const doctorSearch = new Api();
    const doctorsPromise = doctorSearch.callDoctor(userSymptons, userAddress, userDistance, sortBy);
    const doctorsArray = []
    doctorsPromise.then(function(response) {
      let doctors = JSON.parse(response);
      doctors.data.forEach(function(doctor) {
        $("#doctors-form").append("<option class='doctors' value=" + doctor.uid + ">" + "Dr. " + doctor.profile.first_name + " " + doctor.profile.last_name  + ", " + doctor.profile.title + "</option>");
        doctorsArray.push(doctor.uid)
      });
      console.log(doctorsArray.length);
    if (doctorsArray.length === 0) {
      $("#no-doctors")
      .show()
      .delay(8000)
      .slideUp(1000);
    } else {
      $(".doctors-card").show();
    }
  }, function(error) {
    errorMessage(error)
  })
});



    // ---- alternate .onclick call ----- Why is this not working after API Call?

    // $('#doctors-form option').on('click', function() {
    //   const doctorUID = $(this).val();


    // ---- Call for Individual Doctor Information ----
    $('.doctors-list').submit(function(event) {
      event.preventDefault();
      const doctorUID = $("#doctors-form").val();
      const doctorDetails = new Api();
      const doctorDetailsPromise = doctorDetails.callDetails(doctorUID);
      doctorDetailsPromise.then(function(response) {
        let details = JSON.parse(response);
        debugger;
        let firstName = details.data.profile.first_name;
        let lastName = details.data.profile.last_name;
        let fullName = firstName + " " + lastName;
        const lat = details.data.practices[0].lat;
        const lon = details.data.practices[0].lon;
        let img = details.data.profile.image_url;
        let city = details.data.practices[0].visit_address.city;
        let state = details.data.practices[0].visit_address.state;
        let zip = details.data.practices[0].visit_address.zip;
        let street = details.data.practices[0].visit_address.street;
        let address = street + " " + city + ", " + state + " " + zip
        let contact = details.data.practices[0].phones[0].number;
        // let website = Can't find website
        let newPatients = details.data.practices[0].accepts_new_patients;
        let acceptingPatients = accept(newPatients);
        let bio = details.data.profile.bio;
        $("#doctor-image").html(`<img src="${img}" alt="Profile Picture">`);
        $("#doctor-name").html(fullName);
        $("#doctor-bio").html(bio);
        $("#doctor-address").html(address);
        $("#doctor-contact").html(contact);
        $("#doctor-website").html();
        $("#accepting-paitents").html(acceptingPatients);
      });
    });

    // ---- Show map here --- Try over weekend

    $('#show-map').click(function(event) {
      event.preventDefault();
    //   let mapElement = document.getElementById('map');
    //   let loadPromise = Map.loadMap();
    //   loadPromise.then(function(googleMaps) {
    //     return Map.createMap(googleMaps, mapElement);
    //     let doctorOffice = {lat: lat, lng: lon};
    //     let marker = new google.maps.Marker({position: doctorOffice, map: map});
    //   });
      $("#map-body").show();
    });
});
