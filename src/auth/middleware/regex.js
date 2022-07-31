'use strict';

'use strict';

module.exports = () => {
  // 'update'

  return (req, res, next) => {
    try {
      console.log("yes");
      // user can do action
      if (validEmail(req.body.email)&&validPhoneNum(req.body.phone)&&validPassword(req.body.password)) {
        next();
      } else {
        next('Access Denied');
      }
    } catch (e) {
      next(e.message);
    }
  };
};

function validEmail(email){
  console.log();
  let regex=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (regex.test(email))
  return true;
  else
  throw new Error("Invalid Email");
 
}
function validPhoneNum(phonNum){
    let regex=/^(079||078||077)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (regex.test(phonNum))
  return true;
  else
  throw new Error("Invalid phone number");
 
  }
 //Minimum eight characters, at least one letter, one number and one special character:
function validPassword(pass){
  let regex=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
if (regex.test(pass))
return true;
else
throw new Error("Invalid Password");

}

//"\"key1\":(\\d+)"
function validLocation(location){
  let regex=/^{&\"city\":(\\d+)$}/;
if (regex.test(location))
return true;
else
throw new Error("Invalid location");

}
