module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    //https://docs.microsoft.com/zh-tw/azure/app-service/app-service-authentication-overview
    /*
    透過網頁瀏覽器來與您的應用程式互動的使用者會設定 Cookie，
    以便在瀏覽您的應用程式時，能夠維持在已驗證的狀態。 
    對於其他用戶端類型，例如行動，將會核發 JSON Web Token (JWT) (應該出現在 X-ZUMO-AUTH 標頭中) 給用戶端。 
    Mobile Apps 用戶端 SDK 將會為您處理這項工作。 
    或者，Azure Active Directory 身分識別權杖或存取權杖可能直接包含在 Authorization 標頭中，做為 持有人權杖。    
    */
    //Azure AD protected Function App endpoint that will be consumed by this HTTP Trigger
    var url = 'https://ethereumfunctionappdemo.azurewebsites.net/api/EthereumFunctionAppDemo?code=9A8Rx822g51rB9rIr6TaoogKFGRBX41SWJhSlyg0QEuTzk6pqUg8TA==';

    var options = {
        url: url,
        method:'GET',
        headers: {
            'Authorization':req.headers['authorization'],//If client is authenticated via Bearer token, it will be stored in "authorization" header, we simply pass this to downstream Function API
            'User-Agent': 'request',
            'Cookie':req.headers['cookie']  //when AAD authentication enaled in Function app, once client authenticated, authentication info is stored in Cookie. Use this cookie to invoke another REST endpoint in same Function App
        }
    };
    context.log(JSON.stringify(req.headers));
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
};