$(document).ready(function() {
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
});

function renderCal(themonth) {
    $('.calendar li').remove();
    $('.calendar ul').append('<li>Mo</li><li>Tu</li><li>We</li><li>Th</li><li>Fr</li><li>Sa</li><li>Su</li>');
    var d = new Date(),
        currentMonth = mod((d.getMonth() + themonth-1),12),
        currentYear = (1900 + d.getYear() + Math.floor((d.getMonth()+themonth - 1)/12)),// get this year
        days = numDays(currentMonth, currentYear), // get number of days in the month
        fDay = firstDay(currentMonth, currentYear), // find what day of the week the 1st lands on
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; // month names
    
    $('.calendar p.monthname').html(months[currentMonth] +" &nbsp;  "+currentYear); // add month name to calendar

    for (var i = 0; i < fDay - 1; i++) { // place the first day of the month in the correct position
        $('<li>&nbsp;</li>').appendTo('.calendar ul');
    }
    
    for (var i = 1; i <= days; i++) { // write out the days
        // Adds a 'selected' class to the current day
        if(themonth == 1 && d.getDate() == i && 1900+d.getYear() == currentYear){
            $('<li class="selected">' + i + '</li>').appendTo('.calendar ul');
        }else {
            $('<li>' + i + '</li>').appendTo('.calendar ul');
        }
    }
    
    $('.group li').on('click', function(){
        $('.selected').removeClass('selected');
        $(this).addClass('selected');
        
        EventListVM.FilteredEvents.removeAll();
        EventListVM.SelectedDate(getCalendarDate());
        for(var i = 0;i<EventListVM.EventList().length;i++){
            if(EventListVM.EventList()[i].Date() == EventListVM.SelectedDate()){
                EventListVM.FilteredEvents.push(EventListVM.EventList()[i]);
            }
        }
        
    });

    function firstDay(month, year) {
        return new Date(year, month, 1).getDay();
    }

    function numDays(month, year) {
        return new Date(year, month+1, 0).getDate();
    }
    
    function mod(n, m) {
        return ((n % m) + m) % m;
    }
}