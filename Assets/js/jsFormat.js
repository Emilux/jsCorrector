$(function(){
    let myResult;
    $('#codeForm').on('submit',function (e){
        e.preventDefault();
        let myValue = $('#codeForm').serializeArray()[0].value;

        if (myValue !== '' && myValue !== null) myResult = addSemicolon(myValue.toString());
        else myResult = 'Veuillez entrer une valeur dans le champs de texte';
        $('#result').html(myResult)
        $('#result').show()
    });
});