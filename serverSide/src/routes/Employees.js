module.exports = [
    {
        path: '/employees',
        method: 'GET',
        config: {
            handler: function(req, reply) {
                reply("Inside the get request of emp")
            },
            description: 'gets list of all employees',
            notes: 'lists employees'
        }
    },
    {
        path: '/employees',
        method: 'POST',
        config: {
            handler: function(req, reply) {
                reply("Inside the post request of emp")
            },
            description: 'create new employee from the provided information',
            notes: 'creates new employee'
        }
    },
    {
        path: '/employees/{empId}',
        method: 'GET',
        config: {
            handler: function(req, reply) {
                reply("Inside the get request of particular emp")
            },
            description: 'Get employee details from employee id',
            notes: 'Returns employee details'
        }
    },
    {
        path:"/employees/{empId}",
        method : "PUT",
        config: {
            handler: function(req, reply) {
                reply("Inside the put request of particular emp")
            },
            description: 'update employee details from employee id',
            notes: 'updates employee details'
        }
    },

]