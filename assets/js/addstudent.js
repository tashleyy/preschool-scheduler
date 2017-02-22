function addStudent() {
    var name = $('#add-student-name').val();
    var birthday = $('#add-student-birth-date').val();
    var parent1 = $('#add-parent-name1').val();
    var parent2 = $('#add-parent-name2').val();
    var parentPhone1 = $('#add-parent-phone1').val();
    var parentPhone2 = $('#add-parent-phone2').val();
    var physician = $('#add-physician-name').val();
    var physicianPhone = $('#add-physician-phone').val();
    var startDate = $('#add-student-start-day').val();
    var endDate = $('#add-student-end-day').val();
    var rs = $('#add-student-rate-schedules').val();
    $.ajax({
        url: '/student/create',
        type: 'post',
        data: {
            name: name,
            birthday: birthday,
            parent1: parent1,
            parent2: parent2,
            parentPhone1: parentPhone1,
            parentPhone2: parentPhone2,
            physician: physician,
            physicianPhone: physicianPhone,
            startDate: startDate,
            endDate: endDate,
            rsId: rs
        },
        success: function(data) {
            document.location.href = 'students';
            console.log('data: ' + data);
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
    return false;
}

function displayRateScheduleOptions() {
    $.ajax({
        url: '/rateschedule/find',
        type: 'get',
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                var rs = data[i];
                var optionHtml = '<option ';
                optionHtml += 'value="' + rs.id + '">' + rs.name + '</option>';
                $('#add-student-rate-schedules').append(optionHtml);
            }
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}

function getDays() {
    var rateDrop = $('#add-student-rate-schedules');
    //var selectedText = rateDrop.val().text(); 
    for (var i = 0; i < rateDrop.options.length; i++) {
        if (rateDrop.options[i].selected== true) {
            var selectedText = rateDrop.options[i].text();
            console.log(selectedText);
        }
    }

    $.ajax({
        url: '/rateschedule/findOne',
        type: 'get',
        data: {
            name: selectedText
        },
        success: function(data) {
            var rs = data[0];
            populateWithString(rs.monday, $('#optionsMonday'));
            
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}

function populateWithString(day, radioButton)
{
    var NONE_INDEX = 0;
    var AM_INDEX = 1;
    var PM_INDEX = 2;
    var FULL_INDEX = 3;

    for (var i=0, numButtons=radioButton.length; i<numButtons; i++) {
        radioButton[i].disabled = true;
    }

    if (day == 'full')
    {
        radioButton[FULL_INDEX].disabled = false;
        radioButton[FULL_INDEX].selected = true;
    } 
    else if (day == 'half')
    {
        radioButton[AM_INDEX].disabled = false;
        radioButton[PM_INDEX].disabled = false;
        radioButton[AM_INDEX].selected = true;
    }
    else if (day == 'none')
    {
        radioButton[NONE_INDEX].disabled = false;
        radioButton[NONE_INDEX].selected = true;
    }
} 

$(document).ready(displayRateScheduleOptions);