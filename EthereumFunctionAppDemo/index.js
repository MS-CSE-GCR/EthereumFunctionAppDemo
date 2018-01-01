module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    var txURL = process.env.TX_URL;//"http://52.234.144.43:8545";
    if(req.method == 'GET'){
        context.log(JSON.stringify(context.req));
        var Web3 = require('Web3');
        var web3 = new Web3();
        web3.setProvider(new web3.providers.HttpProvider(txURL));
        context.res = {
            accounts :web3.eth.accounts,
            status: 'ok'
        };
        context.done();
    }
    context.res = {
        status: 400,
    }; 
    context.done();
};