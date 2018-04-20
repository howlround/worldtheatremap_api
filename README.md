# World Theater Map API

## About

This project uses [Feathers](http://feathersjs.com).

## API documentation

- Main graphiql browser and documentation is located at /graphiql
- For testing with JWT authorization use https://github.com/vitalcode/auth-graphiql and run on docker locally

## Starting app

- pm2 start ecosystem.json --env production

## During setup and deveopment

- `docker-compose build`
- `docker-compose up -d`
- `docker exec -it wtmapi_api_1 zsh` to run commands on a running container (the name of the container may vary)
- `docker start -i wtmapi_api_1` to start a stopped container. During deveopment this is the command to restart the feathers server.
- `docker exec -it wtmapi_mongo_1 mongo` to use the mongo shell
- `docker-compose build` first if you change anything in the docker file (or the docker-compose.yml?)

### Starting the app

- `docker exec -it wtmapi_api_1 zsh`
- Create a development.json file with a secret (secret can be created via the feathers cli, but don't save it to default.json)
- pm2 start ecosystem.json

### If you need to manually start and stop feathers (and to view the server console log), kill the thread which will stop the container. Then run:

- `docker start -i wtmapi_api_1`
- Then use `docker exec -it wtmapi_api_1 zsh` to ssh in
- Restarting feathers: `

### Using a database in development

Our live site uses Compose.io for the mongo db. Compose uses Snapshots instead of exports which can directly be used in our container. https://www.compose.com/articles/compose-backups-going-local

Our docker-compose.yml file has a settings in the mongo container for volumes. Mapping a directory to `/data/db` will allow the mongo instance in the container to read from the snapshot directly. In our case we put the snapshot in protected_db/howlround-mongodb which is excluded from git.

## After creating a functional feathers app

- docker-compose up -d
- Hopefully once it's running you can ``docker exec -i wtmapi_api_1 zsh``

## Setting up server

### Tutorials followed

- https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04 (including all the Prerequisites at the top)

### Actual steps

- Spin up 512MB ubuntu 16.04 droplet
- `apt-get update`
- `apt-get upgrade`
- Run:
```
  RUN set -ex \
  && for key in \
    9554F04D7259F04124DE6B476D5A82AC7E37093B \
    94AE36675C464D64BAFA68DD7434390BDBE9B9C5 \
    0034A06D9D9B0064CE8ADF6BF1747F4AD2306D93 \
    FD3A5288F042B6850C66B31F09FE44734EB7990E \
    71DCFD284A79C3B38668286BC97EC7A07EDE3FC1 \
    DD8F2338BAE7501E3DD5AC78C273792F7D83545D \
    B9AE9905FFD7803F25714661B63B535A4C206CA9 \
    C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8 \
  ; do \
    gpg --keyserver ha.pool.sks-keyservers.net --recv-keys "$key"; \
  done
```
- `NODE_VERSION=8.6.0` match version in Dockerfile line 21
- Run:
```
  buildDeps='xz-utils curl ca-certificates' \
    && set -x \
    && apt-get update && apt-get install -y $buildDeps --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" \
    && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
    && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
    && grep " node-v$NODE_VERSION-linux-x64.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
    && tar -xJf "node-v$NODE_VERSION-linux-x64.tar.xz" -C /usr/local --strip-components=1 \
    && rm "node-v$NODE_VERSION-linux-x64.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt \
    && apt-get purge -y --auto-remove $buildDeps
```
- follow user setup from https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-16-04
- log in as new user
- `apt-get install zsh -y`
- `git clone git://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh`
- `cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc`
- `chsh -s /bin/zsh`
- `sudo apt-get install build-essential`
- Steps from https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04
  - `sudo apt-get install nginx`
  - `sudo ufw allow OpenSSH`
  - `sudo ufw enable`
- Clone project
- `yarn install`
- `sudo add-apt-repository ppa:certbot/certbot`
- `sudo apt-get update`
- `sudo apt-get install certbot`
- `sudo apt install python-certbot-nginx`
- `sudo ufw allow 'Nginx HTTPS'` has to set before certbot works
- `sudo certbot --nginx`
- `sudo npm install -g pm2`
- Add config/production.json with mongo credentials
- `pm2 start ecosystem.json --env production`

## Relaunching new servers

- Spin up new droplet from most recent snapshot (at the time of writing we are using the smallest size: 512 MB)
- ssh in: `ssh -i ~/.ssh/colinsagan_rsa wtm@xx.xx.xx.xx`
- Update server code: `sudo apt-get update; sudo apt-get upgrade`
- `cd /var/www/wtm_api`
- Pull new code (or branch)
- `yarn install`
- create config/production.json with mongo credentials (if using a snapshot this will be there already — check live vs. staging credentials though)
- `pm2 start ecosystem.json --env production`
- Update DNS to point to new droplet for given url: https://gaiahost.coop/myaccount/dns/zone/show/1609#A
- Confirm site is pointing at correct droplet
- Delete old droplet

## License

Copyright (c) 2017 ArtsEmerson

Licensed under the [MIT license](LICENSE).
