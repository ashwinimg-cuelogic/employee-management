# employee-management

```sh
 * Introduction
 * Version
 * Tech
 * Installation
 * Requirements
 * Configuration
 * Installation
 * Usage
 ```


 Introduction
------------

This is the small application of Employee Management system.


Version
------------

1.0.0

### Tech

This application uses following:

*   [angular] - for the user interface
   	
*  [Node js] - for the API (providing backend support)
  	- written API in nodejs to handle all database related operation
  	- using DynamoDB for storing the data
  	- used  mocha for tests


Requirements
------------

This project requires following tools (need to install globally):

 * node - 4.* 
 * aws-sdk
 * dynamoDB local setup 


Configuration 
------------



Installation
------------

To setup this project, run the command below in your repository:

```sh
npm install
```

 Usage
------------ 

As a guest user can do the following:
  1. login form and login on the sire


As an editor user can do the following:
 1. listing of the Employees 
 2. On clicking the Employee can see the details of the Employee
 3. create new Employee:
 	after creating the Employee editor will be redirected to the Employee details having recent employee on the top.
 4. search among the Employees
 5. delete Employees (only status changes to deleted)