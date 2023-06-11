
module.exports = {
    // // read data user
    viewLogin: async (req, res) => {
        try {
            
        //   message and status
          const alertMessage = req.flash("alertMessage");
          const alertStatus = req.flash("alertStatus");
          const alert = { message: alertMessage, status: alertStatus };
    
        //   render componen
          res.render("login", {
            alert,
            title: "Login",
          });
        } catch (error) {
          // back to user jika error
          res.redirect("/");
        }
      },

      identifyUser: async (req, res) => {
        try {
          const { username, password } = req.body;
          
          
          // update data dari request body
          if (username === "admin" && password === "password" ) {
            req.session.loggedIn = true;
            req.session.username = username;
            res.redirect("/user");
           
          }else{
            // gagal message
          req.flash("alertMessage", "Login Failed");
          req.flash("alertStatus", "danger");
          res.redirect("/");
          }
        } catch (error) {
          // erro message
          req.flash("alertMessage", "username atau password salah");
          req.flash("alertStatus", "danger");
          res.redirect("/");
        }
      },
}