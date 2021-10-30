function open_modal(target){
    var modal = document.getElementById(target);
    var close = document.querySelector("#" + target + " .close");

    modal.style.display = "block";

    close.onclick = function() {
        modal.style.display = "none";
    }
}