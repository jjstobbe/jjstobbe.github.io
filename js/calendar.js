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
    $('.calendar ul').append('<li>Mo</li><li>Tu</li><li>We</li><li>Th</li><li>Fr</li><li>Sa</li> <li>Su</li>');
    var d = new Date(),
        currentMonth = d.getMonth() + themonth, // get this month
        days = numDays(currentMonth, d.getYear()), // get number of days in the month
        fDay = firstDay(currentMonth, d.getYear()) - 1, // find what day of the week the 1st lands on
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; // month names

    $('.calendar p.monthname').html(months[currentMonth - 1] +" &nbsp;  "+(1900 + d.getYear())); // add month name to calendar

    for (var i = 0; i < fDay - 1; i++) { // place the first day of the month in the correct position
        $('<li>&nbsp;</li>').appendTo('.calendar ul');
    }
    
    console.log(d.getDate());
    for (var i = 1; i <= days; i++) { // write out the days
        if(d.getDate() == i){
            $('<li class="selected">' + i + '</li>').appendTo('.calendar ul');
        }else {
            $('<li>' + i + '</li>').appendTo('.calendar ul');
        }
    }

    function firstDay(month, year) {
        return new Date(year, month, 1).getDay();
    }

    function numDays(month, year) {
        return new Date(year, month, 0).getDate();
    }
}