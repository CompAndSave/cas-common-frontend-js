import { ajaxCall } from "https://cdn.jsdelivr.net/gh/CompAndSave/cas-common-frontend-js@master/ajaxCall.js";

class Auth {
  /**
   * @class
   * @classdesc Auth class for user authentication
   */
  constructor() {}
  
  /**
   * 
   * @param {string} username 
   * @param {string} password 
   * @param {boolean} rememberDevice 
   * @returns 
   */
  static checkLogin(username, password, rememberDevice) {
    return new Promise((resolve, reject) => {
      ajaxCall("PUT", "/login", { username: username, password: password, rememberDevice: rememberDevice }, resolve, reject);
    });
  }
  
  /**
   * 
   * @param {string} username 
   * @param {string} callAction 
   */
  static sendCode(username, callAction = 'send') {
    let result = new Promise((resolve, reject)=> ajaxCall("POST", "/forgot-password", { action: "sendCode", username: username }, resolve, reject));
  
    let formBlock = document.getElementById(Auth.sendCodeSetting.formBlockId);
    let errorBlock = document.getElementById(Auth.sendCodeSetting.errorBlockId);
    let successBlock = document.getElementById(Auth.sendCodeSetting.successBlockId);
    let loadingBlock = document.getElementById(Auth.sendCodeSetting.loadingBlockId);
  
    Auth.initBlock(formBlock, errorBlock, successBlock, loadingBlock);
  
    result.then(()=> {
      if(callAction == 'resend') {
        successBlock.querySelector('.resend-message').innerHTML = Auth.msgResendCode;
      } 
      Auth.showSuccessBlock(loadingBlock, successBlock);
    }).catch((err)=> {
      Auth.showErrorBlock(err, loadingBlock, errorBlock);
    });
  }
  
  /**
   * 
   * @param {string} username 
   * @param {string} newPassword 
   * @param {string} verificationCode 
   */
  static resetPassword(username, newPassword, verificationCode) {
    let result = new Promise((resolve, reject)=> ajaxCall("POST", "/forgot-password", {
      action: "confirmPassword",
      username: username,
      newPassword: newPassword,
      verificationCode: verificationCode
    }, resolve, reject));
  
    let formBlock = document.getElementById(Auth.resetPasswordSetting.formBlockId);
    let errorBlock = document.getElementById(Auth.resetPasswordSetting.errorBlockId);
    let successBlock = document.getElementById(Auth.resetPasswordSetting.successBlockId);
    let loadingBlock = document.getElementById(Auth.resetPasswordSetting.loadingBlockId);
  
    Auth.initBlock(formBlock, errorBlock, successBlock, loadingBlock);
  
    result.then(()=> {
      Auth.showSuccessBlock(loadingBlock, successBlock);
    }).catch((err)=> {
      Auth.showErrorBlock(err, loadingBlock, errorBlock);
    });
  }
  
  /**
   * 
   * @param {object} formBlock 
   * @param {object} errorBlock 
   * @param {object} successBlock 
   * @param {object} loadingBlock 
   */
  static initBlock(formBlock, errorBlock, successBlock, loadingBlock){
    formBlock.style.display = 'none';
    loadingBlock.style.display = 'block';
    errorBlock.style.display = 'none';
    successBlock.style.display = 'none';
  }
  
  /**
   * 
   * @param {object} loadingBlock 
   * @param {object} successBlock 
   */
  static showSuccessBlock(loadingBlock, successBlock){
    loadingBlock.style.display = 'none';
    successBlock.style.display = 'block';
  }
  
  /**
   * 
   * @param {object} err 
   * @param {object} loadingBlock 
   * @param {object} errorBlock 
   */
  static showErrorBlock(err, loadingBlock, errorBlock){
    errorBlock.querySelector('.callout.alert').innerHTML = err.message || JSON.stringify(err);
    loadingBlock.style.display = 'none';
    errorBlock.style.display = 'block';
  }
}

export { Auth };