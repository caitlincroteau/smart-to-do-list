## Smart To Do List Project

Smart To Do List is a multi-page app that uses Open AI to automatically categorize your tasks for you.

This app was designed as a Midterm project by Sarah Moss, Billy Wong, and Caitlin Croteau for Lighthouse Labs' Web Development program.

## Getting Started

1. [Create](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) a new repository using this repository as a template.
2. Clone your repository onto your local device.
3. Install dependencies using the npm install command.
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
6. Check the db folder to see what gets created and seeded in the SDB
7. Create the .env by using .env.example as a reference.
8. Configure your .env file with your correct local information.
9. In order to access [OpenAI's API](https://openai.com/api/), you will need to get a key and add it to the .env file.
10. Start the web server using the npm run local command. The app will be served at http://localhost:8080/
11. Go to http://localhost:8080/ in your browser.

## Dependencies

* Node 10.x or above
* NPM 5.x or above
* PG 6.x
* Express
* Bcrypt
* Chalk
* Cookie-session
* Dotenv 
* EJS
* Method-override
* Morgan
* OpenAI
* SASS

## Using Smart To Do List

### Homepage

* View all of your lists.
* Create a new list, by clicking the plus sign icon on the bottom of the page.
* Delete a list, by clicking on the trash bin icon next to the list you wish to delete.
* Vist an individual list page, by clicking on the list name.

### Individual List page

* View all tasks connected to the list.
* Create a new task, by clicking the plus sign icon on the bottom of the page.
* Delete a task, by clicking on the trash bin icon next to the task you wish to delete.
* Edit a task name, by clicking on the note pad icon next to the task you wish to edit.
* Deselect a task, by clicking the checkbox next to the task. In future versions of the app, this will 'cross' the task off your list.

### Categories

[OpenAI's API](https://openai.com/api/) will automatically categorize each task for you when the task is created. When the task is edited, the AI will update the task category if required.

Tasks are organized into one of four categories in the database and are labelled with one of the four corresponding category icons: 

1. Burger: Restaurants or Cafes to visit or things to eat.
2. Shopping Cart: Products to buy.
3. Screen: Films or TV Series to watch.
4. Book: Books to read.

## Adding a new task
!["Adding a new task"](https://github.com/caitlincroteau/scheduler/blob/master/docs/interview-scheduler-ADD.gif)

