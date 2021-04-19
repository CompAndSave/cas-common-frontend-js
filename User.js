import { ajaxCall } from "https://cdn.jsdelivr.net/gh/CompAndSave/cas-common-frontend-js@master/ajaxCall.js";

class User {
  /**
   * @class
   * @classdesc User class with methods for user profile actions
   */
  constructor() {}
  
  /**
   * 
   * @param {string} action 
   * @param {object} data 
   */
  static callUserProfileAction(action, data, redirectUrl) {
    let result = new Promise((resolve, reject) => ajaxCall("POST", `/profile/${action}`, data, resolve, reject));
    
    User.resetMessageBox();
    
    result.then(() => {
      if(action == "global-signout") { User.messageBox.innerHTML = User.msgGlobalSignOutSuccess; }
      else { User.messageBox.innerHTML = User.msgPasswordChangeSuccess; }

      User.messageBox.classList.add("success");
      User.messageBox.style.display = "block";

      if (typeof redirectUrl === "string") { setTimeout(() => location.replace(redirectUrl), User.timeDelay); }
      else { location.reload(); }
    }).catch(err => {
      if (action === "global-signout" && err.message === User.errMissingIdLocalStorage) {
        let el = document.getElementById(User.globalSignOutFormId);
        
        if(el.style.display == "none"){
          Foundation.Motion.animateIn(el, "hinge-in-from-top", function(){ el.style.display="block"; });
        } else {
          Foundation.Motion.animateOut(el, "fade-out", function(){ el.style.display="none"; });
        }
      }
      else { 
        User.messageBox.classList.add("alert");
        User.messageBox.innerHTML = User.msgFailRequestFn(err);
        User.messageBox.style.display = "block";
      }
    });
  }
  
  /**
   * 
   * @param {string} oldPassword 
   * @param {string} newPassword 
   */
  static changeUserPassword(oldPassword, newPassword) {
    User.callUserProfileAction("change-password", { oldPassword: oldPassword, newPassword: newPassword });
  }
  
  /**
   * 
   * @param {string} password 
   */
  static globalSignOut(password, redirectUrl) {
    User.callUserProfileAction("global-signout", { password: password }, redirectUrl);
  }
  
  static resetMessageBox() {
    User.messageBox.style.display = "none";
    User.messageBox.classList.remove("success", "alert");
  }
}

export { User };