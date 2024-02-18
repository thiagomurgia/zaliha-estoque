# Estágio 1: Construção
FROM node:14 AS builder

# Configurar o diretório de trabalho
WORKDIR /usr/src/app

# Copiar arquivos de definição de dependências e instalar dependências
COPY package*.json ./
RUN npm install

# Copiar o esquema do Prisma para a pasta prisma
COPY prisma ./prisma

# Gerar o cliente Prisma
RUN npx prisma generate

RUN npx prisma migrate deploy

# Copiar o restante dos arquivos da aplicação
COPY . .

# Compilar o TypeScript para JavaScript
RUN npm run build

# Estágio 2: Execução
FROM node:14

WORKDIR /usr/src/app

# Copiar a build do estágio anterior
COPY --from=builder /usr/src/app/build ./build

# Copiar apenas as dependências necessárias para execução
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copiar o esquema do Prisma e o cliente gerado para a pasta de build
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/node_modules/@prisma/client ./node_modules/@prisma/client

# Definir variáveis de ambiente (substitua pelos valores reais ou configure-as externamente)
ENV PORT=3333 \
    SECRET_JWT=d36c6bab8bbc90b72ab1e01f0669aa28 \
    EMAIL_USER=tzoppeim@live.com \
    EMAIL_PASSWORD=Lu@010708 \
    DATABASE_URL=mysql://rezis:rezis@rezis-db-1:3306/rezis?schema=public

# Expôr a porta que a aplicação usa
EXPOSE $PORT

# Comando para executar a aplicação
CMD ["node", "build/server.js"]