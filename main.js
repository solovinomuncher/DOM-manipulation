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