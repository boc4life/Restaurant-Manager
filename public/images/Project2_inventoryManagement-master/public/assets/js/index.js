var check = function () {
  if ($('#userPassSignup').val() == $('#userPassConfirm').val()) {
    $('#message').css("color", 'green');
    $('#message').text('Passwords match');
    $(`#signupSubmit`).attr(`disabled`, false);
  } else {
    $('#message').css("color", 'red');
    $('#message').text('Passwords do not match');
    $(`#signupSubmit`).attr(`disabled`, true);
  }
}

var storeUserLogin = function() {
  let sessionUserLogin  = sessionStorage.setItem("Name", $(`#usernamelogin`).val());
  let userAuthLogin = sessionStorage.setItem("auth", "true");
}
var storeUserSignup = function() {
  let sessionUserSignup = sessionStorage.setItem("Name", $(`#usernameSignup`).val());
  let userAuthSignup = sessionStorage.setItem("auth", "true");
}

$(document).ready(function () {

  // create new user button pressed
  $(`#signupSubmit`).on("click", function (event) {
    event.preventDefault();
    //console.log("signupSubmit pressed");

    // check for space character
    if ($(`#usernameSignup`).val().includes(" ")) {
      $(`#usernameMessage`).css("color", "red");
      $(`#usernameMessage`).html("Username cannot include spaces");
    }
    else { // if username has no whitespace

      var newUser = $(`#usernameSignup`).val();
      var newUsername = $(`#usernameSignup`).val();


      // GERNERATE SALT ========================
      function dec2hex(dec) {
        return ('0' + dec.toString(16)).substr(-2)
      }

      // generateId :: Integer -> String
      function generateId(len) {
        var arr = new Uint8Array((len || 40) / 2)
        window.crypto.getRandomValues(arr)
        return Array.from(arr, dec2hex).join('')
      }

      // create a new random 10 digit salt for the new user
      var curSalt = generateId(10);
      // ===========================================

      var curPass = $(`#userPassSignup`).val() /// get the user password
      var curHash = sha256(curPass + curSalt); // encrypt the password and salt

      var newUser = {
        name: $(`#nameSignup`).val(),
        login: $(`#usernameSignup`).val(),
        hash: curHash,
        salt: curSalt
      }

      // attempt to add new user to the database 
      // if username is unique, server will add to database
      // otherwise, show error to user
      $.post("/api/user", newUser)
        .then(function (res) {
          console.log(res);

          if (res == "true") {
            alert("User created!");
            storeUserSignup();
            window.location.replace("/products");
          }
          else {
            $(`#usernameMessage`).css("color", "red");
            $(`#usernameMessage`).html("Username already taken!");
          }


        });
    }
  }); // signupButton pressed

  $(`#loginSubmit`).on("click", function (event) {
    event.preventDefault();

    console.log("Log in Button Pressed");

    var userLogin = {
      login: $(`#usernamelogin`).val()
    }

    console.log(userLogin);

    // get salt for username attempt
    $.post("/api/salt", userLogin)
      .then(function (res) {
        if (res == "false") {
          alert("User not in database");
        }
        else {
          console.log("Salt: ",res);

           // hash password attempt with salt
          var curPass = $(`#userpasslogin`).val() /// get the user password
          var curHash = sha256(curPass + res); // encrypt the password and salt
    
          var saltyLogin = {
            login: $(`#usernamelogin`).val(),
            hash: curHash
          }

          // send salty-hash & username to server
          $.post("/api/login", saltyLogin)
          .then(function (res) {

            // use response to show error/ sucessful login
            if(res == "false"){
              // alert("Username password does not match");
              $(`#loginMessage`).html("Username/Password does not match");
              $(`#loginMessage`).css("color", "red");

            }
            else{
              // alert("You are logged in ;)");
              $(`#loginMessage`).html("You are logged in!");
              $(`#loginMessage`).css("color", "green");
              window.location.replace("/products");
              storeUserLogin();
            }
          }) // end of then
        }; // end of else

        

    })


  }); // login button pressed






}); // on page load

