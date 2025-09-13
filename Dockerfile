FROM --platform=linux/amd64 node:24

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn

COPY . ./

ENV NODE_ENV=development

EXPOSE 3001

CMD ["yarn","start:dev"]