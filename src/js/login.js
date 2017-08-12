$(document).ready(function() {
    $("#login").on('click', function() {
        Login();
    });
});

function Login() {
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
          window.location.href = "/dashboard";
      }
    });
}

function checkSubmit(e) {
    if (e && e.keyCode == 13) {
        Login();
    }
}