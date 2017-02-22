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
    var monday = $('input[name="optionsMonday"]:checked').val();
    var tuesday = $('input[name="optionsTuesday"]:checked').val();
    var wednesday = $('input[name="optionsWednesday"]:checked').val();
    var thursday = $('input[name="optionsThursday"]:checked').val();
    var friday = $('input[name="optionsFriday"]:checked').val();
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
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
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
    var id = rateDrop.val(); 

    $.ajax({
        url: '/rateschedule/findone',
        type: 'get',
        data: {
            id: id
        },
        success: function(data) {
            var rs = data;
            populateWithString(rs.monday, $('input[name="optionsMonday"]'));
            populateWithString(rs.tuesday, $('input[name="optionsTuesday"]'));
            populateWithString(rs.wednesday, $('input[name="optionsWednesday"]'));
            populateWithString(rs.thursday, $('input[name="optionsThursday"]'));
            populateWithString(rs.friday, $('input[name="optionsFriday"]'));
            
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
        radioButton.filter('[value=full]').prop('checked', true);
    } 
    else if (day == 'half')
    {
        radioButton[AM_INDEX].disabled = false;
        radioButton[PM_INDEX].disabled = false;
        radioButton.filter('[value=am]').prop('checked', true);
    }
    else if (day == 'none')
    {
        radioButton[NONE_INDEX].disabled = false;
        radioButton.filter('[value=none]').prop('checked', true);
    }
} 

$(document).ready(displayRateScheduleOptions);