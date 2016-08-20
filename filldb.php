<?php

    class MyDB extends SQLite3
     {
        function __construct()
        {
           $this->open('home.db');
        }
     }

     $db = new MyDB();

     if(!$db){
        echo $db->lastErrorMsg();
     } else {
        echo "Opened database successfully\n";
     }

   // Insert film into table
   $insertFilm = $db->prepare('INSERT INTO LOCATIONS (location_name) VALUES (:name)');
   $insertFilm->bindValue(':name', 'ROOM 1', SQLITE3_TEXT);
   $ins = $insertFilm->execute();
   if(!$ins) {
     echo $db->lastErrorMsg();
   }
   else {
     echo "Insert film completed";
     $matchcheck = false;
   }

   $insertFilm = $db->prepare('INSERT INTO LOCATIONS (location_name) VALUES (:name)');
   $insertFilm->bindValue(':name', 'ROOM 2', SQLITE3_TEXT);
   $ins = $insertFilm->execute();
   if(!$ins) {
     echo $db->lastErrorMsg();
   }
   else {
     echo "Insert film completed";
     $matchcheck = false;
   }


   $insertFilm = $db->prepare('INSERT INTO LOCATIONS (location_name) VALUES (:name)');
   $insertFilm->bindValue(':name', 'ROOM 3', SQLITE3_TEXT);
   $ins = $insertFilm->execute();
   if(!$ins) {
     echo $db->lastErrorMsg();
   }
   else {
     echo "Insert film completed";
     $matchcheck = false;
   }


   // Insert process into table
   $insertProc = $db->prepare('INSERT INTO DEVICES (location_id, name, pin, component) VALUES (:filmid, :name, :pin, :component)');
   $insertProc->bindValue(':filmid', 1, SQLITE3_INTEGER);
   $insertProc->bindValue(':name', 'LED STRIP (white)', SQLITE3_TEXT);
   $insertProc->bindValue(':pin', 8, SQLITE3_INTEGER);
   $insertProc->bindValue(':component', 1, SQLITE3_INTEGER);
   $ins = $insertProc->execute();
   if(!$ins) {
     echo $db->lastErrorMsg();
   }
   else {
     echo "Insert process completed";
     $matchcheck = false;
   }



   $processesTable = 'CREATE TABLE COMPONENTS (componentid INTEGER PRIMARY KEY, name TEXT NOT NULL)';

   // Insert film into table
   $insertFilm = $db->prepare('INSERT INTO COMPONENTS (name) VALUES (:name)');
   $insertFilm->bindValue(':name', 'RELAY', SQLITE3_TEXT);
   $ins = $insertFilm->execute();
   if(!$ins) {
     echo $db->lastErrorMsg();
   }
   else {
     echo "Insert film completed";
     $matchcheck = false;
   }



 ?>
