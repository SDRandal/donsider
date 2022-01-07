# Donsider
This is a "Project planning" application that I've nbeen messing around with. What I hoped to learn while working on this project was a firm grasp on functional components in React, id base routing in React, using mongoose as an ODM, connecting to AWS S3 buckets and service resources from AWS Cloudfront CDN.

This project was relies on a backend "api" [I've built using node/mongodb](https://github.com/SDRandal/donsider-backend). 

## Available Scripts

In the project directory, you can run:

### `npm start`

This will start up a "dev" server for the frontend

You'll likley not be able to make it past the login page if you do not have the backend server running. Auth runs through that server. But here are some screenshots of what you would see if you could run this code locally. 


### The homepage
This page is just a list of all the things I typically have planned. Here I've only listed "Donsider" as a "plan". In my backend, a plan has a bunch of properties, such as due date, tasks, attachments and so on. 

![Donsider Homepage/Plan list](https://github.com/SDRandal/donsider/blob/master/donsider-ss1.png)


### The plan view
This view shows us the plan in more detail. It is a React component that has several child components, most of which are nested in a "tabSlider" component that I built. I used redux for state management, so all the changes made in a plan get both pushed to the api, and updated on the client in real time. 

![Donsider Homepage/Plan list](https://github.com/SDRandal/donsider/blob/master/donsider-ss2.png)

### The plan view with some completed tasks

![Donsider Homepage/Plan list](https://github.com/SDRandal/donsider/blob/master/donsider-ss3.png)

### The the plan view with "Donsiderations" tab selected
This is the part of my planning where I list all the possible options for something I am considering adding to my task list. I list out the pros and cons of each way I can implement a solution, then use that in my decision making process. I haven't added the feature yet, but I ultimately would like to add some sort of "best option" flag to the option I deem is the best solution.

![Donsider Homepage/Plan list](https://github.com/SDRandal/donsider/blob/master/donsider-ss5.png)


### ... that's pretty much it! 

It is usable for myself at the moment, but I am continually making improvements and using version control locally.

