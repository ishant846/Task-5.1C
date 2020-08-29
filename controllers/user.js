'use strict';

module.exports = function(passport, validation, email) {
    return {
        setRouting : function(router) {
            
            router.get('/login', this.loginView);
            router.post('/login', validation.getLoginValidation, this.login);
            
			router.get('/dashboard', this.dashboard);
            router.get('/logout', this.logOut);
        },

        loginView : function(req, res) {
            const messages = req.flash('error');
            res.render("login", {hasErrors : (messages.length > 0) ? true : false, messages : messages});
        },

        login : passport.authenticate('local.login', {
            successRedirect : '/dashboard',
            failureRedirect : '/login',
            failureFlash : true
        }),
		
		dashboard: function(req, res) {
			res.render("dashboard", {welcome_message: "Welcome to ICrowd Web Application"});
		},
		
        logOut: function (req, res) {
            req.logout();
            req.session.destroy((err) => {
                res.clearCookie('connect.sid', { path: '/' });
                res.redirect('/login');
            });
        },
    }
}