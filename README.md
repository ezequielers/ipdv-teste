#  Teste IPDV

## Docker
Para rodar os containers de API e App será necessário executar o seguinte comando:
```
cd docker
docker-compose up
```

## Desenvolvimento backend

### Instalação:

Dentro do diretório _docker_ será necessário executar o seguinte comando:
```
docker exec -ti ipdv_app_api npm run migrate:run
```

Após criado os serviços e a migração do serviço já ter iniciado, o App poderá ser acessado pela url:
```
http://localhost:8080 -> WEB
http://localhost:3000 -> API
```