plugins {
  id("org.springframework.boot") version "4.1.2"
  id("io.spring.dependency-management") version "1.1.7"
  id("info.solidsoft.pitest") version "1.19.0"
  java
  jacoco
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
  finalizedBy(tasks.jacocoTestReport)
}

tasks.jacocoTestReport {
  dependsOn(tasks.test)
}

pitest {
  pitestVersion.set("1.30.1")
  junit5PluginVersion.set("1.2.3")
  targetClasses.set(listOf("com.example.*"))
  excludedClasses.set(listOf("com.example.LabAApplication"))
  outputFormats.set(listOf("HTML", "XML"))
  timestampedReports.set(false)
}
