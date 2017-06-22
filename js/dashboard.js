var ToDoListVM = new ToDoListVM();

$(document).ready(function() {
    ko.applyBindings(ToDoListVM);
    ToDoListVM.GetToDos();
});

function ToDoListVM() {
    var self = this;
    
    self.ToDoList = ko.observableArray();
    
    self.GetToDos = function() {
        self.ToDoList.removeAll();
        
        GetToDos(function(data) {
            $.each(data, function(index, value){
                self.ToDoList.push(new ToDo(value._id, value.Content, value.Completed, value.Time));
            });
            
            $("#toDoTable").DataTable( { "bStateSave": true } );
            
            // Hides bottom content of data table
        });
    };
};

function ToDo(id, content, completed, time) {
    var self = this;
    
    self.Id = ko.observable(id);
    self.Content = ko.observable(content);
    self.Completed = ko.observable(completed);
    self.Time = ko.observable(time);
    
    self.AddToDo = function() {
        delete self.Id;
        var dataObject = ko.toJSON(self);
        
        $.ajax
        ({
          type: "POST",
          url: "https://baas.kinvey.com/appdata/kid_BJFBIVmX-/ToDo",
          contentType: 'application/json; charset=utf-8',
          data: dataObject,
          headers: {
            "Authorization": "Kinvey " + document.cookie.substring(document.cookie.indexOf("=")+1),
              "X-Kinvey-API-Version": "3"
          },success: function(data){
              $("#textBox").val("");
              ToDoListVM.ToDoList.push(new ToDo(data._id, data.Content, data.Completed, data.Time));
              notifySuccess("Success", "Task has been added");
          },error: function(data){
              // Redirects if authentication fails
              window.location.href = "/login"
          }
        });
    };
};

function GetToDos(handleData) {
    // Makes API call to get the list of ToDos
    $.ajax
    ({
      type: "GET",
      url: "https://baas.kinvey.com/appdata/kid_BJFBIVmX-/ToDo",
      dataType: 'json',
      headers: {
        "Authorization": "Kinvey " + document.cookie.substring(document.cookie.indexOf("=")+1)
      },success: function(data){
          handleData(data);
      },error: function(data){
          // Redirects if authentication fails
          window.location.href = "/login"
      }
    });
}

function Logout() {
    $.ajax
    ({
      type: "POST",
      url: "https://baas.kinvey.com/user/kid_BJFBIVmX-/_logout",
      headers: {
        "Authorization": "Kinvey " + document.cookie.substring(document.cookie.indexOf("=")+1)
      },success: function(data){
          document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
          window.location.href="/login";
      }
    });
}

function checkSubmit(e) {
    if (e && e.keyCode == 13) {
        var newToDo = new ToDo(null, $("#textBox").val(), false, moment().format('MMMM Do YYYY, h:mm:ss a'));
        newToDo.AddToDo();
    }
}

function checkEdit(e) {
    if (e && e.keyCode == 13) {
        var id = e.srcElement.id;
        var newContent = e.srcElement.innerText.replace(/\r?\n|\r/g, '');
        $("#"+id).blur();
        
        $.ajax
        ({
          type: "GET",
          url: "https://baas.kinvey.com/appdata/kid_BJFBIVmX-/ToDo/"+id,
          dataType: 'json',
          headers: {
            "Authorization": "Kinvey " + document.cookie.substring(document.cookie.indexOf("=")+1)
          },success: function(data){
              var changedToDo = {
                  Content: newContent,
                  Completed: data.Completed,
                  Time: data.Time
              }
              
              var dataObject = ko.toJSON(changedToDo);
              
              $.ajax
                ({
                  type: "PUT",
                  url: "https://baas.kinvey.com/appdata/kid_BJFBIVmX-/ToDo/"+id,
                  contentType: 'application/json; charset=utf-8',
                  data: dataObject,
                  headers: {
                    "Authorization": "Kinvey " + document.cookie.substring(document.cookie.indexOf("=")+1),
                      "X-Kinvey-API-Version": "3"
                  },success: function(data){
                      notifySuccess("Success", "Task has been updated");
                  },error: function(data){
                      // Redirects if authentication fails
                      window.location.href = "/login"
                  }
                });
          },error: function(data){
              // Redirects if authentication fails
              window.location.href = "/login"
          }
        });
    }
}

function removeToDo() {
    var self = this;
    
    var id = self.Id();
    delete self.Id;
    self.Completed(true);

    var dataObject = ko.toJSON(self);
    console.log(self);
    console.log(dataObject);
    
    $.ajax
    ({
      type: "PUT",
      url: "https://baas.kinvey.com/appdata/kid_BJFBIVmX-/ToDo/"+id,
      contentType: 'application/json; charset=utf-8',
      data: dataObject,
      headers: {
        "Authorization": "Kinvey " + document.cookie.substring(document.cookie.indexOf("=")+1),
          "X-Kinvey-API-Version": "3"
      },success: function(data){
          notifySuccess("Success", "Task Completed");
      },error: function(data){
          // Redirects if authentication fails
          window.location.href = "/login.html"
      }
    });
}







