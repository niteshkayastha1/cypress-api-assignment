# cypress-api-assignment

 The Solutions for the challange. 

 The API automation is done with the help of Cypress tool. 

 All the test cases are prepared in Cypress / e2e folder and the results are present in Fixture folder. 

# The code is executable in the pipeline of Github but all the test cases are failing in pipeline as the baseurl is of local host. Its working perfectly in my system and it will work perfectly after editing the base url. 

To change the baseurl, please go to Cypress.config.js file and update the baseurl value. 

# Stes to setup cypress in your system. 

1. Install Cypress Locally (Using npm or Yarn)

Prerequisites:
Make sure you have Node.js and npm (or yarn) installed on your machine.

Steps:
1. Navigate to your project directory (if you have a project already):

2. Initialize the project (if not already initialized): If your project does not have a package.json file yet, initialize it with:

npm init -y

This creates a package.json file.

3. Install Cypress via npm: Run the following command to install Cypress as a dev dependency in your project:

npm install cypress --save-dev

4. Copy the below folder : e2e , fixtures , cypress.config.js
5.  Install mochawesome for HTML reports

  npm install mochawesome mochawesome-merge mochawesome-report-generator --save-dev

6.  Save all the files. 
  
7.  Run the cypress in headeless mode

  npx cypress run

8.  The HTML report will be generated in Reports folder with screenshots and video. 




   
