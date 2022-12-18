$(document).ready(function () {
  const handleLink = async function (link) {
    await $("#modalDelete .btn-delete").attr("href", link);
  };

  $("#modalDelete h5.modal-title").text("Delete Message");
  $("#modalDelete .modal-body").html(
    "<p>Do you sure delete this document ?</p>"
  );

  $('button[data-target="#modalDelete"]').click(function () {
    var currLink = $(this).attr("value");
    handleLink(currLink);

    $("#modalDelete").modal("show");
  });
  $('button[data-dismiss="modal"]').click(function () {
    $("#modalDelete").modal("hide");
  });
});
