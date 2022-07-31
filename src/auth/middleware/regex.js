'use strict';

'use strict';

module.exports = () => {
  // 'update'

  return (req, res, next) => {
    try {
      console.log("yes");
      // user can do action
      if (validEmail(req.body.email)&&validPhoneNum(req.body.phone)) {
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
  // return false
}
function validPhoneNum(phonNum){
    let regex=/^(079||078||077)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (regex.test(phonNum))
  return true;
  else
  throw new Error("Invalid phone number");
  // return false;
  }
 