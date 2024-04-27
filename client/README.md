# Frontend

esse readme explica a função de cada pasta e arquivo nesse projeto qual tecnogias são usadas e porque são usadas.
Esse documento e divido por cada pasta no root do projeto e em cada pasta o resumo de cada arquivo ou pasta

#### todas pastas se encontram em /src

## [index](src/index.js) <a id="index"></a>

o index não tem nenhuma modificação tirando a importação
dos [interceptadores](#interceptors) de response e request implementados usando a biblioteca [axios](https://axios-http.com), o motivo da importação no index e pra garantir que a autentificação do usuario aconteça na parte mais alta do projeto

## [App](src/App.js) <a id="App"></a>

o App e responsavel por todo routing do projeto, o app retorna um BrowserRouter com a logica usada renderizar os components dependendo da localização(path) do usuario.

`top level components`

    {isLogedin() ? <NavigationBar /> : null}
    {isLogedin() ? <SoccketHook /> : null}

esses são dois componentes que vão ser carregados em todo App desde que o usuario esteja authenticado, o primerio sendo a barra de navegação e o segundo sendo o custom hook que mantem o [socket](#socket) conectado o tempo todo permitindo a implementação de notficações instantaneas em todo aplicativo.

`Routes`

     <Routes>

Dentro de Routes existem Varios `Route` que tem o `path` que controla a redenrização de componentes de acordo com a localização/ do usuario, todo `Route` aponta qual `element` deve ser renderizado.

    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

- Os primeiros são os responsaveis por renderizar login e logout, esses são os unicos componentes que não requerem que o usuario esteja altenticado.

      <Route element={<ProtectedRoutes />}>
          ...varios route
      </Route>

- Esse Route usa que utiliza o componente ProtectedRoutes que usado na [Proteção de Routes](#auth) que confere se o usuario esta autenticado e em caso negativo muta o path para `/login`, isso significa que todo outro Route dentro desse route so vai ser acessível se o usuario estiver autenticado.

## [Auth](src/auth/) <a id="auth"></a>

dentro dessa pasta se encontra o [ProtectedRoutes](src/auth/ProtectedRoutes.js) que e responsavel por cheacar
se o usuario esta autenticado antes do app rendenrizar qualquer componente, para isso e utilizado um dos [utils](#utils)

## [Component](src/component/) <a id="component"></a>

E aqui é onde todos componentes da UI estão localizados.

- [documentação](src/component/COMPONENT.md) dos componentes

## [Icons](src/icons/) <a id="icons"></a>

essa pasta e onde se encontra todos os icones do projeto todos icones são do [bootstrap icons](https://icons.getbootstrap.com)

## [Interceptors](src/interceptors/) <a id="interceptors"></a>

essa pasta e responsavel pela admistração da API utilizando da biblioteca [axios](https://axios-http.com)

- **[axios.js](src/interceptors/axios.js)**

  - esse arquivo e responsavel por retornar a `api` com o url para o backend

- **[requestInterceptor.js](src/interceptors/requestInterceptor.js)**

  - esse arquivo intercepta todos os requests feitos pela `api` permitindo fazer auterações do mesmo, a sua função principal e inserir o token de autenticação em todos request

- **[requestInterceptor.js](src/interceptors/responseInterceptor.js)**

  - esse arquivo intercepta todos response recebidos pela `api`, nele e possivel decidir oque fazer com cada status de response, a principal utilização e refrescar o token sempre que o mesmo se encontra expirado

## [Reducers](src/reducers/) <a id="reducers"></a>

essa pasta contem todos Reducers usados no porjeto

- **[groupMembersChangeReducer](src/reducers/groupMembersChangeReducer.js)**

  - esse reducer e usado no [groupMembers](./src/component/chat/Group/groupMembers.js) componente ele e utilizado para acompanhar alterações de membros feitas em um grupo.

  - Esse arquivo deve retornar uma array com os já alterados members e o novo member com uma action _add_ ou _remove_

  exemplo de retrun:

  > [...members, { member: action.member, action: "add" }]

- **[GroupMessagesReducer](src/reducers/GroupMessagesReducer.js)** e **[PrivateMessagesReducer](src/reducers/PrivateMessagesReducer.js)**

  - Esses reducers são utilizados nos componente [groupChat](./src/component/chat/Group/groupChat.js) e [PrivateChat](./src/component/chat/Private/PrivateChat.js) , eles tem duas funções

    1. cheacar o case que o reducer foi chamado e depemdendo do case atuar uma cheacagem se a mensagem foi marcada como visualizada, se não estiver marcada como visualizada solicitar a marcação como visualizada no server e no proprio objeto.

    2. organizar as mensagens recebidas pela api em _old_, _messages_ e _new_

       - **old**: para quando o usuario carrega antigas mensagens

       - **messages**: messagens no geral que não são novas nem recem carregadas

       - **new**: novas mensagens recebidas ou enviadas

## [Socket](src/socket/) <a id="socket"></a>

Essa pasta e usada pra conectar e manejar o [socket](https://socket.io) do user

- **[socket](src/socket/socket.js)**

        esse arquivo e contem funções utilizando o socket

- **[socketHook](src/socket/socketHook.js)**

        esse custom Hook e responsavel por manter a conexão com o socket entre todo o app. O socket utiliza do mesmo token que o axios oque significa que socket e atualizado sempre que o token e atualizado

## [Utils](src/utils/) <a id="utils"></a>

essa e pasta contem funções que podem ser reutilizadas em diversos components.

- **[getRefreshToken](src/utils/getRefreshToken.js)**

  - essa e uma função assíncrona que retorna uma promise,
    a função dela e atualizar o token ela troca o valor do local storage pro novo e refrescado token

- **[isLogedin](src/utils/isLogedin.js)**

  - uma função que utiliza do locaStorage pra verificar se o usuario esta logados, ela e pensada pra elementos da UI não para mais complexas funcionalidades

    _não utilizar em funções importantes sem antes checar a autencidade to token com o backend_

- **[isUserOnlineHook](src/utils/isUserOnlineHook.js)**

  esse custom Hook utiliza de uma função de [socket.js](src/socket/socket.js) para acompanhar o status de algum usuario,
  essa função utiliza um username como argumento e retorna um boolean true or false atualiza as informações a cada 5 segundos.

  _um exemplo de uso e o [PrivateChat](src/component/chat/Private/PrivateChat.js) que utiliza essa função para cheacar se o o usuario esta online_

- **[itenPagination](src/utils/itenPagination.js)**

  esse arquivo e pensado para paginar uma array que seja muito longa ele precisa da array atual(itens), numero de objetos para cada pagina(itemsPerPage) e qual pagina voce esta(currentPage) e ele retorna uma array cortada de acordo com os parametros

  - **[loginFunction](src/utils/loginFunction.js)** e **[logoutFunction](src/utils/logoutFunction.js)**

  A função de login utiliza do username e password para autenticar o usuario e se tudo der certo salvar informações do usuario e o token de autenticação no localStorage, logout desconecta o usuario e limpa o localSotarage.
