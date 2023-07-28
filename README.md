# POC Terraform

Este é um projeto baseado em Docker que exige certas variáveis de ambiente para ser executado corretamente.

## Variáveis de Ambiente

Para configurar as variáveis de ambiente necessárias, faça uma cópia do arquivo `.env.example` fornecido e renomeie-o para `.env`. 

## Executando o Projeto

Com as variáveis de ambiente corretamente configuradas, você pode executar o projeto usando o Docker Compose. No terminal, navegue até a pasta raiz do projeto e execute o seguinte comando:


Esse comando iniciará todos os serviços definidos no arquivo `docker-compose.yml` e configurará qualquer rede ou volume necessário.

Se você fizer alterações no projeto e precisar reconstruir o contêiner Docker, pode fazer isso com:

`docker-compose up`

Isso forçará o Docker Compose a construir novamente os contêineres desde o início.

## Suporte

Se tiver problemas para configurar ou executar este projeto, por favor, abra um problema no GitHub e faremos o possível para ajudar.
