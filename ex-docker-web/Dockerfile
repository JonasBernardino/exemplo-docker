# Usa uma imagem Node leve para instalar dependências e gerar o build do React
FROM node:20-alpine AS build

# Define a pasta de trabalho dentro do container
WORKDIR /app

# Copia primeiro os arquivos de dependência
# Isso melhora o cache do Docker: se o código mudar, mas o package.json não,
# o passo de instalação pode ser reaproveitado
COPY package*.json ./

# Instala as dependências do projeto
# Para projetos com package-lock.json, npm ci é mais previsível que npm install
RUN npm ci

# Copia o restante dos arquivos da aplicação para dentro do container
COPY . .

# Gera a versão de produção da aplicação React
# No Vite, normalmente a saída vai para a pasta /dist
RUN npm run build


# Usa uma imagem leve do Nginx para servir os arquivos estáticos gerados
FROM nginx:alpine

# Copia os arquivos gerados no build para a pasta padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta 80 do container
EXPOSE 80

# Inicia o Nginx em primeiro plano
# Isso é necessário para o container continuar em execução
CMD ["nginx", "-g", "daemon off;"]