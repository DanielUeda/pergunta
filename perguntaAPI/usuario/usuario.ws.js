const dao = require('./usuario.dao')

module.exports = (app) => {

    app.route("/usuario/login").post( (req, resp) => {
        dao.consultar(req.body, (result) => {
            resp.json(result)
        })
    })

    app.route("/usuario/listar").get( (req, resp) => {
        dao.listar((result) => {
            resp.json(result)
        })
    })

    app.route("/usuario/salvar").post( (req, resp) => {
        dao.salvar(req.body, () => {
            resp.end()
        })
    })

    app.route('/usuario/atualizar').post( (req, res) => {
        let dados = req.body
        
        dao.atualizar(dados, () => {
            res.json({})
        })
    })

}