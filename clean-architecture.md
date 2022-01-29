# Clean Architecture

Temos 4 Camadas:

## 1° Camada: Entities

- Essa camada contém todas as classes de dominio com as regras de negocios do dominio
  Essa é a parte central do sistema, as regras de negocios são chaves pro pojeto, as regras de negocios não dependem de lingaugem ou sistema, elas não sabem quem os usam e são puras, elas servem para definição e estrutura.
  Imagine: Você ta fazendo seu sistema de aulas pro seu curso, as regras de negocios que definem o que acontece quando um usuario termina o curso, quando alguém que já tem o curso ta elegivel a promoção e etc, essas regras no geral servem aos casos de usos

## 2° Camada: Casos de Usos

- Essa camada define as operações das regras de negocios, são as features do seu sistema.
  pense que nessa plataforma do curso, você irá registrar seus alunos, enviar emails sobre as promoções, recomendar aulas ou conteudos, essa camada também é pura e independe de quem o chama

## 3° Camada: Adaptadores de interface

- Essa camada recebe os Controladores, Presenters, gateways de bancos de dados
  todos adaptadores que fazem com que nossos casos de usos (features) conversem com tecnologias especificas e executem as regras de negocios
  Pense por exemplo na pasta que por padrão é chamada de `repositories` ela vai ser responsavel por executar a ligação com o banco de dados, as ações, ela faz os puts, gets, posts

## 4° Camada:
