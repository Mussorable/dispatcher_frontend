FROM node:latest

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .

RUN npm run build

EXPOSE 5001

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5001"]