FROM node:alpine

RUN mkdir -p /api
WORKDIR /api

COPY package.json .
RUN npm install

COPY . .

RUN npm run prebuild
RUN npm run build

EXPOSE 3000

ENTRYPOINT [ "npm" ]
CMD ["run", "start:prod"]