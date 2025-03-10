FROM gradle:8.7-jdk21 AS builder
WORKDIR /app
COPY --chown=gradle:gradle . .
RUN gradle clean build --no-daemon

FROM openjdk:21-jdk
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
CMD ["java", "-jar", "app.jar"]
