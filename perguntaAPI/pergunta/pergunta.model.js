const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Types = mongoose.Schema.Types;

var schemaPergunta = new Schema({
    descricao : String,
    dataPergunta : Date,
    remetente : {
        type : Types.ObjectId,
        ref : 'Usuario'
    },
    destinatario : {
        type : Types.ObjectId,
        ref : 'Usuario'
    },
    resposta : String,
    dataResposta : Date
});

module.exports = mongoose.model("Pergunta", schemaPergunta);