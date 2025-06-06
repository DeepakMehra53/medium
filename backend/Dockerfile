FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma  ./prisma
RUN  npm install 

COPY . .

EXPOSE 4000

CMD [ "npm" ,"run" , "dev" ]

