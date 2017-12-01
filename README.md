# BAP-backend

## How to install and start
* Clone this repository 
* Open the folder
* Open command prompt with 'git bash here' for example
* Run: **npm install**
* Run: **gulp**
* Open http://localhost:8000 in your browser.

## The following endpoints are available:
* Without access token, but with **Content-Type: application/json** in the header and a body in JSON
	* /authenticate -> POST { "email": "...@beeple.eu", "password": "..."}
	* /users -> POST/PUT 

* With **access token: ...** and **Content-Type: application/json** in the header and a body in JSON 
	* /checkins -> POST/GET
	* /checkins/:id -> PUT/DELETE/GET
	* /users -> GET
	* /users/:id -> PUT/DELETE/GET
	* /events -> POST/PUT/GET
	* /events/:id -> PUT/DELETE/PATCH/GET
	* /checkouts -> POST/GET
	* /checkouts/:id ->  PUT/DELETE/GET
	* /rooms -> POST/GET
	* /rooms/:id -> PUT/DELETE/PATCH/GET
	* /roomNames -> POST/GET
	* /roomNames/:id -> PUT/DELETE/GET
	* /sandwiches -> POST/DELETE/GET
	* /sandwiches/:id -> PUT/DELETE/PATCH/GET
	
