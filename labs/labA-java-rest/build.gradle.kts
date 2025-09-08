plugins {
  id("org.springframework.boot") version "3.5.5"
  id("io.spring.dependency-management") version "1.1.7"
  java
}

group = "com.example"
version = "0.0.1-SNAPSHOT"

java { 
  toolchain { 
    languageVersion.set(JavaLanguageVersion.of(21)) 
  } 
}

repositories { mavenCentral() }

dependencies {
  implementation("org.springframework.boot:spring-boot-starter-web")
  testImplementation("org.springframework.boot:spring-boot-starter-test")
  testRuntimeOnly("org.junit.platform:junit-platform-launcher")
  testImplementation("org.assertj:assertj-core:3.26.3")
}

tasks.test { 
  useJUnitPlatform() 
}
