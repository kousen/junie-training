plugins {
  id("org.springframework.boot") version "4.1.2"
  id("io.spring.dependency-management") version "1.1.7"
  java
}

group = "com.example"
version = "0.0.1-SNAPSHOT"

java { 
  toolchain { 
    languageVersion.set(JavaLanguageVersion.of(25)) 
  } 
}

repositories { mavenCentral() }

dependencies {
  implementation("org.springframework.boot:spring-boot-starter-webmvc")
  implementation("org.springframework.boot:spring-boot-starter-validation")
  testImplementation("org.springframework.boot:spring-boot-starter-webmvc-test")
  testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.test { 
  useJUnitPlatform() 
}
