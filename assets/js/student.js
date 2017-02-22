function fillInStudentInformation(){
    $.ajax({
        url: '/student/find',
        type: 'get',
        success: function(data) {
            var rs = data;
            // Construct HTML string of table row
            var rowHtml = '<tr><td>' + "Birthday" + '<tr><td>' + "bday";
            $('#student-info-table tbody').append(rowHtml);
            rowHtml = '<tr><td>' + "Address" + '<tr><td>' + "address";
            $('#student-info-table tbody').append(rowHtml);
            rowHtml = '<tr><td>' + "Parent/Guardian Names" + '<tr><td>' + "hi";
            $('#student-info-table tbody').append(rowHtml);
            rowHtml = '<tr><td>' + "Parent/Guardian Phone Number" + '<tr><td>' + rs.phone;
            $('#student-info-table tbody').append(rowHtml);
            rowHtml = '<tr><td>' + "Physician Name" + '<tr><td>' + "doctor";
            $('#student-info-table tbody').append(rowHtml);
            rowHtml = '<tr><td>' + "Physician Phone Number" + '<tr><td>' + "111111";
            $('#student-info-table tbody').append(rowHtml);
            rowHtml = '<tr><td>' + "Rate Schedule" + '<tr><td>' + rs.rateSchedule;
            $('#student-info-table tbody').append(rowHtml);
            rowHtml = '<tr><td>' + "Date Enrolled" + '<tr><td>' + "today";
            $('#student-info-table tbody').append(rowHtml);
            rowHtml = '<tr><td>' + "Date Left" + '<tr><td>' + "tomorrow";
            $('#student-info-table tbody').append(rowHtml);
            
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}
  