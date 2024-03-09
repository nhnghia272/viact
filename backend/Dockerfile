FROM node:18-alpine
WORKDIR /app
COPY ./dist/ ./dist/
COPY ./package*.json ./
RUN npm install --only=production
CMD ["npm", "run", "start:prod"]