//https://medium.com/@Usurer/azure-function-with-azure-ad-authentication-application-settings-and-adal-js-usage-example-ae0ef4bc47a9
//https://www.npmjs.com/package/adal-node
module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    var txURL = process.env.TX_URL;
    if(req.method == 'GET'){
        var name = '';
        var token = '';
        try{
            name = req.headers['x-ms-client-principal-name'];
            token = req.headers['x-ms-token-aad-id-token'];
            context.log('name=' + name);
            context.log('token=' + token);
            
        }catch(ex){

        }
        var Web3 = require('Web3');
        var web3 = new Web3();
        web3.setProvider(new web3.providers.HttpProvider(txURL));
        context.res = {
            user:name,
            accounts :web3.eth.accounts,
            status: 'ok'
        };
        context.done();
    }
    context.res = {
        user: name,
        status: 'error',
    }; 
    context.done();
};