# University Housing Project


# Full Stack Project: Angular + Spring Boot + MySQL

A complete full-stack application with Angular frontend, Spring Boot backend, and MySQL database.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)



## Prerequisites
- [Visual Studio Code](https://code.visualstudio.com/download)
- [IntelliJ IDEA](https://www.jetbrains.com/idea/download/) (Community Edition)
- [Java JDK 17](https://www.oracle.com/java/technologies/downloads/)
- [OR Go to this link to video to download Java JDK 23 and IntelliJ IDEA](https://youtu.be/O3TXIwY2eYk?si=Phwaj8cMgeRJXUqs)
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)
- [Node.js & npm](https://nodejs.org/en/download/)


## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/nourElbassuny/University-Housing-for-Al_azhar-university.git
```
### 2.2. Backend Setup (Spring Boot)
1. Open the backend project in IntelliJ IDEA.
2. Make sure JDK 17 or later is configured.
3. Wait for dependencies to download
4. Update your application.properties file with your database credentials [see below](#EnvironmentProperties).

### 2.3. Frontend Setup (Angular)
1. Open the frontend part in Visual Studio Code.
2. open terminal and write 
```bash
  npm install
```
### 2.4 Database Setup (MySQL)
Open MySQL Workbench

Create new connection:
- Hostname: 127.0.0.1 [localhost]
- Port: 3306
- Username: root
- Password: [your_password]

## Configuration

## EnvironmentProperties
Backend (Spring Boot)
Update the application.properties file in your Spring Boot project with:
go to this path --> Areeb-event-backend/src/main/resources/application.properties

```properties

spring.application.name=backend-university-housing
server.port=8084
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3305/universityhousingTest?createDatabaseIfNotExist=true
spring.datasource.username=springstudent
spring.datasource.password=springstudent
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect


spring.servlet.multipart.max-file-size=5MB
spring.servlet.multipart.max-request-size=5MB
application.security.jwt.secret-key={{secret_key}}

application.security.jwt.expiration=86400000

application.security.jwt.refresh-token.expiration=604800000


```
Make sure the database name, username, password and database port  match your MySQL setup.
Make sure this port 8084 is available 


## Running the Application
1. Start MySQL Server
- Ensure MySQL service is running (XAMPP/WAMP or native MySQL service)

2. Run Spring Boot Backend
- In IntelliJ:
   1.Open src/main/java/com/areeb/Areeb/event/AreebEventApplication.java
   2.Click Run ▶️
  
3. Run Angular Frontend
   1. Open the frontend part in Visual Studio Code.
   2. open terminal and write 
```bash
  ng serve
```
Access the application:

Frontend: http://localhost:4200

Backend: http://localhost:8084

after that go to this link http://localhost:4200

you will see main page because the database is an empty 



ADD More than four events with the same categorey to see Pagination feature

 

 

 








