FROM ubuntu:bionic

RUN apt-get update && apt-get -y upgrade
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs wait-for-it

COPY . /src
WORKDIR /src

RUN npm i -g yarn
RUN yarn install
RUN cd client && yarn install

RUN yarn client:build
# CMD ["/bin/bash"]

RUN mkdir public && cp -Rf ./client/build ./public

CMD ["wait-for-it", "KeyManager:3220", "--", "node", "index.js"]