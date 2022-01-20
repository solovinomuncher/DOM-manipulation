// ====================================================
// simple DOM manipulation: changing value of element
// ====================================================

let docObj = document.querySelector('.header-title');

function eventHandler(e) {
    console.log('response!');
    this.firstChild.nodeValue = "DOMDOMDOM";
}

function eventHandler2(e) {
    console.log('new response!');
    this.firstChild.nodeValue = "DOM Manipulation";
}

// console.log(docObj.firstChild.nodeValue);

docObj.addEventListener('mouseenter', eventHandler);
docObj.addEventListener('click', eventHandler2);

// ====================================================
// simple DOM manipulation: handling onclick events
// ====================================================

let mainButton = document.querySelector('.main-button');

// with this way of handling clicks, only one onclick handler can be assigned
// to an object at a time. addEventListener is more flexible in this regard.
// mainButton.onclick = function() {
//     console.log('onclick event');
//     this.textContent = 'Clicked!';
// }

function eventHandler3(e) {
    console.log('onclick event');
    this.textContent = 'Clicked!';

    // reloads the current URL, like the Refresh button
    // location.reload();
}

mainButton.addEventListener('click', eventHandler3);