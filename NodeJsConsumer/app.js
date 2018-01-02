var AuthenticationContext    = require('adal-node').AuthenticationContext;
/* 
var authorityHostUrl = 'https://login.windows.net';
var tenant = 'myTenant.onmicrosoft.com'; // AAD Tenant name.
var authorityUrl = authorityHostUrl + '/' + tenant;
var applicationId = 'yourApplicationIdHere'; // Application Id of app registered under AAD.
var clientSecret = 'yourAADIssuedClientSecretHere'; // Secret generated for app. Read this environment variable.
var resource = 'https://ethereumfunctionappdemo.azurewebsites.net'; // URI that identifies the resource for which the token is valid.
*/

var sampledemo001AppId = '614ac59a-237d-47ed-947d-173e433984ec';
var sampledemo001Secret = 'vaKkbwLv+LH5qUaRf8hWXlaSPS31ym+wGd+OFlIc8c4=';
var applicationId = '226a16eb-5aa2-4d8f-9013-5a40881d39d3'; // Application Id of app registered under AAD.
var clientSecret = 'aI8L8fJYZLEpPd6IaVRizinty+0UOISc/Tz8B9eUzdk='; // Secret generated for app. Read this environment variable.
var siaclient2AppId = '226a16eb-5aa2-4d8f-9013-5a40881d39d3';
var siaclient2Secret = 'zsLCHJSVt3hRfo7nWNomDv81idA1W19umtXGeoqWlAE=';
var AuthenticationContext = require('adal-node').AuthenticationContext;
var authorityHostUrl = 'https://login.windows.net';
var tenant = 'microsoft.onmicrosoft.com';// AAD Tenant name.
var authorityUrl = authorityHostUrl + '/' + tenant;
//var authorityUrl = 'https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47';//authorityHostUrl + '/' + tenant;
//authorityUrl = authorityHostUrl + '/' + tenant ;//+ '/oauth2/authorize';
applicationId = siaclient2AppId;
clientSecret = siaclient2Secret;
var resource = sampledemo001AppId;
var context = new AuthenticationContext(authorityUrl);
 
context.acquireTokenWithClientCredentials(resource, applicationId, clientSecret, function(err, tokenResponse) {
  if (err) {
    console.log('well that didn\'t work: ' + err.stack);
  } else {
    console.log(tokenResponse);
  }
});


