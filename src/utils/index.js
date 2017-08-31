
export function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function decodeHtmlEntities(str) {
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

export function fetchData(endpoint, handler, page = 1, data = []) {
  const per_page = 100;
  return fetch(endpoint + "&per_page=" + per_page + "&page=" + page)
    .then(res => res.json())
    .then(res => {
      if(res.code !== 'rest_post_invalid_page_number')
        data = [...data, ...res];

      if(!res.length || res.length <= per_page) {
        const results = parseWPResponse(data);
        return handler(results);
      }

      return fetchData(endpoint, handler, page + 1, data);
    })
}

export default parseWPResponse;
