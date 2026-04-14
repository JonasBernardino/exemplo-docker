FROM eclipse-temurin:21-jdk-alpine

# Define o diretório de trabalho dentro do container. 
# Tudo o que fizermos daqui para frente acontece dentro da pasta /app.
WORKDIR /app

# Copia a pasta .mvn (configurações do Maven Wrapper) da sua máquina para o container.
COPY .mvn .mvn

# Copia o executável do Maven (mvnw) para a raiz do diretório /app.
COPY mvnw .

# Copia o arquivo de dependências (pom.xml) para o container.
COPY pom.xml .

# Copia toda a pasta de código fonte (src) para o container.
COPY src src

# Dá permissão de execução para o Maven Wrapper (necessário em sistemas Linux/Docker).
RUN chmod +x mvnw

# Executa o comando de build: 
# clean (limpa builds antigos), package (gera o JAR), -DskipTests (pula os testes para ir mais rápido).
RUN ./mvnw clean package -DskipTests

# Apenas documenta que o container vai "ouvir" na porta 8080. 
# Não abre a porta magicamente, mas avisa ao Docker e ao usuário qual porta usar.
EXPOSE 8080

# O comando que realmente inicia a aplicação quando o container sobe.
# Ele executa o Java apontando para o arquivo .jar gerado na pasta target.
CMD ["java", "-jar", "target/ex-docker-api-0.0.1-SNAPSHOT.jar"]