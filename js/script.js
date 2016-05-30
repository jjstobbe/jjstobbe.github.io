$(window).load(function() {
     /*Once the page is completely loaded, the loading gif fades in 500ms (.5 seconds)*/
     $('#loading').fadeOut(500);
});

$(document).ready(function() {

  var currentTime = new Date()
  var hours = currentTime.getHours()
  if(hours > 12){
    $('#Greeting').html('<h1><span>Good afternoon, Jack</span><h1>');
  }else{
    $('#Greeting').html('<h1><span>Good morning, Jack</span><h1>');
  }
})

/*Weather Settings*/
$(document).ready(function() {
  $.simpleWeather({
    location: 'Omaha, NE',
    woeid: '',
    unit: 'f',
    success: function(weather) {
      html = '<h2><i class="weathericon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
      html += '<li class="currently">'+weather.currently+'</li>';
      html += '<li>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';

      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
});


/*Gets a motivational quote!*/
$(document).ready(function() {
    var quotes = ["It is amazing what you can accomplish if you do not care who gets the credit.",
                "I can accept failure, everyone fails at something. But I can't accept not trying.",
                "Failure is the key to success; each mistake teaches us something.",
                "The best way to predict the future is to create it.",
                "In order to succeed we must first believe that we can.",
                "You make mistakes. Mistakes don't make you.",
                "Failure is not fatal, but failure to change might be.",
                "Success is getting what you want. Happiness is wanting what you get.",
                "Success is nothing more than a few simple disciplines, practiced every day.",
                "I have not failed. I've just found 10,000 ways that won't work.",
                "Success is the ability to go from failure to failure without losing your enthusiasm.",
                "Life isn't about waiting for the storm to pass... It's about learning to dance in the rain.",
                "In order to succeed, your desire for success should be greater than your fear of failure.",
                "Failure is success if we learn from it.",
                "Become the person you want to be.",
                "Fear is self imposed.",
                "Fear will either create you or destroy you.",
                "You want something? Go get it."];

    /*Gets a random quote from this array*/
    var numQuote = Math.floor(Math.random()*13);
    $('#Quote').append("<h3>"+quotes[numQuote]+"</h3>");
});

/*An attempt at a toDo list - Not quite functioning as I want*/
$(document).ready(function() {
  $("#ToDoList").keyup(function (e) {
    if (e.keyCode == 13) {
        alert("Ya perssed enter");
    }
  });
});
