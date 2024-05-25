FROM node:21-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

RUN addgroup -g 1001 nodeuser && adduser -u 1001 -G nodeuser -s /bin/sh -D nodeuser

COPY  --chown=nodeuser:nodeuser . .

USER nodeuser

CMD ["node", "index.js"]
