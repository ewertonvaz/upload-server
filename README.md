# Upload Server with Node.js and Amazon-S3

# Instalação

Executar os comandos:

```
git clone https://github.com/ewertonvaz/upload-server.git
cd upload-server
cp .env.sample .env
npm install
npm start
```

### Documentação da API

## Rotas Servidor

`GET /`

Página inicial

`GET /env`

Obtém página com o environment do servidor.

## Rotas para arquivos armazenados no fs do Node

`PUT /file/upload`

Envia um arquivo para o servidor local, o arquivo ficará no file system do server Node.
Para envio deve ser utilizado um **form-data** contendo os dados do arquivo.
Quando bem sucedido devolve o código 200 e um payload com o novo nome que foi dado ao arquivo pelo server.

`PUT /file/download/:fileName`

Obtém o arquivo cujo nome for passado como parâmetro.

## Rotas para Arquivos armazenados na Amazon S3

Para utilizar estas rotas devem ser informado no arquivo .env as seguintes variáveis de ambiente:

```
BUCKET
AWS_REGION
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_SESSION_TOKEN
```

`PUT /s3`

Envia um arquivo para o servidor Amazon S3.
Para envio deve er utilizado um **form-data** contendo os dados do arquivo.
Quando bem sucedido devolve o código 200 e um payload com o novo nome que foi dado ao arquivo pelo server.

`GET /s3/:fileName`

Obtém o arquivo cujo nome for passado como parâmetro.

`DELETE /s3/:fileName`

Apaga o arquivo cujo nome for passado como parâmetro.
