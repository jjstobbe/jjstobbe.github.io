var EventListVM = new EventListVM();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

$(document).ready(function() {
    EventListVM.GetEvents();
    
    var themonth = 1;
    renderCal(themonth);
    
    $('.minusmonth').click(function () {
        themonth += -1;
        renderCal(themonth);
    });

    $('.addmonth').click(function () {
        themonth += 1;
        renderCal(themonth);
    });
    

    $('#eventList').on('dblclick', 'li', (e) => {
        var event = ko.dataFor(e.currentTarget);
        event.DeleteEvent();
    });
});

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
    
    self.DeleteEvent = () => {
        ajax('DELETE', 'https://baas.kinvey.com/appdata/kid_BJFBIVmX-/Events/'+self.Id(), null, (data) => {
            EventListVM.EventList.remove(self);
            EventListVM.FilteredEvents.remove(self);
        });
    };
}

function EventListVM() {
    var self = this;
    
    self.EventList = ko.observableArray([]);
    self.FilteredEvents = ko.observableArray([]);
    self.SelectedDate = ko.observable(getCalendarDate());
    self.SelectedDay = ko.observable('Monday');
    
    self.SelectedDate.subscribe((newDate) => {
        var d = new Date(newDate);
        self.SelectedDay(days[d.getDay()]);
    });
    
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

function checkEventEdit(e) {
    if (e && e.keyCode == 13) {
        var Event = ko.dataFor(e.srcElement);
        Event.Content = e.srcElement.innerText.replace(/\r?\n|\r/g, '');

        var dataObject = ko.toJSON(Event);
        
        ajax('PUT', 'https://baas.kinvey.com/appdata/kid_BJFBIVmX-/Events/'+Event.Id(), dataObject, ()=>{});
        
        if ("activeElement" in document){
            document.activeElement.blur();
        }
        
        e.preventDefault();
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

function renderCal(themonth) {
    $('.calendar li').remove();
    $('.calendar ul').append('<li>Mo</li><li>Tu</li><li>We</li><li>Th</li><li>Fr</li><li>Sa</li><li>Su</li>');
    var d = new Date(),
        currentMonth = mod((d.getMonth() + themonth-1),12),
        currentYear = (1900 + d.getYear() + Math.floor((d.getMonth()+themonth - 1)/12)),// get this year
        days = numDays(currentMonth, currentYear), // get number of days in the month
        fDay = firstDay(currentMonth, currentYear), // find what day of the week the 1st lands on
        lDay = lastDay(currentMonth, currentYear), // find what day of the week the 1st lands on
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; // month names
    
    $('.calendar p.monthname').html(months[currentMonth] +" &nbsp;  "+currentYear); // add month name to calendar

    var thePrevMonth = themonth - 1;
    var prevMonth = mod((d.getMonth() + thePrevMonth-1), 12);
    var prevYear = (1900 + d.getYear() + Math.floor((d.getMonth()+thePrevMonth - 1)/12));
    
    for (var i = fDay - 1; i >= 0 ; i--) { // place the first day of the month in the correct position
        $('<li class="notCurrentDate">'+(numDays(prevMonth, prevYear) -  i)+'</li>').appendTo('.calendar ul');
    }
    
    for (var i = 1; i <= days; i++) { // write out the days
        // Adds a 'selected' class to the current day
        if(themonth == 1 && d.getDate() == i && 1900+d.getYear() == currentYear){
            $('<li class="selected">' + i + '</li>').appendTo('.calendar ul');
        }else {
            $('<li>' + i + '</li>').appendTo('.calendar ul');
        }
    }
    
    for (var i = 1; i < 7 - (lDay+1) + 1; i++) { // place the first day of the month in the correct position
        $('<li class="notCurrentDate">'+i+'</li>').appendTo('.calendar ul');
    }
    
    $('.group li:gt(7)').on('click', function(){
        if(!$(this).hasClass('notCurrentDate')){
            $('.selected').removeClass('selected');
            $(this).addClass('selected');

            EventListVM.FilteredEvents.removeAll();
            EventListVM.SelectedDate(getCalendarDate());
            for(var i = 0;i<EventListVM.EventList().length;i++){
                if(EventListVM.EventList()[i].Date() == EventListVM.SelectedDate()){
                    EventListVM.FilteredEvents.push(EventListVM.EventList()[i]);
                }
            }
        }
    });

    function firstDay(month, year) {
        return new Date(year, month, 1).getDay();
    }
    
    function lastDay(month, year) {
        return new Date(year, month+1, 0).getDay();
    }

    function numDays(month, year) {
        return new Date(year, month+1, 0).getDate();
    }
    
    function mod(n, m) {
        return ((n % m) + m) % m;
    }
}

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