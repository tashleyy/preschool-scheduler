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

$(document).ready(displayRateScheduleOptions);