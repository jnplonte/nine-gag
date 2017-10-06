# API APPLICATION


## Dependencies
* nodejs: [https://nodejs.org/](https://nodejs.org/en/)
* expressjs: [https://expressjs.com/](https://expressjs.com/)
* mysql: [https://mysql.com/](https://mysql.com/)
* gulp: [http://gulpjs.com/](http://gulpjs.com/)
* mocha: [https://mochajs.org/](https://mochajs.org/)


## Installation
- install npm dependencies by running `npm install`
- update the following configurations and database credentials on `{root}/config.js`


## How to Use
- run `npm start` it will listen to default http://localhost:8282

#### get all post
- **[GET]**  `/api/post`
- optional params: "page", "key", "sort" | sample: http://localhost:8282/api/post?page=1&sort=ASC&key=id

#### get one post
- **[GET]** `/api/post/{instagram_id}`
- required params: "instagram_id" | sample: http://localhost:8282/api/post/1618181517549132857_259220806

#### add to featured post
- **[PUT]** `/api/post/{instagram_id}`
- required params: "instagram_id and {featured: 1}" | sample: http://localhost:8282/api/post/1618181517549132857_259220806


## Testing
- run `npm test`