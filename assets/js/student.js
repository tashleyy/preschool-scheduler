function populateAfterSchoolActivities() {
    $.ajax({
        url: '/student/findone',
        type: 'get',
        data: {
            id: document.location.pathname.substring(document.location.pathname.lastIndexOf('/')+1)
        },
        success: function(data) {
            var asas = ['', '', '', '', ''];
            var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
            for (var i = 0; i < data.afterSchoolActivities.length; i++) {
                var asa = data.afterSchoolActivities[i];
                for (var j = 0; j < 5; j++) {
                    if (asa[days[j]]) {
                        asas[j] += asa.name + ', ';
                    }
                }
            }
            for (var i = 0; i < asas.length; i++) {
                if (asas[i].length > 0) {
                    asas[i] = asas[i].substring(0, asas[i].length-2);
                }
                $('#asa-' + days[i] + '-row .asa-table-cell').html(asas[i]);
            }
        },
        error: function(xhr, status, error) {
            console.log('error: ' + error);
        }
    });
}

$(document).ready(populateAfterSchoolActivities);