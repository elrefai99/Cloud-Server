FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN npm install --frozen

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:prod", "--host", "0.0.0.0"]
