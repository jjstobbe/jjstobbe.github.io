var ToDoListVM = new ToDoListVM();

$(document).ready(function() {
    ko.applyBindings(ToDoListVM);
    ToDoListVM.GetToDos();
});

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
        var id = $(this).children()[0].id;
        if(self.id != counter){
            var position = counter;
            ajax("GET", "https://baas.kinvey.com/appdata/kid_BJFBIVmX-/ToDo/"+id, null,           function(data) {
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
          "X-Kinvey-API-Version": "3"
      },success: function(data){
          successFunction(data);
      },error: function(data){
          window.location.href = "/login.html"
      }
    });
}