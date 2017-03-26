// eslint-disable-next-line no-unused-vars
function addStudent() {
  const name = $('#add-student-name').val();
  const birthday = $('#add-student-birth-date').val();
  const parent1 = $('#add-student-parent-name-1').val();
  const parent2 = $('#add-student-parent-name-2').val();
  const parentPhone1 = $('#add-student-parent-phone-1').val();
  const parentPhone2 = $('#add-student-parent-phone-2').val();
  const physician = $('#add-student-physician-name').val();
  const physicianPhone = $('#add-student-physician-phone').val();
  const startDate = $('#add-student-start-date').val();
  const endDate = $('#add-student-end-date').val();
  $.ajax({
    url: '/student/create',
    type: 'post',
    data: {
      name,
      birthday,
      parent1,
      parent2,
      parentPhone1,
      parentPhone2,
      physician,
      physicianPhone,
      startDate,
      endDate,
    },
    success(data) {
      document.location.href = 'students';
      console.log(`data: ${data}`);
    },
    error(xhr, status, error) {
      console.log(`error: ${error}`);
    },
  });
}
