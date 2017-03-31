// eslint-disable-next-line no-unused-vars
function showStudentEditModal(id) {
  $.ajax({
    url: '/student/findone',
    type: 'get',
    data: {
      id,
    },
    success(data) {
      const rs = [];
      const asa = [];
      if (data.rateSchedules) {
        for (let i = 0; i < data.rateSchedules.length; i++) {
          rs.push(data.rateSchedules[i].id);
        }
      }
      if (data.afterSchoolActivities) {
        for (let i = 0; i < data.afterSchoolActivities.length; i++) {
          asa.push(data.afterSchoolActivities[i].id);
        }
      }
      $('#edit-student-name').val(data.name);
      $('#edit-student-birthday').val(data.birthday);
      $('#edit-student-parent-1').val(data.parent1);
      $('#edit-student-parent-2').val(data.parent2);
      $('#edit-student-parent-phone-1').val(data.parentPhone1);
      $('#edit-student-parent-phone-2').val(data.parentPhone2);
      $('#edit-student-physician').val(data.physician);
      $('#edit-student-physician-phone').val(data.physicianPhone);

      $('#student-edit-modal').attr('studentId', id);
      $('#student-edit-modal').modal('show');
    },
    error(xhr, status, error) {
      console.log(`error: ${error}`);
    },
  });
  return false;
}

// eslint-disable-next-line no-unused-vars
function showStudentDeleteModal(id) {
  $('#student-delete-modal').attr('studentId', id);
  $('#student-delete-modal').modal('show');
  return false;
}

// eslint-disable-next-line no-unused-vars
function editStudent() {
  const id = $('#student-edit-modal').attr('studentId');
  const name = $('#edit-student-name').val();
  const birthday = $('#edit-student-birthday').val();
  const parent1 = $('#edit-student-parent-1').val();
  const parent2 = $('#edit-student-parent-2').val();
  const parentPhone1 = $('#edit-student-parent-phone-1').val();
  const parentPhone2 = $('#edit-student-parent-phone-2').val();
  const physician = $('#edit-student-physician').val();
  const physicianPhone = $('#edit-student-physician-phone').val();
  $.ajax({
    url: '/student/update',
    type: 'put',
    data: {
      id,
      name,
      birthday,
      parent1,
      parent2,
      parentPhone1,
      parentPhone2,
      physician,
      physicianPhone,
    },
    success() {
      $('#student-edit-modal').modal('hide');
      location.reload();
    },
    error(xhr, status, error) {
      console.log(`error: ${error}`);
    },
  });
}

// eslint-disable-next-line no-unused-vars
function deleteStudent() {
  const id = $('#student-delete-modal').attr('studentId');
  $.ajax({
    url: '/student/destroy',
    type: 'delete',
    data: {
      id,
    },
    success() {
      $('#student-delete-modal').modal('hide');
      location.reload();
    },
    error(xhr, status, error) {
      console.log(`error: ${error}`);
    },
  });
}

$(document).ready(() => {
  $('#student-edit-modal').modal({ show: false });
  $('#student-delete-modal').modal({ show: false });
});
