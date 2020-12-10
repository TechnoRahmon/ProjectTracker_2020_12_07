const AccessControl = require('accesscontrol')
const ac = new AccessControl()


exports.roles = (()=>{


    ac.grant("ViwerUser")
    .readAny('profile')
    .readAny('project')
    .readAny('task')

    
    ac.grant("BasicUser")
    .extend('ViwerUser')
    .updateAny('task')
    

    ac.grant("AdminUser")
        .extend('ViwerUser')
        .extend('BasicUser')

        // Users
        .createAny("invite")
        .deleteAny("profile")
        .updateAny("profile")
        // projects
        .createAny("project")
        .deleteAny("project")
        .updateAny("project")
        // tasks
        .createAny("task")
        .deleteAny("task")
        .updateAny("task")

    
    return ac;
})();