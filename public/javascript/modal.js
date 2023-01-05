function setUpModal(title, content, btn1, btn2) {
  $("#modalDelete h5.modal-title").text(title);
  $("#modalDelete .modal-body").html(`<p>${content}</p>`);
  $("#modalDelete .btn-delete").text(btn1);
}

$(document).ready(function () {
  const handleLink = async function (link) {
    await $("#modalDelete .btn-delete").attr("href", link);
  };

  $('button[data-target="#modalDelete"]').click(function (event) {
    // $(".modal-content").css("opacity", "1");
    
    var status = $(this).text().toLowerCase().trim();
    var currLink = $(this).attr("value");
    handleLink(currLink);
    $(".modal-content").css({
      opacity: "1",
    });

    switch (status) {
      case "delete":
        setUpModal(
          "Delete Message",
          "Do you sure delete this document ?",
          "Delete"
        );
        break;
      case ("update", "edit"):
        setUpModal(
          "Update Message",
          "Do you want to move update page ?",
          "Yes"
        );
        break;
      case "finished":
        setUpModal("Finish Message", "Have You Finished This Work ?", "Finish");
        break;

      case "logout":
        setUpModal("Logout Message", "Do you want <b>Logout</b> ?", "Yes");
        break;

      default:
        break;
    }
    $("#modalDelete").modal("show");
    $(".modal-backdrop").css({
      opacity: "0.5",
    });
  });
  $('button[data-dismiss="modal"]').click(function () {
    $(".modal-content").css({
      opacity: "0",
    });
    $(".modal-backdrop")
      .css({
        opacity: "0",
      })
      .remove();

    $(".modal").modal("hide");
  });
});
