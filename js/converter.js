//한글 => 특수문자 (UTF-8)
function encodingUTF8(){
    $("#encodingResult_UTF8").val(encodeURI($("#encodingTarget_UTF8").val()));
}

//특수문자 => 한글 (UTF-8)
function decodingUTF8(){
    $("#decodingResult_UTF8").val(decodeURI($("#decodingTarget_UTF8").val()));
}

//한글 => 특수문자 (유니코드)
function encodingUnicode(){
    var target = $("#encodingTarget_Unicode").val();
    var length = target.length;
    var result = "";

    for (let i = 0; i < length; i++) {
        result+="\\"+target[i].charCodeAt(0).toString(16);
    }

    $("#encodingResult_Unicode").val(result);
}

//특수문자 => 한글 (유니코드)
function decodingUnicode(){
    var target = $("#decodingTarget_Unicode").val();
    target=target.replace(/[^\w\s]/gi, '')
    var length = target.length/4;
    var result = "";
    console.log(target);

    for (let i = 0; i < length; i++) {
        console.log(i*4);
        console.log((i+1)*4);
        console.log(target.substring(i*4, (i+1)*4));
        console.log();
        console.log("===================================");
        result+=String.fromCharCode(parseInt(target.substring(i*4, (i+1)*4),16));
    }

    $("#decodingResult_Unicode").val(result);
}