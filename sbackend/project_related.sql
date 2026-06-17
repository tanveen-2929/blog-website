create database blogdb;
use blogdb;
create table admin(Id int auto_increment, email varchar(100) Not Null unique, password varchar(255) Not Null, primary key(Id));
desc admin; 
create table category(Id int auto_increment, category varchar(100) Not Null unique, icon varchar(100) Not Null,short_des varchar(600), primary key(Id));
desc category; 
create table user(Id int auto_increment, name varchar(100) Not Null, email varchar(100) Not Null unique, password varchar(255) Not Null,phone varchar(10),gender varchar(10),dob date,city varchar(10),bio varchar(1000),image varchar(10),date timestamp DEFAULT current_timestamp,primary key(Id));
desc user; 
create table article(Id int auto_increment,title varchar(1000) Not Null,category integer Not Null,user integer Not Null,content varchar(10000),image varchar(10),date timestamp DEFAULT current_timestamp,publish integer default 0,primary key(Id),foreign key(category) references category(Id),foreign key(user) references user(Id));
desc article; 

