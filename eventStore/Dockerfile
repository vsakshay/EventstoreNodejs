FROM node:14
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
ARG count
ENV count=${count}
ARG date
ENV date=${date}
ARG format
ENV format=${format}
# Create app directory
WORKDIR /app
COPY package*.json ./

RUN npm install
# Bundle app source
COPY . .
CMD node index.js --count=$count --date=$date --fileformat=$format