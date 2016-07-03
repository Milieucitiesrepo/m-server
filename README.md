[![Codeship Status for Milieucitiesrepo/m-server](https://codeship.com/projects/35ebcc50-1fd6-0134-d851-7a39504521c1/status?branch=master)](https://codeship.com/projects/160460)

## Milieu Backend Server

Using Rails to build a backend server for the Milieu city developments application.

1) Download project - go into root directory of project

2) Bundle install

3) rake db:setup (make sure you have postgres installed on your system)


    - Navigate to config/database.yml
    - Change database to preferred name, change user to your username, and password to your postgres password

4) rake db:migrate

5) rails s

6) Navigate to localhost:3000