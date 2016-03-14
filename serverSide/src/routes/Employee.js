var EmployeeController = require("./../controllers/Employee.js");

module.exports = [
    {
        path: '/employees',
        method: 'GET',
        config: {
            handler: EmployeeController.showAll,
            description: 'gets list of all employees',
            notes: 'lists employees'
        }
    },
    {
        path: '/employees',
        method: 'POST',
        config: {
            handler: EmployeeController.addEmployee,
            description: 'create new employee from the provided information',
            notes: 'creates new employee'
        }
    },
    {
        path: '/employees/{empId}',
        method: 'GET',
        config: {
            handler: EmployeeController.getEmployeeById,
            description: 'Get employee details from employee id',
            notes: 'Returns employee details'
        }
    },
    {
        path:"/employees/{empId}",
        method : "PUT",
        config: {
            handler: EmployeeController.updateEmployee,
            description: 'update employee details from employee id',
            notes: 'updates employee details'
        }
    },
]