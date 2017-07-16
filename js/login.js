$(document).ready(function() {
    
    
    $("#login").on('click', function() {
        Login();
    });
});

function Login() {
    $("#LoginText").hide();
    $("#SpinContainer").show("slow");
    
    var object = new Object();
    object.username = $('#username').val();
    object.password = $('#password').val();
    var dataObject = JSON.stringify(object);
    $.ajax
    ({
      type: "POST",
      url: "https://baas.kinvey.com/user/kid_BJFBIVmX-/login",
      data: dataObject,
      headers: {
        "Authorization": "Basic " + btoa($('#username').val() + ":" + $('#password').val()),
        "Content-Type": "application/json"
      },success: function(data){
          document.cookie = "authToken="+data._kmd.authtoken;
          notifySuccess("Success", "You are authorized");
          window.location.href = "/dashboard";
      },error: function(data){
          $("#SpinContainer").hide();
          $("#LoginText").show("slow");
          notifyFailure("Failure", "Username or password is incorrect");
      }
    });
}

function checkSubmit(e) {
    if (e && e.keyCode == 13) {
        Login();
    }
}