FROM node:20-slim

WORKDIR /app

COPY package* .
COPY ./prisma .

RUN  npm install 
RUN npx prisma generate

COPY . .

EXPOSE 4000

CMD [ "npm" ,"run" , "dev" ]

