import { Api } from './api';
import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function() {
  // Calls list of symptons to be displayed in DOM after loading
  let symptons = new Api();
  let symptonsPromise = symptons.callSymptons();
  symptonsPromise.then(function(response) {
    let selections = JSON.parse(response);
    selections.data.forEach(function(sympton) {
      $("#symptons").append("<option value=" + sympton.uid + ">" + sympton.name + "</option>");
    });
  });

  // Where user selects search parameters to find local doctor
  $('#doctor-search').submit(function(event) {
    event.preventDefault();
    const userSymptons = $("#symptons").val();
    const userAddress = $("#address").val();
    const userDistance =$("#distance").val();
    const sortBy = $("#sort-by").val();
    // const doctorSearch = new Api();
    // const doctorsPromise = doctorSearch.callDoctor(userSymptons, userAddress, userDistance, sortBy);
    //   let doctors = JSON.parse(response);
    // debugger;
    });
  });
