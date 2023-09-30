/*Creating my Database*/
DROP DATABASE IF EXISTS myDatabase;
CREATE DATABASE myDatabase;
/*Using my database*/
USE myDatabase;

# Create the user which the web app will use to access the database
DROP USER IF EXISTS 'myDatabase'@'localhost';
CREATE USER 'myDatabase'@'localhost' IDENTIFIED WITH mysql_native_password BY 'qwerty';
GRANT ALL PRIVILEGES ON myDatabase.* TO 'myDatabase'@'localhost'; 


-- Dropping tables if they already exist
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS employeeDetails;

-- Creating tables
-- This will be used in login page
CREATE TABLE users (
    user_id INT NOT NULL UNIQUE AUTO_INCREMENT,
    username varchar(8) NOT NULL UNIQUE,
    password varchar(40) NOT NULL,
    /* adding admin privileges gate to differenciate with normal user*/
    admin bool NOT NULL,
    PRIMARY KEY(user_id)
);

CREATE TABLE employeeDetails (
    /* adding user_id in employeeDetails to link with login credentials */
    user_id INT NOT NULL UNIQUE AUTO_INCREMENT,
    /* SET user id primary key */
    PRIMARY KEY(user_id),
    first_name varchar(20) not null,
    last_name varchar(25) not null,
    email varchar(25) not null,
    phone INT(11),
    hire_date date not null,
    department_name varchar(30),
    job_title varchar(30),
    street_address varchar(40) not null,
    postal_code varchar (10) not null,
    city varchar(30) not null,
    country_id char(2),
    daysLeftForLeave INT(2),
    lastPay date
);
