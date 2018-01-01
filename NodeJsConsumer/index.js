module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    var url = 'https://ethereumfunctionappdemo.azurewebsites.net/api/EthereumFunctionAppDemo?code=9A8Rx822g51rB9rIr6TaoogKFGRBX41SWJhSlyg0QEuTzk6pqUg8TA==';
    var request_options = {
            method: 'GET',
            host: 'ethereumfunctionappdemo.azurewebsites.net',
            path: '/api/EthereumFunctionAppDemo?code=9A8Rx822g51rB9rIr6TaoogKFGRBX41SWJhSlyg0QEuTzk6pqUg8TA=='
    };
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
/*
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