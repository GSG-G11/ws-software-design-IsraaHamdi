/*
 * Exercise: Create some modules!
 *
 * When you think you have finished, run the command:
 *   npm run module
 * This will run a series of tests which should all pass.
 */
'use strict';

/*
 * Create a single module (using an IIFE) which contains functionality to parse
 * URLs.
 *
 * We have started you off with the basic structure.
 *
 *     https    ://   www.example.com  /   hello  ?  foo=1&bar=2
 * |          |     |                |   |      |  |             |
 * | protocol |     |    domain      |   | path |  | querystring |
 */
 var UrlParser  = (function () {
  // fill in ...
  function protocol(url) {
    return url.split(":")[0]
  }
  function domain(url) {
    return url.split("//")[1].split("/")[0]
  }
  function path(url) {
    return url.split("//")[1].split("/")[1].split("?")[0]
  }
  function querystring(url) {
    return url.split("?")[1]
  }
  return {
    // a function that takes a URL and returns its protocol
    protocol: protocol,

    // a function that takes a URL and returns its domain
    domain:domain,

    // a function that takes a URL and returns its path
    path:path,

    // a function that takes a URL and returns its query string
    querystring: querystring,

  }
})();


/*
 * Create a module that can support multiple instances (like in our example).
 * The module should be a function with several additional methods attached as
 * attributes.
 *
 * Example:
 * var exampleBuilder = createUrlBuilder('https://example.com');
 *
 * var url = exampleBuilder({ query: { foo: 1, bar: 2 }, path: 'hello' });
 *
 * console.log(url); // https://example.com/hello?foo=1&bar=2
 *
 * exampleBuilder.
 */
var createUrlBuilder = function (host) {
  let URL=host
  function convertQueryToString (query) {
    let keys=Object.keys(query)
    /*add = between each key and value ,also add & at end of value 
    but if key is the last in array keys & not added */
    let stringQuery =""
    keys.map(function (key,i) {
      if(i === keys.length-1) {
        stringQuery +=`${key}=${query[key]}` 
      }else {
        stringQuery +=`${key}=${query[key]}&` 
      }
    })
    return stringQuery
  }

  var builder = function (obj){
    if (obj.hasOwnProperty('path')) {
      URL=`${URL}/${obj.path}`
    }
    if (obj.hasOwnProperty('query')) {
      URL=`${URL}?${convertQueryToString(obj.query)}`
    }
    builder.path = function (path) {
      return `${host}/${path}`
     }
     builder.query = function (query) {
       return `${host}?${convertQueryToString(query)}`
  
    }
    return URL
  }
 
  return builder
};


module.exports = {
  UrlParser,
  createUrlBuilder,
};
