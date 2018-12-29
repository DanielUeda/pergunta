const md5 = require('md5');

const db = require('../db/db');
const Pergunta = require('./pergunta.model');
const Usuario = require('../usuario/usuario.model');
const mongoose = require('mongoose');

exports.salvar = (pergunta, fnCallback) => {
    db.connect();

    let p = new Pergunta(pergunta);
    p.dataPergunta = new Date()

    p.save( (e, res) => {
        db.disconnect();
        fnCallback();
    });
}

exports.listar = (usuario, fnCallback) =>{
    db.connect();
    let q = Pergunta.find({ destinatario : usuario, resposta:""})
    q.sort('-dataPergunta');
    q.populate('remetente')

    q.exec((e,ret)=>{
        db.disconnect();
        fnCallback(ret);
    })
}

exports.listarMinhasPerguntas = (usuario, fnCallback) =>{
    db.connect();
    let q = Pergunta.find({ remetente : usuario, reposta:{$ne:""}})
    q.sort('-dataPergunta');
    q.populate('destinatario')

    q.exec((e,ret)=>{
        db.disconnect();
        fnCallback(ret);
    })
}

exports.excluir = (id, fnCallback) => {
    db.connect()

    Pergunta.findByIdAndDelete(id, (e, ret) => {
        db.disconnect()
        fnCallback()
    })
}

exports.atualizar = (pergunta, fnCallback) => {
    db.connect()

    Pergunta.findByIdAndUpdate(pergunta._id, pergunta, (e, ret) => {
        if (e) {
            console.log(e)
        } 

        db.disconnect()
        fnCallback()
    })
}