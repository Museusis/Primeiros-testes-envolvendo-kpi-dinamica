var alertas2 = [];

var CriticoUmid= 0;
var AlertaUmid=0;
var IdealUmid=0

function obterdados2(idRegistro) {
    fetch(`/medidas/umid/${idRegistro}`)
        .then(resposta => {

            if (resposta.ok) {
                resposta.json().then(resposta => {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    alertar2(resposta, idRegistro);
                
                });
            } else {

                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });

}

function alertar2(resposta, idRegistro) {
    var umid = resposta[0].umidade;

    console.log(idRegistro === resposta[0].fkSensor)
    
    var grauDeAviso2 ='';


    var limites2 = {
        muito_umido: 61,
        umido: 57,
        ideal: 50,
        seco: 48,
        muito_seco: 44
    };

    var classe_umidade = 'cardCor cardCor span ';

    if (umid >= limites2.muito_umido) {
        classe_umidade = 'cardCor cardCor span perigo-umido';
        grauDeAviso2 = 'perigo umido'
        grauDeAviso2Cor = 'cardCor cardCor span perigo-umido'
        exibirAlerta2(umid, idRegistro, grauDeAviso2, grauDeAviso2Cor)
        CriticoUmid++
    }
    else if (umid < limites2.muito_umido && umid >= limites2.umido) {
        classe_umidade = 'cardCor cardCor span alerta-umido';
        grauDeAviso2 = 'alerta umido'
        grauDeAviso2Cor = 'cardCor cardCor span alerta-umido'
        exibirAlerta2(umid, idRegistro, grauDeAviso2, grauDeAviso2Cor)
        AlertaUmid++
    }
    else if (umid < limites2.umido && umid > limites2.seco) {
        classe_umidade = 'cardCor cardCor span ideal2';
        removerAlerta2(idRegistro);
        IdealUmid++
    }
    else if (umid <= limites2.seco && umid > limites2.muito_seco) {
        classe_umidade = 'cardCor cardCor span alerta-seco';
        grauDeAviso2 = 'alerta seco'
        grauDeAviso2Cor = 'cardCor cardCor span alerta-seco'
        exibirAlerta2(umid, idRegistro, grauDeAviso2, grauDeAviso2Cor)
        AlertaUmid++
    }
    else if (umid <= limites2.muito_seco) {
        classe_umidade = 'cardCor cardCor span perigo-seco';
        grauDeAviso2 = 'perigo seco'
        grauDeAviso2Cor = 'cardCor cardCor span perigo-seco'
        exibirAlerta2(umid, idRegistro, grauDeAviso2, grauDeAviso2Cor)
        CriticoUmid++
    }

    var cardCor;

    if (idRegistro == 1) {
        umidQuadro1.innerHTML = umid + "%";
        cardCor = cardCor5
    } else if (idRegistro == 2) {
        umidQuadro2.innerHTML = umid + "%";
        cardCor = cardCor6
    } else if (idRegistro == 3) {
        umidQuadro3.innerHTML = umid + "%";
        cardCor = cardCor7
    } else if (idRegistro == 4) {
        umidQuadro4.innerHTML = umid + "%";
        cardCor = cardCor8
    }

    cardCor.className = classe_umidade;

sessionStorage.TOTALCRITICOUMID = CriticoUmid ;
sessionStorage.TOTALPERIGOUMID = AlertaUmid;
sessionStorage.TOTALIDEALUMID = IdealUmid;

var totalAlertaUmid= CriticoUmid  + AlertaUmid + IdealUmid;
sessionStorage.TOTALUMID = totalAlertaUmid;

}

function exibirAlerta2(umid, idRegistro, grauDeAviso2, grauDeAviso2Cor ) {
    var indice = alertas2.findIndex(item => item.idRegistro == idRegistro);

    if (indice >= 0) {
        alertas2[indice] = { grauDeAviso2, umid, idRegistro, grauDeAviso2Cor}
    } else if (alertas2.length < 4) {
        alertas2.push({grauDeAviso2, umid, idRegistro, grauDeAviso2Cor });
        
    } 

    exibirCards2();
    
// Dentro da div com classe grauDeAvisoCor há um caractere "invisível", 
// que pode ser inserido clicando com o seu teclado em alt+255 ou pelo código adicionado acima.
}

function removerAlerta2(idRegistro) {
    alertas2 = alertas2.filter(item => item.idRegistro != idRegistro);
    exibirCards2();
}

function exibirCards2() {
    alerta2.innerHTML = '';

    for (var f = 0; f < alertas2.length; f++) {
        var mensagem2 = alertas2[f];
        alerta2.innerHTML += transformarEmDiv2(mensagem2);
    }
}

function transformarEmDiv2({ grauDeAviso2, umid, idRegistro, grauDeAviso2Cor }) {
    return `<div class="mensagem-alarme">
    <div class="informacao">
    <div class="${grauDeAviso2Cor} alertaCor">&#12644;</div> 
     <h3 class="h3Alerta">Sala ${idRegistro} está em estado de ${grauDeAviso2}!</h3>
    <small class="smallAlerta">Umidade ${umid}.</small> 
    </div>
    <div class="alarme-sino"></div>
    </div>`;
}

