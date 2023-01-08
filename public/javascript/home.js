import formEditWork from './formEditWork.js';

const showFormEdit = (event) => {
    // console.log(event.target);

    var current = event.target;
    var workID = current.getAttribute('value');

    console.log(workID);
}

window.showFormEdit = showFormEdit;
