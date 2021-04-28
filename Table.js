class Table {
  /**
   * @class
   * @classdesc Table class with all methods related to table.
   */
  constructor() { }

  /**
   * 
   * @param {string} checkAllName 
   * @param {string} checkBoxName 
   */
  static checkall(checkAllName, checkBoxName) {
    let x = document.getElementsByName(checkAllName)[0];    // Should only have one element on the name of check all checkboxes
    document.getElementsByName(checkBoxName).forEach(element => element.checked = x.checked);
  }

  /**
   * 
   * @param {string} checkboxName 
   * @param {function} fnToCall 
   */
  static bulkAction(checkboxName, fnToCall) {
    let x = document.getElementsByName(checkboxName), data = [];

    x.forEach(element => {
      if (element.checked) { data.push(element.id); }
    });

    fnToCall(data);
  }

  /**
   * 
   * @param {string} selectedOption 
   * @param {string} urlPath 
   */
  static showPerPageReload(selectedOption, urlPath) {
    let baseUrl = urlPath.replace(/\?.*$/, "");
    let params = urlPath.match(/\?(.*)$/);

    if (params && params.length > 1) {
      params = new URLSearchParams(params[1]);

      if (!params.has(Table.numPerPageQueryName)) { params.append(Table.numPerPageQueryName, selectedOption); }
      else { params.set(Table.numPerPageQueryName, selectedOption); }

      // reset to page 1
      //
      if (params.has(Table.currentPageQueryName)) { params.set(Table.currentPageQueryName, "1"); }
    }
    else { params = new URLSearchParams(`${Table.numPerPageQueryName}=${selectedOption}`); }

    window.location = `${baseUrl}?${params.toString()}`;
  }

  /**
   * Sorter function
   * 
   * @param {string} urlPath 
   */
  static getNewQuery(urlPath) {
    let sortOrder = [], option = document.getElementsByClassName(Table.sortOptionClassName);
    
    for (let i = 0; i < option.length; i++) {
      if (option[i].checked == true) {
        sortOrder.push({
          sort: option[i].value,
          order: option[i].parentNode.getElementsByClassName(Table.activeSortOptionClassName)[0].id.split('-')[1]
        });
      }
    }

    if (sortOrder.length < 1 || sortOrder.length > Table.maxSortOption) {
      let errorMsg = document.getElementById(Table.errorMsgId);
      errorMsg.style.display = "block";
      errorMsg.innerHTML = sortOrder.length < 1 ? Table.errorMsgTextMin : Table.errorMsgTextMax;
    } else {
      let baseUrl = urlPath.replace(/\?.*$/, "");
      let params = urlPath.match(/\?(.*)$/);
      
      let newQuery = new URLSearchParams();
      for (let i = 0; i < sortOrder.length; ++i) {
        newQuery.append(Table.sortQueryName + (i > 0 ? i : ""), sortOrder[i].sort);
        newQuery.append(Table.orderQueryName + (i > 0 ? i : ""), sortOrder[i].order);
      }

      let newUrl;
      if (params && params.length > 1) {
        params = new URLSearchParams(params[1]);
        for (let i = 0; i < Table.maxSortOption; ++i) {
          params.delete(Table.sortQueryName + (i > 0 ? i : ""));
          params.delete(Table.orderQueryName + (i > 0 ? i : ""));
        }
        newUrl = baseUrl + "?" + params.toString() + "&" + newQuery.toString();
      }
      else { newUrl = baseUrl + "?" + newQuery.toString(); }

      window.location = newUrl;
    }
  }
}

export { Table };