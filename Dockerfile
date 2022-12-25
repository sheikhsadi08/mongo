FROM node:16.17.0-bullseye-slim
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . .
EXPOSE 8080
CMD [ "node", "mongo.js" ]