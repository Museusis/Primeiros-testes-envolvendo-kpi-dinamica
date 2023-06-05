var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idRegistro", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idRegistro", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
});

router.get("/tempe/:idRegistro", function (req, res){
    medidaController.buscarMedidasTemperatura(req, res);
});

router.get("/umid/:idRegistro", function (req, res){
    medidaController.buscarMedidasUmidade(req, res);
});

router.get("/statusSensor/:idQuadrante", function (req, res){
    medidaController.buscarStatusSensor(req, res);
})

module.exports = router;