// Write notification :

// 1. set content of notification
// 2. set properties of notification to display block
// 3. set properties of notification to animation

// after 5s disable notification

async function notificationHandler(title, content) {
  var setContent = new Promise(function (resolve, reject) {
    resolve(
      `
        <div class="notification-container position-fixed bg-white rounded-3"
        style="">
        <div class="notification__head p-3">
            <h4 class="text-white fw-bold">${title}</h4>
        </div>
        <div class="notification__main p-3">
            <p>${content}</p>
        </div>
        <div class="notification__foot">
            <div class="processor"></div>
        </div>
    </div>
    `
    );
  });

  // CALL PROMISE
  setContent
    .then((notificationBlock) => {
      $("body").append(notificationBlock);
    })
    .then(await new Promise((resolve) => setTimeout(resolve, 5000)))
    .then(
      await new Promise((resolve) => {
        $(".notification-container").css(
          "animation-name",
          "notification-move-out"
        );
        setTimeout(resolve, 1000);
      })
    )
    .then(() => $(".notification-container").remove())
    .then(() => console.log("SUCCESSFUL"))
    .catch((err) => alert(err));
}

export default notificationHandler;
