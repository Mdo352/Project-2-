
// // The API object contains methods for each kind of request we'll make
var API = {
  saveProfile: function(profile,result) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/userProfile",
      data: JSON.stringify(profile),
      success: function(dbProfile){
          result = true;
          localStorage.setItem('profile', JSON.stringify(dbProfile));
          window.location.href = "../profile.html?";               
      },
      error : function(xhr,status,errMsg){

        if(xhr.status&&xhr.status==500){          
           var errorM = xhr.responseText;          
           displayMessage(errorM);
         }else{
           displayMessage("Something went wrong");
         }
      }

      
    });
  },

  getProfile: function(userName) {
    $.ajax({  
      type: 'GET',  
      dataType: 'json',
      url: '/api/userProfile/' + userName,
      data: { userName: userName },
      success: function(dbProfile) {
        if(isEmpty(dbProfile)){
          alert("User not found");
          return;
        }
        var profileData = {
          firstName: dbProfile.firstName,
          lastName: dbProfile.lastName, 
          illness: dbProfile.illness,
          city: dbProfile.city,
          state: dbProfile.state
        };

        localStorage.setItem('profile', JSON.stringify(profileData));              
        window.location.href = "../profile.html?";
      }
    });
  }
};

// this npm package will give the list of states in US
// var UsaStates = require('usa-states').UsaStates;

// var usStates = new UsaStates();

//handleCreateAccount is called when the create account link is clicked.
// This will poulate the form in the modal


var $createProfile = $("#createProfile");
var $btnSignUp = $("#btnSignUp");
var $btnLogIn = $("#btnLogIn");

// ********************function to check if the object is empty******************************
function isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
    }
    return true;
    }
// ******************************************************************************************
// ******************************* This function will dynamically add the error message*******************
function displayMessage(errorMessage){
  
   var errMsg = $("<p>");
   errMsg.css("color","red");
   errMsg.text(errorMessage) ;
   $("#divError").append(errMsg);
   $("#divError").show();
}

// *********************************************************************************************

// This function is called when the create account link is clicked
var handleCreateAccount = function() {
  $("#userProfile").show();
};

// *********************function handleSignUp****************************************
// this function is called when the Sign up button in the form is clicked
var handleSignUp = function(event) {  
  event.preventDefault();
console.log("test");
  $("#divError").hide();
  // helper function ^^^^^^^^^^^^^^^^^^^^^^^^validateForm^^^^^^^^^^^^^^^^^^^^^^^^^^^
  function validateForm(){
    // This function will validate the form inputs
    errMsg = "";
    var valid = true;

    if ($("#firstName").val() == ""){ 
      errMsg ="First Name should be entered" ;
      valid = false;  
    }

    if ($("#lastName").val() ==""){
      errMsg = "Last Name should be entered" ;
      valid = false;
    }

    if ($("#uName").val() ==""){
      errMsg ="Username should be entered" ;
      valid = false;
    }

    if ($("#illness").val() ==""){
      errMsg = "Illness should be entered" ;
      valid = false;
    }

    if ($("#city").val() ==""){
      errMsg = "City should be entered" ;
      valid = false;
    }

    if ($("#state").val() ==""){
      errMsg = "State should be entered" ;
      valid = false;
    }else{
      if($("#state").val().trim().lenth>2){
        errMsg = "Use abbrivation for the state name" ;
        valid = false;
      }
    }
  

    if(!valid){
      displayMessage(errMsg);
     
    }
    return valid;
  }
  // ^^^^^^^^^^^^^^^^End of helper function for validating form inputs^^^^^^^^^^^^^^^^^^^^^^^^
  var result = true;
  var validForm = validateForm();
  
  if (validForm){

    var profile = {
      firstName: $("#firstName")
        .val()
        .trim(),
      lastName: $("#lastName")
        .val()
        .trim(),
      userName: $("#uName")
        .val()
        .trim(),
      illness: $("#illness")
        .val()
        .trim(),
      city: $("#city")
        .val()
        .trim(),
      state: $("#state")
        .val()
        .trim()
    };
   
    API.saveProfile(profile);
    
  };
};
// *****************************end of function handleSignUp**********************************



var handleLogIn = function(){
  event.preventDefault();  
  var userName = $("#userName").val().trim();
  API.getProfile(userName);
 
};

$createProfile.on("click",handleCreateAccount);
$btnSignUp.on("click",handleSignUp);
$btnLogIn.on("click",handleLogIn);

// Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);

// document on load 
$(function() {
  $("#userProfile").hide();
  $("#divError").hide();



});
