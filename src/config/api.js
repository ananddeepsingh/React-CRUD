const Utils = require('./Utils');
let baseURL = Utils.baseURL;

function processStatus(response){
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}

const setData = function (resolve, reject, obj) {
  Utils.loader(true);

  fetch(baseURL,{
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(obj)
  })
  .then(processStatus)
  .then( (json) => {
    Utils.loader(false);
    resolve(json)
  });
}

const getData = function (resolve, reject) {
  Utils.loader(true);

  fetch(baseURL)
  .then(processStatus)
  .then( (json) => {
    Utils.loader(false);
    resolve(json)
  });
}

const updateData = function (recordId, obj, resolve, reject) {
  Utils.loader(true);

  fetch(baseURL+"/"+recordId, {
    method: 'put',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify( obj )
  })
  .then(processStatus)
  .then( (json) => {
    Utils.loader(false);
    resolve(json)
  });
}

const deleteRecord = function (recordId, resolve, reject) {
  Utils.loader(true);

  fetch(baseURL+"/"+recordId, {
    method: 'delete',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then(processStatus)
  .then( json => {
    Utils.loader(false);
    resolve(json)
    return json;
  })
}

export {setData, getData, updateData, deleteRecord}