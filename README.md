# Milieu

[![Codeship Status for Milieucitiesrepo/m-server](https://codeship.com/projects/35ebcc50-1fd6-0134-d851-7a39504521c1/status?branch=master)](https://codeship.com/projects/160460)

### Installation & Usage
#### Start dev env without docker compose

1. Clone the repository to your local machine: `git clone https://github.com/Milieucities/m-server`.

2. Bundle the gemfile `bundle install`. Note you may have to install bundler `gem install bundler`.

3. a(Optional) Either download and start up a postgre db

   b(Optional) Or start up a docker postgres db with command if you familiar with docker

   ```docker run --name postgresDb -p 5432:5432 -e POSTGRES_PASSWORD=somepassword -d postgres````

   where `somepassword` is the password you use for postgres and set in the `config/database.yml` file
   in Step 4

   When ever you want to nuke the postgres db, run

   ```docker stop postgresDb && docker rm postgresDb```

4. Set up your `config/database.yml` to configure with postgres and run `rake db:create && rake db:migrate`.

5. a(Optional) Either download and start up a redis

   b(Optional) Or start up a docker redis with command if you familiar with docker

   ```docker run --name redis -p 6379:6379 -d redis````

   When ever you want to nuke the postgres db, run

   ```docker stop redis && docker rm redis```

5. Install node packages `npm install`.

6. You're done! Run `foreman start` or `heroku local` and you're ready to start developing!

### Start dev env with docker compose (Temporarily not work)

1. Install Docker on Mac, Linux or Windows 10 (Windows 7, 8 installation is pretty complex)

2. Clone the repository to your local machine: `git clone https://github.com/Milieucities/m-server`.

3. Set up your `.env` and `config/database.yml`. See the .example file as the example.

4. Go to your local repository directory and build docker image: `docker-compose build`.

5. Start with `docker-compose up`.

6. Open another terminal to run `docker-compose run web rake db:create` & `docker-compose run web rake db:migrate` & `docker-compose run web rake db:seed`

### REST API (for non authorized users)

##### GET /dev_sites

Returns a collections of development sites, ordered by ward number.

###### Parameters

- **limit** (*optional*): The limit of development site you want returned. Default is 20 if the **page** is set.
- **page** (*optional*): The page number of development site. Default is 0 if the **limit** is set.

*Note: if limit and page are both bot provided then all development sites are returned.*

###### Result

Array of development sites. *Check out the result of /dev_sites/:id*

##### Get /dev_sites/:id

Returns a development site.

###### Parameters

- **id** : The id of the development site.

###### Result

```json
    {
        "id":998,
        "devID":"D07-12-13-0216",
        "application_type":"Site Plan Control",
        "title":null,
        "status":"Application Approved",
        "status_date":"June 20, 2014",
        "address":"1234 Prestone Drive, Ottawa, Ontario, Canada",
        "images":[],
        "description":"New single storey addition to existing one storey brick and siding clad",
        "ward_name":"ORLEANS",
        "ward_num":1,
        "image_url":"https://maps.googleapis.com/maps/api/streetview?size=600x600&location=1234 Prestone Drive, Ottawa, Ontario, Canada&key=AIzaSyAwocEz4rtf47zDkpOvmYTM0gmFT9USPAw",
        "hearts":null,
        "updated_at":"2016-07-15 22:54:09 UTC",
        "latitude":45.479557990068,
        "longitude":-75.503323992099,
        "addresses":[
            {
                "id":1414,
                "street":"1234 Prestone Drive, Ottawa, Ontario, Canada"
            }
        ],
        "statuses":[
            {
                "id":3173,
                "status":"Comment Period in Progress",
                "status_date":"2013-12-12 00:00:00 UTC"
            },{
                "id":3174,
                "status":"Application on Hold",
                "status_date":"2014-01-21 00:00:00 UTC"
            },{
                "id":3175,
                "status":"Application Approved",
                "status_date":"2014-06-20 00:00:00 UTC"
            }
        ],
        "comments":[]
    }
```

##### GET /dev_sites/:id/images

Returns an array of images that have uploaded via Milieu.

###### Parameters

- **id** : The id of the development site.

##### Result

```json
    {
        "images":
            [
                {
                    "src":"https://milieu.s3.amazonaws.com/images/dev_site/images/1390/books-alot-of-books-dark.jpg",
                    "w":2560,
                    "h":1440
                },{
                    "src":"https://milieu.s3.amazonaws.com/images/dev_site/images/1390/books-alot-of-books.jpg",
                    "w":2560,
                    "h":1440
                },{
                    "src":"https://milieu.s3.amazonaws.com/images/dev_site/images/1390/clearmountains.jpg",
                    "w":2880,
                    "h":1800
                }
            ]
    }
```

##### GET /events

Returns a collections of events.

###### Parameters

- **limit** (*optional*): The limit of events you want returned. Default is 20 if the **page** is set.
- **page** (*optional*): The page number of events. Default is 0 if the **limit** is set.

*Note: if limit and page are both not provided then all events are returned.*

###### Result

Array of events. *Check out the result of /dev_sites/:id*

##### Get /events/:id

Returns a event.

###### Parameters

- **id** : The id if the event.

###### Result

```json

{
    "id":11,
    "title":"Armstrong Street Area Consultation Walkabout",
    "description":"The public is invited to join Councillor Jeff Leiper...",
    "time":"10:00am-12:00pm",
    "date":"2016-06-25",
    "images_cache":null,
    "location":"294 Carruthers Ave, Ottawa, ON K1Y 2Y8",
    "contact_email":"john.thomson@ottawa.ca",
    "contact_tel":" 6135802424 ex 28884",
    "image_url":"https://milieu.s3.amazonaws.com/images/event/images/11/web_Armstrong_-_possible_cover_2.JPG",
    "longitude":-75.7271582,
    "latitude":45.4028173
}

```
