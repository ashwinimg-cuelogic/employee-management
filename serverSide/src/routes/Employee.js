var EmployeeController = require("./../controllers/Employee.js");
var Joi = require('joi');

module.exports = [
    {
        path: '/employees',
        method: 'GET',
        config: {
            handler: EmployeeController.showAll,
            description: 'gets list of all employees',
            notes: 'lists employees',
            validate: {
                query : {
                    page : Joi.number().optional(),
                    search : Joi.string().alphanum().min(3).max(100).optional(),
                    sortBy : Joi.string().alphanum().optional(),
                    orderBy : Joi.string().alphanum().optional()
                }
            }
        }
    },
    {
        path: '/employees',
        method: 'POST',
        config: {
            handler: EmployeeController.addEmployee,
            description: 'create new employee from the provided information',
            notes: 'creates new employee',
            validate: {
                payload : {
                    Username : Joi.string().min(3).max(100).required(),
                    Email : Joi.string().email().required(),
                    Status : Joi.string().alphanum().min(3).max(10).required(),
                    Name : Joi.string().optional(),
                    DateOfBirth: Joi.date().optional(),
                    DateOfJoining: Joi.date().optional(),
                    Experience : Joi.number().required(),
                    Designation : Joi.string().optional()
                }
            }
        }
    },
    {
        path: '/employees/{empId}',
        method: 'GET',
        config: {
            handler: EmployeeController.getEmployeeById,
            description: 'Get employee details from employee id',
            notes: 'Returns employee details',
            validate: {
                query : {
                    username : Joi.string().alphanum().min(3).max(20).optional(),
                    search : Joi.string().alphanum().min(3).max(100).optional()
                }
            }
        }
    },
    {
        path:"/employees/{empId}",
        method : "PUT",
        config: {
            handler: EmployeeController.updateEmployee,
            description: 'update employee details from employee id',
            notes: 'updates employee details',
            validate: {
                payload : {
                    Status : Joi.string().alphanum().min(3).max(10).optional(),
                    Name : Joi.string().optional(),
                    DateOfBirth: Joi.date().optional(),
                    DateOfJoining: Joi.date().optional(),
                    Experience : Joi.number().optional(),
                    Designation : Joi.string().optional()
                }
            }
        }
    },
    {
        path: '/employees/{empId}',
        method: 'DELETE',
        config: {
            handler: EmployeeController.deleteEmployeeById,
            description: 'Deletes employee from employee id',
            notes: 'Deletes employee details',
            validate: {
                query : {
                    username : Joi.string().alphanum().min(3).max(20).optional(),
                    search : Joi.string().alphanum().min(3).max(100).optional()
                }
            }
        }
    },
]