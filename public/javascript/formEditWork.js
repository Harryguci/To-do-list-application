class formEditWork {
  constructor(work) {
    this.work = work;
  }

  html() {
    return `
        <div class="wrap center">
        <h2 class="text-center">Edit the work</h2>
        <form name="form-edit" action="/edit/id" method="POST" onsubmit="checkFormSub(event)">
            <div class="d-flex mt-4">
                <label class="col-md-1" for="title">Title</label>
                <input class="col col-md" name="title" id="title" type="text" placeholder="Work's Title" value="${work.title}" required>
            </div>
            <div class="mt-3 d-flex">
                <label class="col-md-1 mt-1 mt-md-auto" for="time">Time</label>
                <div class="d-block d-md-flex w-100 gap-3" style="">
                    <input class="col-12 col-md mb-2" name="hour" id="hour" type="text" placeholder="Hour:minute"
                        value="${work.hour}" required>
                    <input class="col-12 col-md mb-2 mb-md-0" name="date" id="date" type="text" placeholder="Date"
                        value="${work.date}" required>
                    <input class="col-12 col-md mb-2 mb-md-0" name="month" id="month" type="text" placeholder="Month"
                        value="${work.month}" required>
                    <input class="col-12 col-md mb-2 mb-md-0" name="year" id="year" type="text" placeholder="Year"
                        value="${work.year}" required>
                </div>
            </div>
            <div class="mt-3 d-flex">
                <div class="mb-3 d-flex w-100 gap-3">
                    <label for="type" class="form-label col-1">Type</label>
                    <div class="col custom-select">
                        <select class="form-select" style="" name="type" id="type">
                            <option selected>--Select One--</option>
                            <option value="Common work">Common Work</option>
                            <option value="Study">Study</option>
                            <option value="Business">Business</option>
                            <option value="Pleasure">Pleasure</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="mt-2 d-flex" style="flex-wrap: wrap;">
                <label class="col-12 col-md-1" for="content">Content</label>
                <textarea class="col-12 col-md" name="content" id="content" type="text" rows="5"
                    placeholder="Something..." required>${work.content}</textarea>
            </div>
            <div class="">
                <input type="hidden" name="user" value="${work.user}">
            </div>
            <div class="mt-5 mb-2 d-flex">
                <button type="submit" class="btn btn-outline-primary mx-auto px-5 py-2">Change</button>
            </div>
        </form>
    </div>
        `;
  }

  display(body) {
    body.append(this.html());
    body.append('<div class="dark-screen"></div>');
    return body;
  }

  remove() {
    $('.form-edit').remove();
  }
}

export default formEditWork;
