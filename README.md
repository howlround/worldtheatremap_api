# World Theater Map API

## About

This project uses [Feathers](http://feathersjs.com).

## Starting app

- pm2 start ecosystem.json --env production

## During setup and deveopment

- `docker-compose build`
- `docker-compose up -d`
- `docker exec -it wtmapi_web_1 zsh` to run commands on a running container (the name of the container may vary)
- `docker start -i wtmapi_web_1` to start a stopped container. During deveopment this is the command to restart the feathers server.
- `docker exec -it wtmapi_mongo_1 mongo` to use the mongo shell
- `docker-compose build` first if you change anything in the docker file (or the docker-compose.yml?)

### If you need to manually start and stop feathers (and to view the server console log), kill the thread which will stop the container. Then run:

- `docker start -i wtmapi_web_1`
- Then use `docker exec -it wtmapi_web_1 zsh` to ssh in

## After creating a functional feathers app

- docker-compose up -d
- Hopefully once it's running you can ``docker exec -i wtmapi_web_1 zsh``
