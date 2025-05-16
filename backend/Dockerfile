# 1. Java 17 기반 이미지 사용 (또는 21로 교체 가능)
FROM eclipse-temurin:17-jdk

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. Gradle 캐시와 프로젝트 복사
COPY . .

# 4. Gradle 빌드
RUN ./gradlew build --no-daemon -x test

# 5. 빌드된 JAR 실행
CMD ["java", "-jar", "build/libs/backend-0.0.1-SNAPSHOT.jar"]
