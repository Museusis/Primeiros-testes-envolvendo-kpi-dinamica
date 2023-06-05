var medidaModel = require("../models/medidaModel");

function buscarUltimasMedidas(req, res) {

    const limite_linhas = 7;

    var idRegistro = req.params.idRegistro;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidas(idRegistro, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoReal(req, res) {

    var idRegistro = req.params.idRegistro;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoReal(idRegistro).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasTemperatura(req, res){
    var idRegistro = req.params.idRegistro;

    console.log(`Recuperando medidas de Temperatura`);

    medidaModel.buscarMedidasTemperatura(idRegistro).then(function (resultado){
        if (resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro){
        console.log(erro);
        console.log("Houve um erro ao buscar a Temperatura", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasUmidade(req, res){
    var idRegistro = req.params.idRegistro;

    console.log(`Recuperando medidas de Umidade`);

    medidaModel.buscarMedidasUmidade(idRegistro).then(function (resultado){
        if(resultado.length >0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function(erro){
        console.log(erro);
        console.log("Houve um erro ao buscar a Umidade", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function  buscarStatusSensor(req, res){
    var idSensor = req.params.idSensor;

    console.log(`Recuperando o status do sensor`);

    medidaModel.buscarStatusSensor(idSensor).then(function(resultado){
        if(resultado.length >0){
            res.status(200).json(resultado);
        }else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro){
        console.log(erro);
        console.log("Houve um erro ao buscar os status dos sensores", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarStatusSensor,
    buscarMedidasTemperatura,
    buscarMedidasUmidade

}