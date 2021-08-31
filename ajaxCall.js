/**
 * Api Call by AJAX
 * 
 * @param {string} type Api call type, e.g, GET, POST
 * @param {string} url Api url endpoint
 * @param {object} [data] Data object if formData is not provided
 * @param {function} resolve Resolve function
 * @param {function} reject Reject function
 * @param {formData} [formData] If provided, formData will be used
 */
 export const ajaxCall = (type, url, data, resolve, reject, formData)=> {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    try {
      if (this.readyState === 4 && this.status === 200) { resolve(JSON.parse(this.responseText)); }
      else if (this.readyState === 4 && this.status !== 200) { reject(JSON.parse(this.responseText)); }
    }
    catch (e) { reject(e); }
  };

  xhttp.open(type, url, true);
  if (typeof formData === "undefined") { xhttp.setRequestHeader("Content-Type", "application/json"); }
  xhttp.send(typeof formData === "undefined" ? JSON.stringify({ data: data }) : formData);
}