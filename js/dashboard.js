var ToDoListVM = new ToDoListVM();
var WeatherListVM = new WeatherListVM();

$(document).ready(() => {
    ko.applyBindings(ToDoListVM);
    ToDoListVM.GetToDos();
    WeatherListVM.GetWeather();
});

function WeatherListVM() {
    var self = this;

    self.WeatherList = ko.observableArray([]);
    self.lat = 41.267;
    self.long = -96.001;
    
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
            weather.Min = (data.list[i].temp.min*9/5 - 459.67).toFixed(0);
            weather.Max = (data.list[i].temp.max*9/5 - 459.67).toFixed(0);

            weather.Main = data.list[i].weather[0].main;
            weather.Description = data.list[i].weather[0].description[0].toUpperCase() +            data.list[i].weather[0].description.slice(1);
            weather.Day = weekday[(d.getDay() + i)%7];

            WeatherListVM.WeatherList.push(weather);

            if(weather.Main == 'Rain'){
                $('#WeatherElement'+i).append('<div class=\'icon rainy\'><div class=\'cloud\'></div><div class=\'rain\'></div></div>');
            }else if(weather.Main == 'Clear'){
                $('#WeatherElement'+i).append('<div class=\'icon sunny\'><div class=\'sun\'><div class=\'rays\'></div></div></div>');
            }else if(weather.Main == 'Clouds'){
                $('#WeatherElement'+i).append('<div class=\'icon cloudy\'><div class=\'cloud\'></div><div class=\'cloud\'></div></div>');
            }
        }
      }
    });
}

function Weather(min, max, main, description, day) {
    var self = this;
    
    self.Min = ko.observable(min);
    self.Max = ko.observable(max);
    self.Main = ko.observable(main);
    self.Description = ko.observable(description);
    self.Day = ko.observable(day);
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
              $('#textBox').val('');
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
        var newToDo = new ToDo(null, $('#textBox').val(), false, moment().format('MMMM Do YYYY, h:mm:ss a'));
        newToDo.AddToDo();
    }
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
        console.log(e.srcElement.innerText);
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
    console.log(id);
    
    ajax('DELETE', 'https://baas.kinvey.com/appdata/kid_BJFBIVmX-/ToDo/'+id, null, (data) => {
        console.log(data);
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