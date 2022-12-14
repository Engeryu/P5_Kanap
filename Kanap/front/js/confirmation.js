"use strict";

function main() {
    const idNode = document.getElementById("orderId");
    var url = new URL(window.location.href);
    var orderId = url.searchParams.get("orderId");
    idNode.innerText = orderId;
}

main();