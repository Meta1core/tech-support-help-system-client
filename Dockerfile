# Define node version
FROM node:16-alpine as build
# Define container directory
WORKDIR /usr/src/app
# Copy package*.json for npm install
COPY package*.json ./
# Run npm clean install, including dev dependencies for @angular-devkit
RUN npm ci
# Run npm install @angular/cli
RUN npm install -g @angular/cli

RUN npm install --save @angular/material @angular/cdk
# Copy all files
COPY . .
# Run ng build through npm to create dist folder
RUN npm run build --prod
# Define nginx for front-end server
FROM nginx:1.15.8-alpine
# Copy dist from ng build to nginx html folder
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /usr/src/app/dist/tech-support-help-system-client /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
