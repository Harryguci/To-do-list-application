function setUpModal(title, content, btn1, btn2) {
  $("#modalDelete h5.modal-title").text(title);
  $("#modalDelete .modal-body").html(`<p>${content}</p>`);
  $("#modalDelete .btn-delete").text(btn1);
}

$(document).ready(function () {
  const handleLink = async function (link) {
    await $("#modalDelete .btn-delete").attr("href", link);
  };

  $('button[data-target="#modalDelete"]').click(function () {
    var currLink = $(this).attr("value");
    handleLink(currLink);
    var status = $(this).text().toLowerCase().trim();

    switch (status) {
      case "delete":
        setUpModal(
          "Delete Message",
          "Do you sure delete this document ?",
          "Delete"
        );
        break;
      case "update":
        setUpModal(
          "Update Message",
          "Do you want to move update page ?",
          "Yes"
        );
        break;
      case "finished":
        setUpModal(
          "Finish Message",
          "Have You Finished This Work ?",
          "Finish"
        );
        break;

      default:
        break;
    }
    $("#modalDelete").modal("show");
  });
  $('button[data-dismiss="modal"]').click(function () {
    $("#modalDelete").modal("hide");
  });
});
