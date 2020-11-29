# slideshow-editor

Example of a simple cloud native application which includes a microservices design, containerization, authentication and authorization. Built using React, Go, Auth0 and docker. Deployed to AWS. Also requires https://github.com/jimareed/slideshow-data. Based on https://github.com/jimareed/react-auth0-login, the samples from Auth0 and the Auth0 blog: https://auth0.com/blog/authentication-in-golang/.

<p  align="center">
    <img src="./images/slideshow-editor.png" alt="Slideshow Editor"/>
</p>


Config setup
1. create auth0 account
2. create app
3. set Allowed Callback URLs and Allowed Logout URLs and Allowed Web Origins to http://localhost:3000

Initial setup
```
npm install
```

Run
```
export REACT_APP_DOMAIN=-- insert here --
export REACT_APP_CLIENTID=-- insert here -- 
export REACT_APP_AUDIENCE=-- insert here -- 
export REACT_APP_SLIDESHOW_URI=--insert here---
export REACT_APP_SLIDESHOW_DATA_URI=--insert here--

npm start
```

Follow the instructions to install and run the backend at: https://github.com/jimareed/auth0-react-backend

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.



### Docker build
```
docker build --tag slideshow-engine-image .
docker rmi slideshow-image
```

### Docker run
Update docker-compose.yaml with environment variable values then run docker compose up:
```
docker-compose up -d
docker-compose down
```
