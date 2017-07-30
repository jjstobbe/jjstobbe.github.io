var ToDoListVM = new ToDoListVM();
var WeatherListVM = new WeatherListVM();
var EventListVM = new EventListVM();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

$(document).ready(() => {
    ko.applyBindings(ToDoListVM);
    ToDoListVM.GetToDos();
    WeatherListVM.GetWeather();
    EventListVM.GetEvents();
    
    Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };
    if(!Date.now) Date.now = function() { return new Date(); }
    Date.time = function() { return Date.now().getUnixTime(); }
});

function WeatherListVM() {
    var self = this;

    self.WeatherList = ko.observableArray();
    self.lat = 41.267;
    self.long = -96.001;
    self.WeatherDetails = [];
    var blankObject = { summary: '' };
    
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

// Calls the api to get the current weather based upon the lat/long of your device
function getWeather(){
    $.ajax
    ({
      type: 'GET',
      url: 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast/daily?lat='+WeatherListVM.lat+'&lon='+WeatherListVM.long+'&APPID=c2a99fac19cc7ce5482b309b8ee6bcdb',
      success: (data) => {
        var d = new Date();
          var weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

        for(var i = 0;i < data.list.length;i++){
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
    for(i = 0;i<7;i++) {
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
                    if(intensity < 0.15){
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

function Weather(id, min, max, main, description, day) {
    var self = this;
    
    self.Id = ko.observable(id);
    self.Min = ko.observable(min);
    self.Max = ko.observable(max);
    self.Main = ko.observable(main);
    self.Description = ko.observable(description);
    self.Day = ko.observable(day);
}

function EventListVM() {
    var self = this;
    
    self.EventList = ko.observableArray([]);
    self.FilteredEvents = ko.observableArray([]);
    self.SelectedDate = ko.observable(getCalendarDate());
    
    self.GetEvents = () => {
        self.EventList.removeAll();
        
        ajax('GET', 'https://baas.kinvey.com/appdata/kid_BJFBIVmX-/Events', null, (data) => {
            for(var i = 0; i < data.length; i++){
                var event = new Event(data[i]._id, data[i].Content, data[i].Date);
                self.EventList.push(event);
                
                self.SelectedDate(getCalendarDate());
                if(data[i].Date == self.SelectedDate()){
                    self.FilteredEvents.push(event);
                }
            }
        });
    };
}

function Event(id, content, date) {
    var self = this;
    
    self.Id = ko.observable(id);
    self.Content = ko.observable(content);
    self.Date = ko.observable(date);
    
    self.AddEvent = () => {
        delete self.Id;
        var dataObject = ko.toJSON(self);
        
        ajax('POST', 'https://baas.kinvey.com/appdata/kid_BJFBIVmX-/Events', dataObject, (data) => {
            $('#eventInput').val('');
            var event = new Event(data._id, data.Content, data.Date);
            EventListVM.EventList.push(event);
            EventListVM.FilteredEvents.push(event);
        });
    };
}

function ToDoListVM() {
    var self = this;
    
    self.ToDoList = ko.observableArray([]);
    
    self.GetToDos = () => {
        self.ToDoList.removeAll();
        
        ajax('GET', 'https://baas.kinvey.com/appdata/kid_BJFBIVmX-/ToDo', null, (data) => {
            for(var i = 0; i < data.length; i++){
                self.ToDoList.push(new ToDo(data[i]._id, data[i].Content, data[i].Completed, data[i].Time, data[i].Order));
            }
            
            // Sorts the list by Order
            self.ToDoList.sort(sortFunction);
            
            var cols = document.querySelectorAll('#ToDoList .ToDoElement');
            [].forEach.call(cols, addDnDHandlers);
        });
    };
}

function sortFunction(a, b) {
    return a.Order()-b.Order();
}

function ToDo(id, content, completed, time, order) {
    var self = this;
    
    self.Id = ko.observable(id);
    self.Content = ko.observable(content);
    self.Completed = ko.observable(completed);
    self.Time = ko.observable(time);
    self.Order = ko.observable(order);
    
    self.AddToDo = () => {
        delete self.Id;
        self.Order = ToDoListVM.ToDoList().length + 1;
        var dataObject = ko.toJSON(self);
        
        ajax('POST', 'https://baas.kinvey.com/appdata/kid_BJFBIVmX-/ToDo', dataObject, (data) => {
              document.getElementById('textBox').value = '';
              ToDoListVM.ToDoList.push(new ToDo(data._id, data.Content, data.Completed, data.Time, data.Order));
              var cols = document.querySelectorAll('#ToDoList .ToDoElement');
              [].forEach.call(cols, addDnDHandlers);
        });
    };
}

function Logout() {
    ajax('POST', 'https://baas.kinvey.com/user/kid_BJFBIVmX-/_logout', null, () => {
      document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      window.location.href='/login';
    });
}

function checkSubmit(e) {
    if (e && e.keyCode == 13) {
        var d = new Date();
        var ampm = d.getHours() < 12 ? 'am' : 'pm';
        var min = d.getMinutes();
        if(min < 10){
            min = '0' + min;
        }
        var sec = d.getSeconds();
        if(sec < 10){
            sec = '0' + sec;
        }
        
        var parsedDate = ''+months[d.getMonth()]+" "+d.getDate()+""+nth(d.getDate());
        parsedDate = parsedDate + ', '+d.getHours()%12+':'+min+':'+sec+' '+ampm;
        
        var newToDo = new ToDo(null, $('#textBox').val(), false, parsedDate);
        newToDo.AddToDo();
        $('#textBox').blur();
    }
}

function checkEventSubmit(e) {
    if (e && e.keyCode == 13) {
        
        var Content = $('#eventInput').val();
        
        var newEvent = new Event(null, Content, getCalendarDate());
        newEvent.AddEvent();
        
        $('#eventInput').blur();
    }
}

function nth(d) {
  if(d>3 && d<21) return 'th'; // thanks kennebec
  switch (d % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
    }
}

function minTwoDigits(n) {
  return (n < 10 ? '0' : '') + n;
}
        
function getCalendarDate() {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    var MonthYear = $('.monthname').html();
    var Month = MonthYear.substring(0, MonthYear.indexOf(' '));
    var Year = MonthYear.substring(MonthYear.lastIndexOf(' ')+1);
    return (minTwoDigits(months.indexOf(Month)+1)+'/'+$('.selected').html()+'/'+Year);
}

function moveToDo(dragId, baseId) {
    var counter = 1;
    $('.ToDoElement').each(function() {
        var self = this;
        var id = $(this).children().children()[0].id;
        
        if(self.id != counter){
            var position = counter;
            ajax('GET', 'https://baas.kinvey.com/appdata/kid_BJFBIVmX-/ToDo/'+id, null, (data) => {
                  var changedToDo = {
                      Content: data.Content,
                      Completed: data.Completed,
                      Time: data.Time,
                      Order: position
                  }
                  var dataObject = ko.toJSON(changedToDo);
                  ajax('PUT', 'https://baas.kinvey.com/appdata/kid_BJFBIVmX-/ToDo/'+id, dataObject, ()=>{});
            });
        }
        counter+=1;
    });
}

function checkEdit(e) {
    if (e && e.keyCode == 13) {
        var id = e.srcElement.id;
        var newContent = e.srcElement.innerText.replace(/\r?\n|\r/g, '');
        $('#'+id).blur();
        
        ajax('GET', 'https://baas.kinvey.com/appdata/kid_BJFBIVmX-/ToDo/'+id, null, 
        (data) => {
              var changedToDo = {
                  Content: newContent,
                  Completed: data.Completed,
                  Time: data.Time,
                  Order: data.Order
              }
              var dataObject = ko.toJSON(changedToDo);
            
            ajax('PUT', 'https://baas.kinvey.com/appdata/kid_BJFBIVmX-/ToDo/'+id, dataObject, ()=>{});
        });
    }
}

function finishToDo() {
    var self = this;
    
    var id = self.Id();
    delete self.Id;
    self.Completed(!self.Completed());

    var dataObject = ko.toJSON(self);
    
    // Adds the id back for later use
    self.Id = ko.observable(id);
    
    ajax('PUT', 'https://baas.kinvey.com/appdata/kid_BJFBIVmX-/ToDo/'+id, dataObject,() => {});
}

function deleteToDo() {    
    var self = this;
    
    var id = self.Id();
    
    ajax('DELETE', 'https://baas.kinvey.com/appdata/kid_BJFBIVmX-/ToDo/'+id, null, (data) => {
        ToDoListVM.ToDoList.remove((Todo) => {
            return self.Id() == Todo.Id();
        });
    });
}

/* Generic AJAX call to edit the database */
function ajax(type, url, data, successFunction) {
    $.ajax
    ({
      type: type,
      url: url,
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      data: data,
      headers: {
        "Authorization": 'Kinvey ' + document.cookie.substring(document.cookie.indexOf('=')+1),
          "X-Kinvey-API-Version": '3',
          
      },success: (data) => {
          successFunction(data);
      },error: (data) => {
          if(data.status == 400){
              window.location.href = 'login';
          }
      }
    });
}