
var Ativo = 0;
var Inativo = 0;
var Manutencao = 0;

var TotalSensor =0;

function buscarStatusSensor(idSensor) {
    // aguardar();

    fetch(`/medidas/statusSensor/${idSensor}`
    ).then(function (resposta) {

      if (resposta.ok) {
        console.log(resposta);

        resposta.json().then(json => {
          console.log(json);
          console.log(JSON.stringify(json));

       
            if (json[0].status =='Ativo'){
                Ativo++;
                TotalSensor++;
                sessionStorage.STATSENSORATIVO = Ativo;
            }else if (json[0].status == "Inativo"){
                Inativo++;
                TotalSensor++
                sessionStorage.STATSENSORINATIVO = Inativo;
            } else {
                Manutencao++;
                TotalSensor++
                sessionStorage.STATSENSORMANUTENCAO = Manutencao;
            }

            sessionStorage.STATTOTALSENSOR = TotalSensor;
        });

      } else {

        console.log("Houve um erro ao tentar realizar o login!");

        resposta.text().then(texto => {
          console.error(texto);
          // finalizarAguardar(texto);
        });
      }

    }).catch(function (erro) {
      console.log(erro);
    })

    return false;
  }