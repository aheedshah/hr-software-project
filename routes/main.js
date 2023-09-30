module.exports = function(app, websiteData){
    app.get('/', function(req, res){
        console.log('Signed Cookies: ', req.signedCookies);
        //check if cookie exists
        if (req.cookies == undefined || req.cookies == null || req.cookies["Cookie token name"] == null){
            //if does not exit go to login page
            res.render('./login.ejs', websiteData);
        } else {
            //if cookie already exists automatically go to home page
            res.redirect('./home');
        }
    })

    app.post('/auth', function(req, res){
        let username = req.body.username; //gets the username
        let password = req.body.password; //gets the password
        let date = new Date();//display system time;
        // Gets the current date
        // adjust 0 before single digit date
        let currentDate = ("0" + date.getDate()).slice(-2);
        
        let month = ("0" + (date.getMonth() + 1)).slice(-2); // current month
        let year = date.getFullYear(); // current year
        let hours = date.getHours(); //current hour
        let minutes = date.getMinutes(); //current minute
        let seconds = date.getSeconds();//current seconds

        //combine all time components into one variable
        let systemTime = (year + "-" + month + "-" + currentDate + " " + hours + ":" + minutes + ":" + seconds);
        if(username && password){ //If they are both truthy,
            //We run the sql query
            let sqlQuery = `SELECT * FROM users WHERE username = ? AND password = ?`;
            db.query(sqlQuery, [username, password], (err, result) => {
                if(err){
                    res.render('./error.ejs');
                    console.log(err);
                }
                //If result is okay, we set a new cookie and redirect to the home page
                if(result.length > 0 ){
                    const loginInfo = "User:" + username + ' ' + "logged in at " + systemTime;
                    console.log(loginInfo);
                    //Reference for cookies used:
                    //https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
                    res.cookie(`Cookie token name`,username,{
                        //expire time
                        maxAge: 2 * 60 * 60 * 1000,
                        secure: true,
                        httpOnly: true,
                        sameSite: 'lax'
                    });
                    res.redirect('./home');
                } else { //If the username and password don't exist, we redirect to the login page
                    console.log("Incorrect username and/or password!");
                    res.clearCookie("Cookie token name");
                    console.log("cookie deleted");
                    // res.render("login.ejs",websiteData);
                    res.redirect('./');
                }
                res.end(); //ending the response
            })
        } else {
            console.log("[Please enter a username and/or password");
            res.clearCookie("Cookie token name");
            res.redirect('./');
        }
    })
    
    app.get('/home', function(req,res){
        if (req.cookies == undefined || req.cookies == null || req.cookies["Cookie token name"] == null){
            //if dose not exits go to login page
            res.redirect('./');
        }
        //if cookie exists go to home page
        res.render('./home.ejs', websiteData);
    });

    app.get('/timeOff', function(req, res){
        if (req.cookies == undefined || req.cookies == null || req.cookies["Cookie token name"] == null){
            //if cookies don't exits go to login page
            res.redirect('./');
        }
        //if cookie exists, we run the sql query and go to the requested page
        let sqlQuery = `SELECT * FROM users JOIN employeeDetails ON users.user_id = employeeDetails.user_id`;
        db.query(sqlQuery, (err, result) => {
            if(err){
                console.log(err);
                res.render('./error.ejs');
            }
            let data = Object.assign({}, websiteData, {employeeDetails:result});
            res.render('./timeOff.ejs', data);
        })
    });
    
    app.get('/payroll', function(req, res){
        if (req.cookies == undefined || req.cookies == null || req.cookies["Cookie token name"] == null){
            //if cookies do not exit go to login page
            res.redirect('./');
        }
        //if cookie exists go to the requested page
        let sqlQuery = `SELECT * FROM users JOIN employeeDetails ON users.user_id = employeeDetails.user_id`;
        db.query(sqlQuery, (err, result) => {
            if(err){
                res.render('./error.ejs');
                console.log(err);
            }
            let data = Object.assign({}, websiteData, {employeeDetails:result});
            res.render('./payroll.ejs', data);
        })
    });


    app.get('/userInformation', function(req, res){
        if (req.cookies == undefined || req.cookies == null || req.cookies["Cookie token name"] == null){ 
            //if cookies do not exit go to login page
            res.redirect('./');
        }
        //if cookie exists go to the requested page
        let sqlQuery = `SELECT * FROM users JOIN employeeDetails ON users.user_id = employeeDetails.user_id`;
        db.query(sqlQuery, (err,result) => {
            if(err){
                res.render('./error.ejs');
                console.log(err);
            }
            let data = Object.assign({}, websiteData, {employeeDetails:result});
            res.render('./userInformation.ejs', data);
        })
    });

    app.get('/error', function(req,res){
        res.render('./error.ejs');
    });

    app.get('/documents', function(req, res){
        if (req.cookies == undefined || req.cookies == null || req.cookies["Cookie token name"] == null){ 
            res.redirect('./');
        }
        let sqlQuery = `SELECT * FROM users JOIN employeeDetails ON users.user_id = employeeDetails.user_id`;
        db.query(sqlQuery, (err, result) => {
            if(err) {
                res.render('./error.ejs');
                console.log(err);
            }
            let data = Object.assign({}, websiteData, {employeeDetails:result});
            res.render("./documents.ejs", data);
        })
    });

    //logoff and clear all cookies
    app.get("/logout", (req, res) => {
        // clear the cookie
        res.clearCookie("Cookie token name");
        // redirect to login
        res.redirect("./");
    });
    //Redirects all 404 error routes to the custom error page
    app.get('*', function(req, res){
        res.render('./error404.ejs')
    });
};