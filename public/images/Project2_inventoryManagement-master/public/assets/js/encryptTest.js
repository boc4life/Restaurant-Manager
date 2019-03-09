// on page load...
$(document).ready(() => {
    var curPass = "";
    var curHash = "";
    var curSalt = "";

    $("#encrypt").on("click", function () {

        // get the current password
        curPass = $("#enterpass").val();

        console.log("Current Password: ", curPass);

        $("#userpass").text(curPass);

        //  GERNERATE SALT ========================
        function dec2hex (dec) {
            return ('0' + dec.toString(16)).substr(-2)
          }

        // generateId :: Integer -> String
        function generateId(len) {
            var arr = new Uint8Array((len || 40) / 2)
            window.crypto.getRandomValues(arr)
            return Array.from(arr, dec2hex).join('')
        }

        curSalt = generateId(10);
        // ===========================================
        
        $("#salt").text(curSalt);
        console.log("current salt: ",curSalt);

        // encrypt our password 
        curHash = sha256(curPass + curSalt);

        // show hash
        console.log("Hash: ", curHash);
        $("#encryptpass").text(curHash);
    });

    $("#confirm").on("click", function () {


        passCheck = $("#confirmPass").val();

        checkHash = sha256(passCheck + curSalt);
        console.log("Hash: ", checkHash);
        $("#passCheckStatus").text(curHash == checkHash ? "Same Passwords. Good Job!" : "Passwords not identical. Fix it! Fool.");
    });





});