import { Api } from './api';
import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function() {

  // ----- Calls list of conditions in DOM -----
  // let symptons = new Api();
  // let symptonsPromise = symptons.callSymptons();
  // symptonsPromise.then(function(response) {
  //   let selections = JSON.parse(response);
  //   selections.data.forEach(function(sympton) {
  //     $("#symptons").append("<option value=" + sympton.uid + ">" + sympton.name + "</option>");
  //   });
  // });

  // ----- Where user selects search parameters to find local doctor ----
  $('#doctor-search').submit(function(event) {
    event.preventDefault();
    const userSymptons = $("#symptons").val();
    const userAddress = $("#address").val();
    const userDistance =$("#distance").val();
    const sortBy = $("#sort-by").val();
    // $(".doctors-list option").remove()
    const doctorSearch = new Api();
    const doctorsPromise = doctorSearch.callDoctor(userSymptons, userAddress, userDistance, sortBy);
      doctorsPromise.then(function(response) {
        let doctors = JSON.parse(response);
        doctors.data.forEach(function(doctor) {
        $("#doctors-form").append("<option class='doctors' value=" + doctor.uid + ">" + "Dr. " + doctor.profile.first_name + " " + doctor.profile.last_name  + ", " + doctor.profile.title + "</option>");
      });
      debugger;
    });
    $(".doctors-card").show();
  });

// ---- Call for Individual Doctor Information ----
    $('#doctors-form option').on('click', function() {
      const doctorUID = $(this).val();
      console.log(doctorUID);
      const doctorDetails = new Api();
      const doctorDetailsPromise = doctorDetails.callDetails(doctorUID);
      doctorDetailsPromise.then(function(response) {
        let details = JSON.parse(response);
        let firstName = details.data.profile.first_name;
        let lastName = details.data.profile.last_name;
        let fullName = firstName + " " + lastName;
        let lat = details.data.practices[0].lat;
        let lon = details.data.practices[0].lon;
        let img = details.data.profile.image_url;
        let city = details.data.practices[0].visit_address.city;
        let state = details.data.practices[0].visit_address.state;
        let zip = details.data.practices[0].visit_address.zip;
        let street = details.data.practices[0].visit_address.street;
        let address = street + " " + city + ", " + state + " " + zip
        let contact = details.data.practices[0].phones[0].number;
        // let website =
        let acceptingPatients = details.data.practices[0].accepts_new_patients;
        let bio = details.data.profile.bio;
        $("#doctor-image").html(`<img src="${img}" alt="Profile Picture">`);
        $("#doctor-name").html(fullName);
        $("#doctor-bio").html(bio);
        $("#doctor-address").html(address);
        $("#doctor-contact").html(contact);
        $("#doctor-website").html();
        $("#accepting-paitents").html(acceptingPatients);
        debugger;
      });
    });

    // ---- Show map here ---
    $('#show-map').click(function(event) {
      event.preventDefault();

      $("#map-body").show();
    });
});
