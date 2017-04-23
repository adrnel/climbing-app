# Climbing app build and deploy instructions

## Table of Contents
- [Prerequisites](#prerequisites)
- [Developing for the project](#devproject)
- [Building the project](#buildproject)
- [Deploying the project](#deployproject)


<a name="prerequisites"></a>

## Prerequisites

- **Nodejs**

  Download and install from [http://nodejs.org](https://nodejs.org/en/)
    - To verify

    ```
    $ npm -v
    ```

    - should output something like

    ```
    3.3.12
    ```


- **Gulp**

    - Once Node is installed, install Gulp globally to be able to use it from the terminal / command line

    ```
    $ sudo npm install -g gulp
	```

    - To verify

    ```
    $ gulp -v
    ```

    - should output something like

    ```
    CLI version 3.9.1
    ```

- **Bower**

    - Install Bower globally to be able to use it from the terminal / command line

    ```
    $ sudo npm install -g bower
    ```

    - To verify

    ```
    $ bower -v
    ```

    - should output something like

    ```
    1.7.9
    ```
    
- **Forever**

    - Install Bower globally to be able to use it from the terminal / command line

    ```
    $ sudo npm install -g forever
    ```

    - To verify

    ```
    $ forever list
    ```

    - should output something like

    ```
    info:    No forever processes running
    ```

 - **Clone the Git Repository**

 	```
 	$ git clone https://github.com/adrnel/climbing-app.git
 	$ cd climbing-app
 	$ git checkout master
 	```


<a name="devproject"></a>

## Developing for the project

- **Install the node modules**

    ```
    $ sudo npm install
    ```

- **Navigate to the src folder and install the project's bower dependencies**

    ```
    $ cd src
    $ sudo bower install
    ```

- **Environment Variables**
    This application requires environment variables to work. 
    
    For Mac / Linux, create a file called env.js in the root directory of the project.  
    Then copy the following code into the env.js but replce the dummy text with the corrcet credentials:  
    PORT_NUMBER=xxx  
    HOST='example.amazonaws.com'  
    USER='username'  
    PASSWORD='password'  
    DATABASE='nameofdatabase'  
    CLIMBING_SECRET_KEY='Key String'

    For windows, go to, System properties -> advanced -> Environment variables  
    Then create the above environment variables with the correct credentials for the variable values.  


<a name="buildproject"></a>

## Building the project
- **Gulp**

    - Run the default Gulp task from the root directory to build, concatenate and uglyfy (where applicable) all the relevant js, css, and hmtl files to the dist folder

    ```
    $ gulp
    ```
- **Foreverjs**

    - Run the Forever start task to start the application on the port specified in the environment variables earlier

    ```
    $ forever start app.js
    ```
    - Run the Forever stop task to stop the application

    ```
    $ forever stop app.js
    ```
    - To view the logs, you can run the forever list function which shows you all the Forever scripts that are currently running along with the location of the log files.

    ```
    $ forever list
    ```

<a name="testing"></a>

## Testing the project
- **Unit testing - Karma & Jasmine**

    - Run the Karma Start command in the root directory of the project to run all the specs

    ```
    $ karma start
    ```
- **E2e testing - Protractor**

    - Start up the server by running the web-driver command

    ```
    $ webdriver-manager start
    ```

    - In a new terminal window, change to the e2e_tests directory and run the protractor tests

    ```
    $ cd tests/e2e_tests
    $ protractor conf.js
    ```

<a name="deployproject"></a>

## Deploying the project
    // TODO create CI piepline that automatcally runs test using Jenkins and builds if they pass
    
    - ssh into the box containing the app.  
    - git pull updates  
    - run gulp to build the updated dist folder  
    - run the Forever start script  