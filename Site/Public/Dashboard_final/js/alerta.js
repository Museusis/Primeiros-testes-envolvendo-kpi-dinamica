var alertas = [];

function obterdados(idRegistro) {
    fetch(`/medidas/tempo-real/${idRegistro}`)
        .then(resposta => {

            if (resposta.ok) {
                resposta.json().then(resposta => {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    alertar(resposta, idRegistro);
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
        frio: 12,
        muito_frio: 10
    };

    var classe_temperatura = 'cardCor cardCor span textCard ';

    if (temp >= limites.muito_quente) {
        classe_temperatura = 'cardCor cardCor span textCard perigo-quente';
        grauDeAviso = 'perigo quente'
        grauDeAvisoCor = 'cardCor cardCor span textCard perigo-quente'
        exibirAlerta(temp, idRegistro, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp < limites.muito_quente && temp >= limites.quente) {
        classe_temperatura = 'cardCor cardCor span textCard alerta-quente';
        grauDeAviso = 'alerta quente'
        grauDeAvisoCor = 'cardCor cardCor span textCard alerta-quente'
        exibirAlerta(temp, idRegistro, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp < limites.quente && temp > limites.frio) {
        classe_temperatura = 'cardCor cardCor span textCard ideal';
        removerAlerta(idRegistro);
    }
    else if (temp <= limites.frio && temp > limites.muito_frio) {
        classe_temperatura = 'cardCor cardCor span textCard alerta-frio';
        grauDeAviso = 'alerta frio'
        grauDeAvisoCor = 'cardCor cardCor span textCard alerta-frio'
        exibirAlerta(temp, idRegistro, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp <= limites.muito_frio) {
        classe_temperatura = 'cardCor cardCor span textCard perigo-frio';
        grauDeAviso = 'perigo frio'
        grauDeAvisoCor = 'cardCor cardCor span textCard perigo-frio'
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

function exibirAlerta(temp, idRegistro, grauDeAviso, grauDeAvisoCor) {
    var indice = alertas.findIndex(item => item.idRegistro == idRegistro);

    if (indice >= 0) {
        alertas[indice] = { idRegistro, temp, grauDeAviso, grauDeAvisoCor }
    } else {
        alertas.push({ idRegistro, temp, grauDeAviso, grauDeAvisoCor });
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

function transformarEmDiv({ idRegistro, temp, grauDeAviso, grauDeAvisoCor }) {
    return `<div class="mensagem-alarme">
    <div class="informacao">
    <div class="${grauDeAvisoCor}">&#12644;</div> 
     <h3>Aquário ${idRegistro} está em estado de ${grauDeAviso}!</h3>
    <small>Temperatura ${temp}.</small>   
    </div>
    <div class="alarme-sino"></div>
    </div>`;
}
