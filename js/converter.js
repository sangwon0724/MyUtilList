//한글 => 특수문자
function encodingUTF8(){
    $("#encodingResult_UTF8").val(encodeURI($("#encodingTarget_UTF8").val()));
}

//특수문자 => 한글
function decodingUTF8(){
    $("#decodingResult_UTF8").val(decodeURI($("#decodingTarget_UTF8").val()));
}