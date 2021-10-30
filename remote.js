//리모콘 작동
function move_section(event){
    var section_id = event.target.value;
    //location.href = "#" + section_id;
    document.getElementById(section_id).scrollIntoView({behavior: 'smooth'});
}

//document.getElementById("remote_menu").addEventListener("change", move_section);

$("#note_body > #remote> #remote_setcion > #remote_menu").on("change",move_section)