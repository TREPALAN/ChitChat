# Guia dos componentes

## [authentication](authentication)

essa pasta contem os componentes de altenticação
login e logout

## [cards](cards)

essa pasta contem alguns "cards" de diferentes elementos da pagina que se repentem repetidas vezes mas com diferente data, para cada `card` tem um `cardList`que e usado pra ser reutilizado em cenarios diferentes como por exemplo uma menssageCard pode e usada tanto em menssagems privadas quanto em menssagens publicas nesse caso e usado `messageCardList` para ambos.

ex:
![example](../../../prev.png)

> as mensagems são cards que se repetem varias vezes em uma conversa

**[messageCard](cards/messageCard.js)**

messageCard e o card que e mostra para o user cada mensagem recebida ou enviada em uma conversa privada ou em grupo ela contem duas classes possiveis **_bubble-right_** se o usuario mandou a mensagem ou **_bubble-left_** se usuario recebeu a menssagem

**[groupCard](cards/groupCard.js)**

groupCard e utilizado para exibir informações de um grupo checar qual e a relação do usuario com o grupo, é se o usuario for membro permitir o usuario entrar no referente [GroupChat](./chat/Group/groupChat.js)
utilizando do _id_ como parametro

**[userCard](cards/userCard.js)**

como no **groupChat** esse componente e utilizado para exibir informações de um usuario a relação do request user e o atual objeto de usuario permitir mandar solicitação de amizade removerda lista, entrar no [PrivateChat](./chat/Private/PrivateChat.js) etc.

## **[chat](chat)**

essa pasta contem os chats componentes de chat tanto de grupo quanto privado

## **[home](home)**

essa pasta contem todos componentes da pagina incial
