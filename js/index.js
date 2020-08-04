$(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
  $('#exampleModal').on('show.bs.modal', function (e) {
    $('#modalbtn1').removeClass('btn-outline-success');
    $('#modalbtn1').addClass('btn-dark');
  });
  $('#exampleModal').on('hidden.bs.modal', function (e) {
    $('#modalbtn1').removeClass('btn-dark');
    $('#modalbtn1').addClass('btn-outline-success');
  });