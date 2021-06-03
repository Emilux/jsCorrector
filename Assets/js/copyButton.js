$(function(){
    $('#copyButton').on('click',function (e){
        e.preventDefault();

        // select the content
        let myCopyArea = $('#result');
        myCopyArea.append(`<textarea id="copyText" class="form-control">${myCopyArea.text()}</textarea>`)
        let copyText = $('#copyText')
        copyText.select();
        document.execCommand("copy");
        copyText.remove();
    });
});