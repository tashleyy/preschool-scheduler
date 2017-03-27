// eslint-disable-next-line no-unused-vars
function showRateScheduleEditModal(id) {
  $.ajax({
    url: '/rateschedule/findone',
    type: 'get',
    data: {
      id,
    },
    success(data) {
      // Reset radio buttons
      $('input[name="edit-rs-options-monday"]').filter('[value=none]').prop('checked', true);
      $('input[name="edit-rs-options-tuesday"]').filter('[value=none]').prop('checked', true);
      $('input[name="edit-rs-options-wednesday"]').filter('[value=none]').prop('checked', true);
      $('input[name="edit-rs-options-thursday"]').filter('[value=none]').prop('checked', true);
      $('input[name="edit-rs-options-friday"]').filter('[value=none]').prop('checked', true);

      $('#edit-rs-name').val(data.name);
      $('#edit-rs-cost').val(data.cost);
      $('input[name="edit-rs-options-monday"]').filter(`[value=${data.monday}]`).prop('checked', true);
      $('input[name="edit-rs-options-tuesday"]').filter(`[value=${data.tuesday}]`).prop('checked', true);
      $('input[name="edit-rs-options-wednesday"]').filter(`[value=${data.wednesday}]`).prop('checked', true);
      $('input[name="edit-rs-options-thursday"]').filter(`[value=${data.thursday}]`).prop('checked', true);
      $('input[name="edit-rs-options-friday"]').filter(`[value=${data.friday}]`).prop('checked', true);
      $('#rs-edit-modal').attr('rsId', id);
      $('#rs-edit-modal').modal('show');
    },
    error(xhr, status, error) {
      console.log(`error: ${error}`);
    },
  });
  return false;
}

// eslint-disable-next-line no-unused-vars
function showRateScheduleDeleteModal(id) {
  $('#rs-delete-modal').attr('rsId', id);
  $('#rs-delete-modal').modal('show');
  return false;
}

// eslint-disable-next-line no-unused-vars
function editRateSchedule() {
  const id = $('#rs-edit-modal').attr('rsId');
  const name = $('#edit-rs-name').val();
  const cost = $('#edit-rs-cost').val();
  const monday = $('input[name="edit-rs-options-monday"]:checked').val();
  const tuesday = $('input[name="edit-rs-options-tuesday"]:checked').val();
  const wednesday = $('input[name="edit-rs-options-wednesday"]:checked').val();
  const thursday = $('input[name="edit-rs-options-thursday"]:checked').val();
  const friday = $('input[name="edit-rs-options-friday"]:checked').val();
  $.ajax({
    url: '/rateschedule/update',
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
      $('#rs-edit-modal').modal('hide');
      location.reload();
    },
    error(xhr, status, error) {
      console.log(`error: ${error}`);
    },
  });
}

// eslint-disable-next-line no-unused-vars
function deleteRateSchedule() {
  const id = $('#rs-delete-modal').attr('rsId');
  $.ajax({
    url: '/rateschedule/destroy',
    type: 'delete',
    data: {
      id,
    },
    success() {
      $('#rs-delete-modal').modal('hide');
      location.reload();
    },
    error(xhr, status, error) {
      console.log(`error: ${error}`);
    },
  });
}

$(document).ready(() => {
  $('#rs-edit-modal').modal({ show: false });
  $('#rs-delete-modal').modal({ show: false });
});
