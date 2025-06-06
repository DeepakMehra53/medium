FROM node:20-slim


WORKDIR /app

COPY package*.json ./
RUN  npm install && npm cache clean --force

COPY . .

RUN npx prisma generate
    


EXPOSE 4000

CMD [ "npm" ,"run" , "dev" ]

