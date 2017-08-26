var ToDoListVM = new ToDoListVM();

$(document).ready(() => {
    ko.applyBindings(ToDoListVM);
    ToDoListVM.GetToDos();
    
    var clicks = 0;
    var timer = null;
    $('#ToDoList').on('click', '.ToDoElement', (e) => {
        var ToDo = ko.dataFor(e.currentTarget);
        clicks++;  //count clicks
        if(clicks == 1) {
            timer = setTimeout(function() {
                console.log('performing action - once');
                ToDo.CompleteToDo();
                clicks = 0;
            }, 1000);
        } else {
            clearTimeout(timer);
            ToDo.DeleteToDo();
            clicks = 0;
        }
    })
    .on('dblclick', function(e){
        e.preventDefault();  //cancel system double-click event
    });
    
    $('#ToDoList').on('click', '.ToDoContent', (e) => {
        e.stopPropagation();
    });
    
    Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };
    if(!Date.now) Date.now = function() { return new Date(); }
    Date.time = function() { return Date.now().getUnixTime(); }
});

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
    
    self.CompleteToDo = () => {
        var id = self.Id();
        delete self.Id;
        self.Completed(!self.Completed());
        var dataObject = ko.toJSON(self);

        // Adds the id back for later use
        self.Id = ko.observable(id);
        
        ajax('PUT', 'https://baas.kinvey.com/appdata/kid_BJFBIVmX-/ToDo/'+self.Id(), dataObject, () => {});
    };
    
    self.DeleteToDo = () => {
        ajax('DELETE', 'https://baas.kinvey.com/appdata/kid_BJFBIVmX-/ToDo/'+self.Id(), null, (data) => {
            ToDoListVM.ToDoList.remove(self);
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
    
    self.MoveToDo = (src, dest) => {
        self.ToDoList.remove((ToDo) => {
            return src.Id() == ToDo.Id();
        });
        
        self.ToDoList.splice(self.ToDoList.indexOf(dest), 0, src);
        
        for(var i = 0;i<self.ToDoList().length;i++){
            if(self.ToDoList()[i].Order != i){
                self.ToDoList()[i].Order(i);
                var dataObject = ko.toJSON(self.ToDoList()[i]);
                
                ajax('PUT', 'https://baas.kinvey.com/appdata/kid_BJFBIVmX-/ToDo/'+self.ToDoList()[i].Id(), dataObject, ()=>{});
            }
        }
        
        var cols = document.querySelectorAll('#ToDoList .ToDoElement');
        [].forEach.call(cols, addDnDHandlers);
    }
}

function sortFunction(a, b) {
    return a.Order()-b.Order();
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

function checkEdit(e) {
    if (e && e.keyCode == 13) {
        var ToDo = ko.dataFor(e.srcElement);
        ToDo.Content = e.srcElement.innerText.replace(/\r?\n|\r/g, '');

        var dataObject = ko.toJSON(ToDo);
            
        ajax('PUT', 'https://baas.kinvey.com/appdata/kid_BJFBIVmX-/ToDo/'+ToDo.Id(), dataObject, ()=>{});
        
        if ("activeElement" in document){
            document.activeElement.blur();
        }
        
        e.preventDefault();
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