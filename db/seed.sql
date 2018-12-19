DROP DATABASE IF EXISTS proma_db;
CREATE DATABASE proma_db;
\c proma_db 


CREATE TABLE users (
    id serial primary key,
    username varchar NOT NULL UNIQUE,
    password varchar ,
    position varchar , 
    email varchar NOT NULL UNIQUE
);
CREATE TABLE clients (
    id serial primary key ,
    name varchar ,
    phone varchar(10) NOT NULL UNIQUE, 
    adress varchar  , 
    email varchar NOT NULL UNIQUE , 
    user_id int not null,
    foreign key(user_id) references users on delete cascade
);

CREATE TABLE groups(
    id serial primary key ,
    name varchar    
);

CREATE TABLE members  (
    id serial primary key ,
    name varchar,
    spechlized varchar ,
    phone varchar(10) NOT NULL UNIQUE , 
    email varchar NOT NULL UNIQUE,

    user_id int not null ,
    group_id int not null,
    foreign key(user_id) references users on delete cascade, 
    foreign key(group_id) references groups on delete cascade    
);


CREATE TABLE projects  (
    id serial primary key ,
    name varchar , 
    description text , 
    field varchar,
    note varchar , 
    start_time time , 
    end_time time , 
    cost Float  , 
    status varchar ,
    client_id int not null ,
    group_id int not null,
   foreign key(client_id) references clients on delete cascade,
    foreign key(group_id) references groups on delete cascade 
);

CREATE TABLE tasks  (
    id serial primary key ,
    name varchar , 
    description text , 
    note varchar , 
    start_time time , 
    end_time time , 
    status varchar , 
    project_id int not null ,
    member_id int not null,
    foreign key(project_id) references projects on delete cascade, 
   foreign key(member_id) references members on delete cascade
);

INSERT INTO users (username , password , position , email) values
 ('moh' , '123' , 'member' , 'm@gmail.com') , 
 ('ha' , '123' , 'client' , 'h@gmail.com') , 
 ('ka' , '123' , 'member' , 'k@gmail.com') , 
 ('ra' , '123' , 'client' , 'r@gmail.com');

INSERT INTO clients (name , phone , adress , email ,user_id) values
 ('hala' , 0550060055 , 'jeddah' , 'h@gmail.com' , 2),
 ('rawan' , 0550700055 , 'jeddah' , 'r@gmail.com' , 4);

INSERT INTO groups (name ) values
 ('c1' );

 INSERT INTO members (name , phone ,spechlized ,  email , user_id , group_id) values
 ('mohammed' , 0550000032,'back end' , 'm@gmail.com' , 1 , 1),
 ('khaled' , 0550030032,'front end' , 'k@gmail.com' , 3 , 1);

 INSERT INTO projects (id , name , description , field ,  note , start_time , end_time , cost , status ,client_id ,group_id) values
 (1 ,'eco_pin' ,'application for volunteers and environment', 'social' ,'for NASA hachathon', '20:20' , '3:30', 40 ,'in progress' ,2 ,1),
 (2 ,'game' ,'application for misk', 'personal' ,'for misk', '20:20' , '3:30', 56.8 ,'done' ,1 ,1);

 INSERT INTO tasks (name , description ,  note , start_time , end_time , status , project_id , member_id) values
 ('check backend' ,'all js pages ', 'must be fast as you can ' , '20:20' , '3:30','active' , 1 , 1 ),
 ('crate views' ,'all html pages ', 'must be fast as you can ' , '20:20' , '3:30', 'active' , 2 , 2);

