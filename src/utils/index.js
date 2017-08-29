
const decodeHtmlEntities = function(str) {
  return str.replace(/&#(\d+);/g, function(match, dec) {
    return String.fromCharCode(dec);
  });
};

export function parseWPResponse(arr) {
  for(var i=0;i<arr.length;i++) {
    if(arr[i].title && arr[i].title.rendered) {
      arr[i].title.rendered = decodeHtmlEntities(arr[i].title.rendered);
    }

    if(arr[i].content && arr[i].content.rendered) {
      arr[i].content.rendered = decodeHtmlEntities(arr[i].content.rendered);
    }

    if(arr[i].description) {
      arr[i].description = decodeHtmlEntities(arr[i].description);
    }
  }

  return arr;
};

export function fetchData(endpoint, handler) {
  fetch(endpoint)
    .then(res => res.json())
    .then(res => parseWPResponse(res))
    .then(handler);
}

export default parseWPResponse;
