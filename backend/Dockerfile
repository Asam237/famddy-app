FROM node:16.13.1-alpine as builde
RUN mkdir /api
WORKDIR /api
ADD ./package.json ./
RUN yarn install
COPY . /api
CMD ["yarn", "start"]

