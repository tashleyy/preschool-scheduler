function fillInStudentInformation(name){
    $.ajax({
        url: '/student/find',
        type: 'get',
        success: function(data) {

            for (var i = 0; i < data.length; i++) {
                if(data[i].name == name){
                    var rs = data[i];
                    break;
                }
            }
            // Construct HTML string of table row
            var rowHtml = '<tr><td>' + "Birthday" + '<tr><td>' + rs.birthday;
            $('#student-info-table tbody').append(rowHtml);
            rowHtml = '<tr><td>' + "Address" + '<tr><td>' + "address";
            $('#student-info-table tbody').append(rowHtml);
            rowHtml = '<tr><td>' + "Parent/Guardian Names" + '<tr><td>' + rs.parent1;
            $('#student-info-table tbody').append(rowHtml);
            rowHtml = '<tr><td>' + "Parent/Guardian Phone Number" + '<tr><td>' + rs.phone;
            $('#student-info-table tbody').append(rowHtml);
            rowHtml = '<tr><td>' + "Physician Name" + '<tr><td>' + rs.physician;
            $('#student-info-table tbody').append(rowHtml);
            rowHtml = '<tr><td>' + "Physician Phone Number" + '<tr><td>' + rs.physicianPhone;
            $('#student-info-table tbody').append(rowHtml);
            rowHtml = '<tr><td>' + "Rate Schedule" + '<tr><td>' + rs.rateSchedule;
            $('#student-info-table tbody').append(rowHtml);
            rowHtml = '<tr><td>' + "Date Enrolled" + '<tr><td>' + rs.startDate;
            $('#student-info-table tbody').append(rowHtml);
            rowHtml = '<tr><td>' + "Date Left" + '<tr><td>' + rs.endDate;
            $('#student-info-table tbody').append(rowHtml);
            
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}
  