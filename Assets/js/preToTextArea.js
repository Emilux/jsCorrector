$(function(){
    $('#result').on('click',function (e){
        e.preventDefault();
        if ($(this).children().prop('nodeName') !== "TEXTAREA"){
            $(this).html(`<textarea class="form-control">${$(this).text()}</textarea>`)
        }
    });
});