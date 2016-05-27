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


/*Quotes*/
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
                "Failure is success if we learn from it."];

    var numQuote = Math.floor(Math.random()*13);
    $('#Quote').append("<h3>"+quotes[numQuote]+"</h3>");
});
