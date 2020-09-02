# DraftProjector
---
DraftProjector is an application that was built to assist a user with budgeting for a fantasy football auction draft. Users will also find team specific news related to their selected favorite team on the home page, after they've logged in. The default case will be NFL news. 


## To Start
---
Please follow the steps below to ensure the API's are on the proper ports. 


First, start the rails API:
(Link to Backend Repo: https://github.com/steveneross94/draft-projecter-backend)
1. `cd draft-projecter-backend`
2. `bundle`
3. `rails db:migrate`
4. `rails db:seed`
5. `rails s -p 3001`

Next, follow these steps before running npm start
1. `cd draft-projecter-frontend/draft-projecter`
2. `npm install` 
2. `npm start`


### External Resources for Access
---
You'll need to sign up for news api key (https://newsapi.org/). You will also have to run a gem install for figaro (https://github.com/laserlemon/figaro) and follow the steps to place the API key in the proper .env file
In doing so, you'll need to remove the following from .gitignore 

`Ignore application configuration /config/application.yml`
