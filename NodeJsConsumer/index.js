module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    //Azure AD protected Function App endpoint that will be consumed by this HTTP Trigger
    var url = 'https://ethereumfunctionappdemo.azurewebsites.net/api/EthereumFunctionAppDemo?code=9A8Rx822g51rB9rIr6TaoogKFGRBX41SWJhSlyg0QEuTzk6pqUg8TA==';

    var options = {
        url: url,
        method:'GET',
        headers: {
            'User-Agent': 'request',
            'Cookie':req.headers['cookie']  //when AAD authentication enaled in Function app, once client authenticated, authentication info is stored in Cookie. Use this cookie to invoke another REST endpoint in same Function App
        }
    };
    const request = require('request');
    context.log('sending request with bearer header...');
    request(options, (err, res, body) => {
        if (err) { 
            context.log('error=' + err); 
            context.res = {
                status:400
            };
            context.done();
            return context.log(err); 
        }
        context.log('body=' + body);
        context.log('body json=' + JSON.stringify(res));
            context.res = {
                status:200,
                body:JSON.stringify(res)
            };
        context.done();  
    });
    
/*
    var AuthenticationContext = require('adal-node').AuthenticationContext;
    var authorityHostUrl = 'https://login.windows.net';
    var tenant = 'microsoft.onmicrosoft.com'; // AAD Tenant name.
    var authorityUrl = authorityHostUrl + '/' + tenant;
    var applicationId = '<application id>'; // Application Id of app registered under AAD.
    var clientSecret = '<client secret>'; // Secret generated for app. Read this environment variable.
    var resource = 'https://ethereumfunctionappdemo.azurewebsites.net'; // URI that identifies the resource for which the token is valid.

    var authContext = new AuthenticationContext(authorityUrl);
    authContext.acquireTokenWithClientCredentials(resource, applicationId, clientSecret, 
        function(err, tokenResponse) {
            if (err) {
                context.log('well that didn\'t work: ' + err.stack);
                context.res = {
                    status:400,
                    body:JSON.stringify(res)
                };
                context.done();              
            } else {
                context.log('tokenResponse=' + tokenResponse);
                context.log('cookie=' + req.headers['cookie']);
                var bearer = tokenResponse.accessToken;
                var options = {
                    url: url,
                    method:'GET',
                    headers: {
                        //'Authorization': 'Bearer ' + bearer,
                        'User-Agent': 'request',
                        'Cookie':req.headers['cookie']
                    }
                };
                const request = require('request');
                context.log('sending request with bearer header...' + bearer);
                request(options, (err, res, body) => {
                if (err) { 
                    context.log('error=' + err); 
                    context.res = {
                        status:400
                    };
                    context.done();
                    return context.log(err); 
                    }
                context.log('body=' + body);
                context.log('body json=' + JSON.stringify(res));
                    context.res = {
                        status:200,
                        body:JSON.stringify(res)
                    };
                    context.done();  
                });                 
            }
    });
    context.log('..............');
*/
/*
    const request = require('request');
    request(url, { json: true }, (err, res, body) => {
    if (err) { 
        context.log('error=' + err); 
        context.res = {
            status:400
        };
        context.done();
        return context.log(err); 
        }
    context.log('body=' + body);
    context.log('body json=' + JSON.stringify(res));
        context.res = {
            status:200,
            body:JSON.stringify(res)
        };
        context.done();  
    });    
*/
/*
    var request_options = {
            method: 'GET',
            host: 'ethereumfunctionappdemo.azurewebsites.net',
            path: '/api/EthereumFunctionAppDemo?code=9A8Rx822g51rB9rIr6TaoogKFGRBX41SWJhSlyg0QEuTzk6pqUg8TA=='
    };
    const https = require('https');

    https.get(url, (resp) => {
      let data = '';
        context.log('here...');
        // A chunk of data has been recieved.
          resp.on('data', (chunk) => {
            context.log(chunk);
            data += chunk;
            context.res = {
                status:200,
                data:data
            };
            context.done();        
          });
        // The whole response has been received. Print out the result.
          resp.on('end', () => {
            context.log(JSON.parse(data));
            context.res = {
                status:200
            };
            context.done();
        });
        resp.on('error', (err) =>{
            context.log(JSON.parse(err));
            context.res = {
                status:400
            };
            context.done();        
        });
    }).on("error", (err) => {
      context.log("Error: " + err.message);
        context.res = {
            status:400
        };
        context.done();    
    }); 
*/   
};