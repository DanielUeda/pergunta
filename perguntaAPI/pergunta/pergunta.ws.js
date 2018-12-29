const dao = require('./pergunta.dao')

module.exports = (app) => {

    app.route("/pergunta/listar").get( (req, resp) => {
        dao.listar(req.query.usuario, (retorno) => {
            resp.json(retorno)
        })
    })

    app.route("/pergunta/minhasPerguntas").get( (req, resp) => {
        dao.listarMinhasPerguntas(req.query.usuario, (retorno) => {
            resp.json(retorno)
        })
    })

    app.route("/pergunta/salvar").post( (req, resp) => {
        dao.salvar(req.body, () => {
            resp.end()
        })
    })

    app.route('/pergunta/excluir/:id').get( (req, res) => {
        let id = req.params.id
        
        dao.excluir(id, () => {
            res.json({})
        })
    })

    app.route('/pergunta/atualizar').post( (req, res) => {
        let dados = req.body
        
        dao.atualizar(dados, () => {
            res.json({})
        })
    })
}