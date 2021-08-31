/**
 * Api Call by AJAX
 * 
 * @param {string} type Api call type, e.g, GET, POST
 * @param {string} url Api url endpoint
 * @param {object} data Data object
 * @param {function} resolve Resolve function
 * @param {function} reject Reject function
 */
 export const ajaxCall = (type, url, data, resolve, reject)=> {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    try {
      if (this.readyState === 4 && this.status === 200) { resolve(JSON.parse(this.responseText)); }
      else if (this.readyState === 4 && this.status !== 200) { reject(JSON.parse(this.responseText)); }
    }
    catch (e) { reject(e); }
  };

  xhttp.open(type, url, true);
  if (!(data instanceof FormData)) { xhttp.setRequestHeader("Content-Type", "application/json"); }
  xhttp.send(data instanceof FormData ? data : JSON.stringify({ data: data }));
}