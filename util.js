//페이지 변경
function loadPage(page){
    $("#note_body").load(page);
    $("#remoteBtn").text("☰ Close Remote");

    $("#sidebar > button").removeClass("active");
    $(event.target).addClass("active");
}

//사이드바 on/off
function changeSidebar(){
    const text = $("#openbtn").text();
    if(text === "☰ Close Sidebar"){
        $("#sidebar").css("display","none");
        $("#note_body").css("width","100vw");
        $("#note_body").css("padding-left","7vw");
        $("#openbtn").text("☰ Open Sidebar");
    }
    else if(text === "☰ Open Sidebar"){
        $("#sidebar").css("display","flex");
        $("#note_body").css("width","85vw");
        $("#note_body").css("padding-left","0");
        $("#openbtn").text("☰ Close Sidebar");
    }
}