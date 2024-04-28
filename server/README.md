# Backend

## tabela de conteudo por ordem de execução

- [app](#app)
- [startup](#startup)
- [routes](#routes)
- [controllers](#controllers)
- [models](#models)
- [socket](#socket)
- [utils](#utils)

## [app](app.js)

esse e o arquivo responsavel por criar o server do express, socket e conectar com a database.

## [startup](startup)

essa e a primeira pasta a ser executada depois do [app.js](app.js) a função dela e checar se o usuario esta autenticado usando o arquivo [auth](startup/auth/auth.js) e passar para proxima fase

ex:

> app.use("/home", auth, indexRoute);

## [routes](routes)

essa pasta e responsavel pelo routing dos requests, uma vez que ja passou pela utorização em [startup](#startup),
antes de passar o request para a proxima etapa é preciso usar ou criar um [middlewere](routes/middlewares/) para validar e sanitizar a data enviada pelo frontend.

## [controllers](controllers)

essa pasta contem todas funções que lidam com os request do frontend e com a database diretamente, antes de direcionar qualquer request aqui e preciso antes garantir que o request passou pela autorização em [startup](#startup) e no apropriado middlewere em [routes](#routes)

## [models](models)

nessa pasta se encontra os models para a database

## [socket](socket.io)

essa e a pasta responsavel pela conexão do socket no backend todas funções envolvendo socket devem estar aqui.

## [utils](utils)

essa pasta contem todas utilidades que podem ser reutilizadas em diferentes ocasiões.
