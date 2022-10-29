## Routes

GET /
index

GET /
about (stretch)

### User

GET /
profile

POST /login
GET /login

POST /register
GET /register

POST /logout

(what about editing profile? Stretch - POST)

### Lists

POST /lists
create new list

GET /lists
read all

GET /lists/:id
read one

PUT /lists/:id
update one

DELETE /lists/:id

### Tasks

GET /task
view form to create task

POST /task
create new task

PUT /task/:id
edit one task

DELETE /task/:id
