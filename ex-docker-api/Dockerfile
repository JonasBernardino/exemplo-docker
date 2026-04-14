# Estágio 1: Build
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app
COPY . .
# Baixa as dependências e gera o JAR
RUN ./mvnw clean package -DskipTests

# Estágio 2: Runtime (Imagem final muito menor)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
# Copia apenas o JAR gerado no estágio anterior
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]