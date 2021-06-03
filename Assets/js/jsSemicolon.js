function addSemicolon(value){
    value = value.split('');

    let inParan = false;
    let inCom = false;
    let inlineCom = false;
    let inQuote = false;
    let inSQuote = false;
    for (let i = 0;i < value.length;i++){

        value[i]=sanitizedHtml(value[i]);

        /* CHECK SI LE SAUT DE LIGNE SE TROUVE DANS DES PARENTHESE
        * ezaezaezazeza
        *
        * */
        if (value[i] === '('){
            inParan = true;
        }
        if (value[i] === ')'){
            if (inParan){
                inParan = false;
            }
        }

        /* CHECK SI LE SAUT DE LIGNE SE TROUVE DANS UN COMMENTAIRE */
        if (value[i] === '/' && value[i+1] === '*' ){
            inCom = true;
        }

        if (value[i] === '\n' && value[i-2] === '/'){
            if (inCom){inCom = false}
        }

        /* CHECK SI LE SAUT DE LIGNE SE TROUVE APRES UN COMMENTAIRE EN LIGNE */
        if (value[i] === '/' && value[i+1] === '/' ){
            inlineCom = true;
        }

        if (value[i] === '\n'){
            if (inlineCom){inlineCom = false}
        }

        if (value[i] === '\r'){
            if (!inParan &&
                !inCom &&
                !inlineCom &&
                !/[\n\s}{:]/g.test(value[i-1]) &&
                value[i-1] !== ";"
            ){
                value[i] = "<span style='color: white;background-color: red;font-weight: bold;'>;</span>";
            }
        } else if(i === value.length-1){
            if (!inParan &&
                !inCom &&
                !inlineCom &&
                !/[\n\s}{:]/g.test(value[i]) &&
                value[i] !== ";"
            ){
                value[i] += "<span style='color: white;background-color: red;font-weight: bold;'>;</span>";
            }
        }
    }
    value = value.join('')
    return value.toString();
}

function sanitizedHtml(value){
    if (value ==='&'){return '&amp;'}
    if (value ==='<'){return '&lt;'}
    if (value ==='>'){return '&gt;'}
    if (value ==='"'){return '&quot;'}
    if (value ==="'"){return '&#039;'}
    else {return value}
}

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