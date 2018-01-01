module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    var txURL = process.env.TX_URL;//"http://52.234.144.43:8545";
    if(req.method == 'GET'){
        context.log(context.req.headers['x-ms-token-aad-id-token']);
        context.log(context.req.headers.name);  //login user name
        var user = context.req.headers.name;
        var token = '';
        try{
            token = context.req.headers['x-ms-token-aad-id-token'];
        }catch{

        }
        var Web3 = require('Web3');
        var web3 = new Web3();
        web3.setProvider(new web3.providers.HttpProvider(txURL));
        context.res = {
            accounts :web3.eth.accounts,
            user: user,
            token:token,
            status: 'ok'
        };
        context.done();
    }
    context.res = {
        user: user,
        token:token,
        status: 400,
    }; 
    context.done();
};