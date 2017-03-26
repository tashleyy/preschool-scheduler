function addStudent() {
    var name = $('#add-student-name').val();
    var birthday = $('#add-student-birth-date').val();
    var parent1 = $('#add-student-parent-name-1').val();
    var parent2 = $('#add-student-parent-name-2').val();
    var parentPhone1 = $('#add-student-parent-phone-1').val();
    var parentPhone2 = $('#add-student-parent-phone-2').val();
    var physician = $('#add-student-physician-name').val();
    var physicianPhone = $('#add-student-physician-phone').val();
    var startDate = $('#add-student-start-date').val();
    var endDate = $('#add-student-end-date').val();
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
            endDate: endDate
        },
        success: function(data) {
            document.location.href = 'students';
            console.log('data: ' + data);
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}