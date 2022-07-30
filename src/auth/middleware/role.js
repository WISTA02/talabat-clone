'use strict';

module.exports = (role) => {
    // 'update'
    
    return (req, res, next) => {
        try {
            console.log("*************************",req.user.role);
            // user can do action
            if (req.user.role.includes(role)||req.user.role=="admin") {
                console.log("if");
                next();
            } else {
                next('Access Denied');
            }
        } catch (e) {
            next('invalid login')
        }
    }
}