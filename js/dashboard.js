var ToDoListVM = new ToDoListVM();
var WeatherListVM = new WeatherListVM();
var weatherCounter = 100;

$(document).ready(function() {
    ko.applyBindings(ToDoListVM);
    ToDoListVM.GetToDos();
    WeatherListVM.GetWeather();
});

function WeatherListVM() {
    var self = this;
    
    self.WeatherList = ko.observableArray([]);
    
    self.GetWeather = function() {
        self.WeatherList.removeAll();
        
        $.ajax
        ({
          type: "GET",
          url: "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast/daily?zip=68132&APPID=c2a99fac19cc7ce5482b309b8ee6bcdb",
          success: function(data){
            var d = new Date();
              var weekday = new Array(7);
              weekday[0] = "Sunday";
              weekday[1] = "Monday";
              weekday[2] = "Tuesday";
              weekday[3] = "Wednesday";
              weekday[4] = "Thursday";
              weekday[5] = "Friday";
              weekday[6] = "Saturday";
              
            for(var i = 0;i < data.list.length;i++){
                var weather = new Weather();
                weather.Min = (data.list[i].temp.min*9/5 - 459.67).toFixed(0);
                weather.Max = (data.list[i].temp.max*9/5 - 459.67).toFixed(0);
                
                weather.Main = data.list[i].weather[0].main;
                weather.Description = data.list[i].weather[0].description[0].toUpperCase() +            data.list[i].weather[0].description.slice(1);
                weather.Day = weekday[(d.getDay() + i)%7];
                                
                self.WeatherList.push(weather);
                
                if(weather.Main == 'Rain'){
                    $('#'+(100+i)).append("<div class=\"icon rainy\"><div class=\"cloud\"></div><div class=\"rain\"></div></div>");
                }else if(weather.Main == 'Clear'){
                    $('#'+(100+i)).append("<div class=\"icon sunny\"><div class=\"sun\"><div class=\"rays\"></div></div></div>");
                }else if(weather.Main == 'Clouds'){
                    $('#'+(100+i)).append("<div class=\"icon cloudy\"><div class=\"cloud\"></div><div class=\"cloud\"></div></div>");
                }
            }
          }
        });
    };
}

function Weather(min, max, main, description, day){
    var self = this;
    
    self.Min = ko.observable(min);
    self.Max = ko.observable(max);
    self.Main = ko.observable(main);
    self.Description = ko.observable(description);
    self.Id = ko.observable(weatherCounter);
    self.Day = ko.observable(day);
    weatherCounter += 1;
}

function ToDoListVM() {
    var self = this;
    
    self.ToDoList = ko.observableArray([]);
    
    self.GetToDos = function() {
        self.ToDoList.removeAll();
        
        ajax("GET", "https://baas.kinvey.com/appdata/kid_BJFBIVmX-/ToDo", null, function(data) {
            $.each(data, function(index, value){
                self.ToDoList.push(new ToDo(value._id, value.Content, value.Completed, value.Time, value.Order));
            });
            
            // Sorts the list by Order
            self.ToDoList.sort(sortFunction);
            
            var cols = document.querySelectorAll('#ToDoList .ToDoElement');
            [].forEach.call(cols, addDnDHandlers);
        });
    };
};

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
    
    self.AddToDo = function() {
        delete self.Id;
        self.Order = ToDoListVM.ToDoList().length + 1;
        var dataObject = ko.toJSON(self);
        
        ajax("POST", "https://baas.kinvey.com/appdata/kid_BJFBIVmX-/ToDo", dataObject, function(data){
              $("#textBox").val("");
              ToDoListVM.ToDoList.push(new ToDo(data._id, data.Content, data.Completed, data.Time, data.Order));
              var cols = document.querySelectorAll('#ToDoList .ToDoElement');
              [].forEach.call(cols, addDnDHandlers);
        });
    };
};

function Logout() {
    ajax("POST", "https://baas.kinvey.com/user/kid_BJFBIVmX-/_logout", null, function() {
      document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      window.location.href="/login";
    });
}

function checkSubmit(e) {
    if (e && e.keyCode == 13) {
        var newToDo = new ToDo(null, $("#textBox").val(), false, moment().format('MMMM Do YYYY, h:mm:ss a'));
        newToDo.AddToDo();
    }
}

function moveToDo(dragId, baseId){
    var counter = 1;
    $('.ToDoElement').each(function() {
        var self = this;
        var id = $(this).children().children()[0].id;
        
        if(self.id != counter){
            var position = counter;
            ajax("GET", "https://baas.kinvey.com/appdata/kid_BJFBIVmX-/ToDo/"+id, null, function(data) {
                  var changedToDo = {
                      Content: data.Content,
                      Completed: data.Completed,
                      Time: data.Time,
                      Order: position
                  }
                  var dataObject = ko.toJSON(changedToDo);
                  ajax("PUT", "https://baas.kinvey.com/appdata/kid_BJFBIVmX-/ToDo/"+id, dataObject, function(){});
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
        $("#"+id).blur();
        
        ajax("GET", "https://baas.kinvey.com/appdata/kid_BJFBIVmX-/ToDo/"+id, null, 
        function(data){
              var changedToDo = {
                  Content: newContent,
                  Completed: data.Completed,
                  Time: data.Time,
                  Order: data.Order
              }
              var dataObject = ko.toJSON(changedToDo);
            
            ajax("PUT", "https://baas.kinvey.com/appdata/kid_BJFBIVmX-/ToDo/"+id, dataObject, function(data){
                  notifySuccess("Success", "Task has been updated");
             });
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
    
    ajax("PUT", "https://baas.kinvey.com/appdata/kid_BJFBIVmX-/ToDo/"+id, dataObject, function(data){
        notifySuccess("Success", "Task Completed");
    });
}

function deleteToDo() {    
    var self = this;
    
    var id = self.Id();
    
    ajax("DELETE", "https://baas.kinvey.com/appdata/kid_BJFBIVmX-/ToDo/"+id, null, function(data){
        location.reload();
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
        "Authorization": "Kinvey " + document.cookie.substring(document.cookie.indexOf("=")+1),
          "X-Kinvey-API-Version": "3",
          
      },success: function(data){
          successFunction(data);
      },error: function(data){
          console.error(data);
          window.location.href="login";
      }
    });
}