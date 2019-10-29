const restify = require("restify");
const errs = require("restify-errors");

const server = restify.createServer({
  name: "myapp",
  version: "1.0.0"
});

var knex = require("knex")({
  client: "mysql",
  connection: {
    host: "mysql669.umbler.com",
    user: "sigma",
    password: "sigmarh123",
    port: "41890",
    database: "rhsigma"
  }
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
var port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log("%s listening at %s", server.name, server.url);
});

// rotas Usuarios
server.get("/usuarios", (req, res, next) => {
  knex("tblusuario").then(dados => {
    res.send(dados);
  }, next);
});

server.post("/usuarios/create", (req, res, next) => {
  knex("tblusuario")
    .insert(req.body)
    .then(dados => {
      res.send(dados);
    }, next);
});

server.get("usuarios/show/:id", (req, res, next) => {
  const { id } = req.params;
  knex("tblusuario")
    .where("id", id)
    .first()
    .then(dados => {
      if (!dados)
        return res.send(
          new errs.BadRequestError("não possui usuario com esse id")
        );
      res.send(dados);
    }, next);
});

server.put("usuarios/update/:id", (req, res, next) => {
  const { id } = req.params;
  knex("tblusuario")
    .where("id", id)
    .update(req.body)
    .then(dados => {
      if (!dados)
        return res.send(
          new errs.BadRequestError("não possui usuario com esse id")
        );
      res.send("Dados Atualizado");
    }, next);
});

server.del("usuarios/delete/:id", (req, res, next) => {
  const { id } = req.params;
  knex("tblusuario")
    .where("id", id)
    .delete()
    .then(dados => {
      if (!dados)
        return res.send(
          new errs.BadRequestError("não possui usuario com esse id")
        );
      res.send("Dados Excluidos");
    }, next);
});
