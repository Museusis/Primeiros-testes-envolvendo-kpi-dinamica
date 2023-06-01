var alertas = [];
var alertas2 = [];

function obterdados(idRegistro) {
    fetch(`/medidas/tempo-real/${idRegistro}`)
        .then(resposta => {

            if (resposta.ok) {
                resposta.json().then(resposta => {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    alertar(resposta, idRegistro);
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

function alertar(resposta, idRegistro) {
    var temp = resposta[0].temperatura;

    console.log(idRegistro === resposta[0].fkSensor)
    
    var grauDeAviso ='';


    var limites = {
        muito_quente: 24,
        quente: 20,
        ideal: 16,
        frio: 14,
        muito_frio: 10
    };

    var classe_temperatura = 'cardCor cardCor span ';

    if (temp >= limites.muito_quente) {
        classe_temperatura = 'cardCor cardCor span perigo-quente';
        grauDeAviso = 'perigo quente'
        grauDeAvisoCor = 'cardCor cardCor span perigo-quente'
        exibirAlerta(temp, idRegistro, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp < limites.muito_quente && temp >= limites.quente) {
        classe_temperatura = 'cardCor cardCor span alerta-quente';
        grauDeAviso = 'alerta quente'
        grauDeAvisoCor = 'cardCor cardCor span alerta-quente'
        exibirAlerta(temp, idRegistro, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp < limites.quente && temp > limites.frio) {
        classe_temperatura = 'cardCor cardCor span ideal';
        removerAlerta(idRegistro);
    }
    else if (temp <= limites.frio && temp > limites.muito_frio) {
        classe_temperatura = 'cardCor cardCor span alerta-frio';
        grauDeAviso = 'alerta frio'
        grauDeAvisoCor = 'cardCor cardCor span alerta-frio'
        exibirAlerta(temp, idRegistro, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp <= limites.muito_frio) {
        classe_temperatura = 'cardCor cardCor span perigo-frio';
        grauDeAviso = 'perigo frio'
        grauDeAvisoCor = 'cardCor cardCor span perigo-frio'
        exibirAlerta(temp, idRegistro, grauDeAviso, grauDeAvisoCor)
    }

    var cardCor;

    if (idRegistro == 1) {
        tempQuadro1.innerHTML = temp + "°C";
        cardCor = cardCor1
    } else if (idRegistro == 2) {
        tempQuadro2.innerHTML = temp + "°C";
        cardCor = cardCor2
    } else if (idRegistro == 3) {
        tempQuadro3.innerHTML = temp + "°C";
        cardCor = cardCor3
    } else if (idRegistro == 4) {
        tempQuadro4.innerHTML = temp + "°C";
        cardCor = cardCor4
    }

    cardCor.className = classe_temperatura;
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
        exibirAlerta(umid, idRegistro, grauDeAviso2, grauDeAviso2Cor)
    }
    else if (umid < limites2.muito_umido && umid >= limites2.umido) {
        classe_umidade = 'cardCor cardCor span alerta-umido';
        grauDeAviso2 = 'alerta umido'
        grauDeAviso2Cor = 'cardCor cardCor span alerta-umido'
        exibirAlerta(umid, idRegistro, grauDeAviso2, grauDeAviso2Cor)
    }
    else if (umid < limites2.umido && umid > limites2.seco) {
        classe_umidade = 'cardCor cardCor span ideal2';
        removerAlerta(idRegistro);
    }
    else if (umid <= limites2.seco && umid > limites2.muito_seco) {
        classe_umidade = 'cardCor cardCor span alerta-seco';
        grauDeAviso2 = 'alerta seco'
        grauDeAviso2Cor = 'cardCor cardCor span alerta-seco'
        exibirAlerta(umid, idRegistro, grauDeAviso2, grauDeAviso2Cor)
    }
    else if (umid <= limites2.muito_seco) {
        classe_umidade = 'cardCor cardCor span perigo-seco';
        grauDeAviso2 = 'perigo seco'
        grauDeAviso2Cor = 'cardCor cardCor span perigo-seco'
        exibirAlerta(umid, idRegistro, grauDeAviso2, grauDeAviso2Cor)
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


}
function exibirAlerta(temp, idRegistro, grauDeAviso, grauDeAvisoCor ) {
    var indice = alertas.findIndex(item => item.idRegistro == idRegistro);

    if (indice >= 0) {
        alertas[indice] = { grauDeAviso, temp, idRegistro, grauDeAvisoCor}
    } else {
        alertas.push({grauDeAviso, temp, idRegistro, grauDeAvisoCor });
    }

    exibirCards();
    
// Dentro da div com classe grauDeAvisoCor há um caractere "invisível", 
// que pode ser inserido clicando com o seu teclado em alt+255 ou pelo código adicionado acima.
}

function removerAlerta(idRegistro) {
    alertas = alertas.filter(item => item.idRegistro != idRegistro);
    exibirCards();
}

function exibirCards() {
    alerta.innerHTML = '';

    for (var i = 0; i < alertas.length; i++) {
        var mensagem = alertas[i];
        alerta.innerHTML += transformarEmDiv(mensagem);
    }
}

function transformarEmDiv({ grauDeAviso, temp, idRegistro, grauDeAvisoCor }) {
    return `<div class="mensagem-alarme">
    <div class="informacao">
    <div class="${grauDeAvisoCor} alertaCor">&#12644;</div> 
     <h3 class="h3Alerta">Sala ${idRegistro} está em estado de ${grauDeAviso}!</h3>
    <small class="smallAlerta">Temperatura | Umidade ${temp}.</small> 
    </div>
    <div class="alarme-sino"></div>
    </div>`;
}