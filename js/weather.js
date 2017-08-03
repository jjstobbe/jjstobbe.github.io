var WeatherListVM = new WeatherListVM();
$(document).ready(() => {
    WeatherListVM.GetWeather();
});

function Weather(id, min, max, main, description, day) {
    var self = this;
    
    self.Id = ko.observable(id);
    self.Min = ko.observable(min);
    self.Max = ko.observable(max);
    self.Main = ko.observable(main);
    self.Description = ko.observable(description);
    self.Day = ko.observable(day);
}

function WeatherListVM() {
    var self = this;

    self.WeatherList = ko.observableArray();
    self.lat = 41.267;
    self.long = -96.001;
    self.WeatherDetails = [];
    var blankObject = { summary: '' };
    self.numDays = 7;
    
    // Only show 3 if screen is small
    if($(window).width() < 650){
        self.numDays = 3;
    }
    
    for(var i = 0;i<7;i++){
        self.WeatherDetails[i] = ko.observable({summary: '', humidity: '',temperatureMin:0,temperatureMax:0,cloudCover:0,precipProbability:0, Intensity:`<embed src='.\/img\/SVG_000.svg' style="width:100%;">`});
    }
    
    self.GetWeather = () => {
        self.WeatherList.removeAll();
        
        // Gets the current location of the device
        navigator.geolocation.getCurrentPosition((position) => {
            self.lat = position.coords.latitude;
            self.long = position.coords.longitude;

            getWeather();
        });
    }
}

function getWeather(){
    $.ajax
    ({
      type: 'GET',
      url: 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast/daily?lat='+WeatherListVM.lat+'&lon='+WeatherListVM.long+'&APPID=c2a99fac19cc7ce5482b309b8ee6bcdb',
      success: (data) => {
        var d = new Date();
          var weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

        for(var i = 0;i < WeatherListVM.numDays;i++){
            var weather = new Weather();
            
            weather.Id = i;
            weather.Min = (data.list[i].temp.min*9/5 - 459.67).toFixed(0);
            weather.Max = (data.list[i].temp.max*9/5 - 459.67).toFixed(0);

            weather.Main = data.list[i].weather[0].main;
            weather.Description = data.list[i].weather[0].description[0].toUpperCase()+data.list[i].weather[0].description.slice(1);
            weather.Day = weekday[(d.getDay() + i)%7];

            WeatherListVM.WeatherList.push(weather);

            if(weather.Main == 'Rain'){
                $('#WeatherElement'+weather.Id).append('<div class=\'icon rainy\'><div class=\'cloud\'></div><div class=\'rain\'></div></div>');
                $('.WeatherDetails:eq('+weather.Id+')').addClass('rainy');
                $('#WeatherDetails'+weather.Id).append('<div class=\'icon rainy\'><div class=\'cloud\'></div><div class=\'rain\'></div></div>');
            }else if(weather.Main == 'Clear'){
                $('#WeatherElement'+weather.Id).append('<div class=\'icon sunny\'><div class=\'sun\'><div class=\'rays\'></div></div></div>');
                $('.WeatherDetails:eq('+weather.Id+')').addClass('sunny');
                $('#WeatherDetails'+weather.Id).append('<div class=\'icon sunny\'><div class=\'sun\'><div class=\'rays\'></div></div></div>');
            }else if(weather.Main == 'Clouds'){
                $('#WeatherElement'+weather.Id).append('<div class=\'icon cloudy\'><div class=\'cloud\'></div><div class=\'cloud\'></div></div>');
                $('.WeatherDetails:eq('+weather.Id+')').addClass('cloudy');
                $('#WeatherDetails'+weather.Id).append('<div class=\'icon cloudy\'><div class=\'cloud\'></div><div class=\'cloud\'></div></div>');
            }
        }
          
        $('#WeatherList .WeatherElement').on('click', (e) => {
            /* Expand out corresponding details page */
            var id = Number($($(e.currentTarget).children()[0]).attr('id').slice(-1));

            setTimeout(() => {
                $('.WeatherDetails:eq('+id+')').addClass('active');
                $('body').addClass('active');
            }, 10);
        });
          
        $(document).on('click', (e) => {
            /* Expand out corresponding details page */
            if($('.WeatherDetails').hasClass('active')){
                $('.WeatherDetails').removeClass('active');
                $('body').removeClass('active');
            }
         });
      }
    });
    
    // Gets weather details for the week
    for(i = 0;i<WeatherListVM.numDays;i++) {
        var d = new Date();
        d.setDate(d.getDate()+i);

        $.ajax({
            type: 'GET',
            dataType: 'jsonp',
            url: 'https://api.darksky.net/forecast/7d63849cadf9d0d6a5beb3ff659ca3b7/'+WeatherListVM.lat+','+WeatherListVM.long+','+Math.round(d.getTime() / 1000)+'?exclude=currently,flags,minutely',
            success: (data) => {
                var date1 = new Date();
                var date2 = new Date(data.daily.data[0].time * 1000);
                
                var millisecondsPerDay = 1000 * 60 * 60 * 24;
                var millisBetween = date2.getTime() - date1.getTime();
                var days = Math.ceil(millisBetween / millisecondsPerDay);
                var intensityString = '';
                var a = 'precipProbability';
                
                // Selects the SVG for the corresponding intensity of weather.
                for(var i = 0;i<24;i+=8){
                    var intensity = (data.hourly.data[0+i][a]+data.hourly.data[1+i][a]+data.hourly.data[2+i][a]
                      +data.hourly.data[3+i][a]+data.hourly.data[4+i][a]+data.hourly.data[5+i][a]
                      +data.hourly.data[6+i][a]+data.hourly.data[7+i][a]) / 8.0;
                    if(intensity < 0.1){
                        intensityString += '0';
                    }else{
                        intensityString += '1';
                    }
                }
                
                data.daily.data[0].Intensity = `<embed src='.\/img\/SVG_`+intensityString+`.svg' style="width:100%;">`;
                WeatherListVM.WeatherDetails[days](data.daily.data[0]);
            }
        });
    }
}