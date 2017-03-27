// eslint-disable-next-line no-unused-vars
function showAfterSchoolActivityEditModal(id) {
  $.ajax({
    url: '/afterschoolactivity/findone',
    type: 'get',
    data: {
      id,
    },
    success(data) {
      // Reset checkboxes
      $('input[name="edit-asa-options-monday"]').prop('checked', false);
      $('input[name="edit-asa-options-tuesday"]').prop('checked', false);
      $('input[name="edit-asa-options-wednesday"]').prop('checked', false);
      $('input[name="edit-asa-options-thursday"]').prop('checked', false);
      $('input[name="edit-asa-options-friday"]').prop('checked', false);

      $('#edit-asa-name').val(data.name);
      $('#edit-asa-cost').val(data.cost);
      $('input[name="edit-asa-options-monday"]').prop('checked', data.monday);
      $('input[name="edit-asa-options-tuesday"]').prop('checked', data.tuesday);
      $('input[name="edit-asa-options-wednesday"]').prop('checked', data.wednesday);
      $('input[name="edit-asa-options-thursday"]').prop('checked', data.thursday);
      $('input[name="edit-asa-options-friday"]').prop('checked', data.friday);

      $('#asa-edit-modal').attr('asaId', id);
      $('#asa-edit-modal').modal('show');
    },
    error(xhr, status, error) {
      console.log(`error: ${error}`);
    },
  });
  return false;
}

// eslint-disable-next-line no-unused-vars
function showAfterSchoolActivityDeleteModal(id) {
  $('#asa-delete-modal').attr('asaId', id);
  $('#asa-delete-modal').modal('show');
  return false;
}

// eslint-disable-next-line no-unused-vars
function editAfterSchoolActivity() {
  const id = $('#asa-edit-modal').attr('asaId');
  const name = $('#edit-asa-name').val();
  const cost = $('#edit-asa-cost').val();
  const monday = $('input[name="edit-asa-options-monday"]').prop('checked');
  const tuesday = $('input[name="edit-asa-options-tuesday"]').prop('checked');
  const wednesday = $('input[name="edit-asa-options-wednesday"]').prop('checked');
  const thursday = $('input[name="edit-asa-options-thursday"]').prop('checked');
  const friday = $('input[name="edit-asa-options-friday"]').prop('checked');
  $.ajax({
    url: '/afterschoolactivity/update',
    type: 'put',
    data: {
      id,
      name,
      cost,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
    },
    success() {
      $('#asa-edit-modal').modal('hide');
      location.reload();
    },
    error(xhr, status, error) {
      console.log(`error: ${error}`);
    },
  });
}

// eslint-disable-next-line no-unused-vars
function deleteAfterSchoolActivity() {
  const id = $('#asa-delete-modal').attr('asaId');
  $.ajax({
    url: '/afterschoolactivity/destroy',
    type: 'delete',
    data: {
      id,
    },
    success() {
      $('#asa-delete-modal').modal('hide');
      location.reload();
    },
    error(xhr, status, error) {
      console.log(`error: ${error}`);
    },
  });
}

$(document).ready(() => {
  $('#asa-edit-modal').modal({ show: false });
  $('#asa-delete-modal').modal({ show: false });
});
