let baseURL = 'http://localhost:3000/data';

function loader(status){
  var loader = document.querySelector("#loader")

  if(loader && status){
    loader.classList.add('show');
    loader.classList.remove('hide');
  }else{
    loader.classList.add('hide');
    loader.classList.remove('show');
  }
}

function validateStr(str){
  let output = str.replace(/\w+/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1);
  }).replace(/\s/g, '');// remove any spaces

  let final = output.replace(/[^a-zA-Z ]/g, "");

  return final;
}

function sortByFalse(a, b) {
		
  //var genreA = a.status.toUppercase();
  //var genreB = b.status.toUppercase();
  var genreA = a.status;
  var genreB = b.status;
  
  var  comparison = 0;
  if (genreA > genreB) {
  comparison = 1;
  } else if (genreA < genreB) {
  comparison = -1;
  }
  return comparison;
}

function sort(a, b) {
  var genreA = a.email;
  var genreB = b.email;
  
  var  comparison = 0;
  if (genreA < genreB) {
  comparison = 1;
  } else if (genreA > genreB) {
  comparison = -1;
  }
  return comparison;
}

function toggleElementClass(ele){
  if(ele.classList.contains('hide')){
    ele.classList.remove('hide');
    ele.classList.add('show');
  }else{
    ele.classList.remove('show');
    ele.classList.add('hide');
  }
}

function sortData(arr, sortKey, sortingType){
  debugger;
  if(sortingType === 'asc'){
    return arr.sort((a, b) => asc(a.sortKey, b.sortKey))
  }else{
    return arr.sort((a, b) => desc(a.sortKey, b.sortKey))
  }
}

function desc(a, b){
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}
 
function asc(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

export { baseURL, loader, validateStr, sort, toggleElementClass, desc, asc, sortData}