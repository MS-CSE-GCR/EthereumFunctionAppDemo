Integrate Function App with Ethereum
====================================

Abstract
--------

One of the challenges in adopting Blockchain technology in a consortium chain
environment is to have a stable, fast-deploy, easy management to deploy your
middleware services to integrate with Blockchain. The middleware environment has
to be able to not only leverage existing popular Blockchain library, but also
has to provide modern software tools for enterprises DevOps, testing needs.

In this document, we use Azure Function App to create a middleware layer that
leverages Web.Js to communicate with Ethereum consortium network. We will be
demonstrating how to setup Azure Function App integrated with continue
deployment features, as well as to demonstrate required steps to setup your
Function App as Ethereum consortium middleware for blockchain participants.

How to use
----------

We assume you have basic Azure experience, you have basic knowledge on how to
create Azure services as well as to have basic knowledge on how to manage them.

This document is focusing on how to create, deploy and test an Ethereum network
integrated middleware. We will not be covering how to create Ethereum network,
how to write smart contracts, how to deploy and test smart contracts in this
document. If you have interests in these topics, please refer to
[Solidity](http://solidity.readthedocs.io/en/develop/introduction-to-smart-contracts.html)
and [Ethereum official site.](https://www.ethereum.org/) We will be discussing
Azure Active Directory integration to authenticate callers in high-level,
however security aspect is not major concern in this document.

You must have a Github account in order to follow CD setup steps describe in
this document but it is not required. All source codes can be edit directly in
Azure Function App online code editor without CD enabled.

Table of Content
----------------
[Create Function App and Setup CD](#create-function-app-and-setup-cd)

[Setup Function App Local Test Environment and Github source control](#setup-function-app-local-test-environment-and-github-source-control)

[Write your Ethereum middleware](#write-your-ethereum-middleware)

[Deploy your middleware](#deploy-your-middleware)

[Enable Azure AD Authentication](#enable-azure-ad-authentication)

[Troubleshooting](#troubleshooting)

[Writing Client Application](#writing-client-application)

### Create Function App and Setup CD ###
--------------------------------

In this section, we will be introducing how to setup Azure Function App continue
deployment with Github repository. Please refers Microsoft official document
site for [Azure Function creation
steps](https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-azure-function)
if required.

-   Login to your GitHub account, create a repository called
    EthereumFunctionAppDemo as our deployment source if you don’t have one yet..

![](media/5ec9dcb662f231b2c1e623eae7b9a442.png)

-   Note down Git URL

![](media/6f354e017aedc6d8e1f27528fdb42fe9.png)

-   Create an Azure Function App if you don’t have one.

    -   Choose JavaScript as programing language so that we can use
        [web3.js](https://github.com/ethereum/web3.js/) in our demo.

    -   You can choose either App Service Plan or Consumption plan, in this
        document we will be choosing App Service Plan with B1 pricing tier.

    -   In this document we use Windows as our underlying operation system.

-   Once created, go to your Function App’s Overview section.

-   Add a new JavaScript Http Trigger Function

![](media/5a3b3fe574af96143135cb2d97445088.png)

-   Navigate to the newly created Function App on Azure portal. Go to Platform
    Features, then Deployment credentials.

![](media/1b78324e7e7e2504aa82257237b495c3.png)

-   Create a username and password

![](media/46ee4cf0beb67a9d64d56e41d6401386.png)

-   Go to platform features, Properties

![](media/beb8b7d017db3442781b022a510de523.png)

-   Note FTP url then use the credential you created in previous steps to
    download source codes to your local machine.

![](media/d69a79553ee0c7c416ab6ed2f04da0fc.png)

-   Goto Platform Features, Function App Settings. Switch runtime to Beta
    runtime.

![](media/dcee709b4b4c76f96bd0eaec93ee2c5e.png)

-   Go back to Azure Portal, go to Deployment Options

![](media/ab241c08f5326fb3919949ce5e5862a9.png)

-   Click Setup if you don’t have any deployment configuration setup yet

![](media/f4d1ee477d7e65f4d21e8cebf7bb5dfd.png)

-   Choose Github as your source

![](media/4e986339c2ca8ac39128dea75472bba6.png)

-   Choose the repository we created in first step as sources

![](media/5d6d377cc4273d00efd6c42e593faa80.png)

-   Click OK to connect. Now you have successfully setup Continuous Deployment
    for Azure Function App.

### Setup Function App Local Test Environment and Github source control ###
-------------------------------------------------------------------

Detail steps and requirements of installing Function App Local environment are
described here:
<https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local> ,
please pay additional attention on prerequisites. In this demo, we will be using
Function App runtime 2.X, which requires to install .Net Core 2.0 on your
machine.

Azure Function currently supports Node version greater than 8.4.0, please make
sure you have Node version greater than 8.4.0 installed.

-   Open command prompt, execute blow command to install Function App 2.X
    runtime

-   npm install -g azure-functions-core-tools\\\@core

-   Create an empty folder, we will be using this folder as our local repository

-   Switch to the newly created folder, execute the following command to
    initiate func init EthereumFunctionAppDemo

![](media/7f11e9be9b0d9839c83b91b294efdf43.png)

-   Switch current folder to the newly created folder.

-   Execute below command to create a new Azure Function local environment, the
    name of the Function App should matches to the Function App you created in
    Azure portal. When prompt to choose Language, Trigger type and name, use Up,
    Down key to choose and Enter to confirm

func new EthereumFunctionAppDemo

![](media/001746f4639a1cd3d24b2e097b7e5ab9.png)

-   Execute below command to add current folder to source control
```
git add .
```
-   Commit changes
```
git commit -m “init”
```
-   Configure remote repository
```
git remote add origin \\\<YOUR GIT URL\\\>
```
-   Push codes to remote repository
```
git push -u origin master
```

![](media/44f65affa44484bdae22bb399b4db0ce.png)

-   Now you have successfully configured Function App local runtime and Github
    source control.

-   To test Azure Function App locally, switch to project folder and run “func
    host start”

![](media/9db7e922cf6d1aadb4aec5d61a5cbf45.png)

-   Open browser and verify your local Function App environment

![](media/7537e5a925dbbe20ec4ca83596d594dd.png)

### Write your Ethereum middleware ###
------------------------------

In this section, we will be using Visual Studio Code to write codes, however,
you can use your favorite Node.JS editor of your choice.

-   Open Command Prompt, go to the Function App folder we created in above steps
    and run below commands to initiate a node package file and then install web3
    library. \`\`\` npm init

npm install -s <web3@0.19.0> \`\`\`

![](media/7a985982144fe7e1d330b2d9e96cf36e.png)

-   Launch Visual Studio Code and open the project folder we created.

-   Let’s add very basic function to list all accounts created in blockchain,
    modify Index.js as below

```js
module.exports = function (context, req) {  
    context.log('JavaScript HTTP trigger function processed a request.');  
    var txURL = "http://\\\<YOUR TRANSACTION NODE URL\\\>:8545";  
    if(req.method == 'GET'){  
        var Web3 = require('Web3');  
        var web3 = new Web3();  
        web3.setProvider(new web3.providers.HttpProvider(txURL));  
        context.res = {  
            accounts :web3.eth.accounts,  
            status: 'ok'  
        };  
        context.done();  
    } else{  
        context.res = {  
        status: 400,          
        context.res = {  
            status: 400,  
        };  
        context.done();  
        }
    };
}
```

-   Open command prompt, execute Function app in local machine to test it
    locally

![](media/c0246183c8a786fb88464b073a890120.png)

-   Open browser, navigate to
    <http://localhost:7071/api/EthereumFunctionAppDemo>

-   You should see all accounts created in the blockchain listed in JSON format.

![](media/69b4ab7bd90b2543417f3968020d595c.png)

### Deploy your middleware ###
----------------------

-   Once we have verified Function App locally, we are good to deploy to Azure
    environment. First commit and push your codes to github repository.

![](media/f110c55b7f98a644349ff4db7bbf80a5.png)

-   Go to Azure portal, open Function App we created in previous step, go to
    Deployment Options

![](media/1f91739dedddaf15a1df78f79eae5f60.png)

-   Click “Sync” to update existing Function App with newly committed codes

![](media/f2ab06293bed2e4b6412c56941c94c95.png)

-   You need to configure CORS setting in order to allow external consumers to
    invoke your Function App. Since we are just to test our Function App, you
    can add “\*” to CORS to allow all externals.

![](media/99b093d6df735919fffeb218e30a81d3.png)

![](media/abdf0d0cb8d111a481ac79f8d7d02137.png)

-   Open browser, navigate to Function App URL and see the results.

![](media/fdbcf18083ad9f623b840eb893d9f80b.png)

### Enable Azure AD Authentication ###
------------------------------

In this section, we will be enable Azure AD authentication to protect our API.
Details discussion on Azure AD’s authorization is here:
<https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-v2-protocols-oauth-client-creds>

We will also be writing a client application to consume this API. Some
discussion from StackOverflow which is useful can be found here:
<https://stackoverflow.com/questions/44337449/postman-you-do-not-have-permission-to-view-this-directory-or-page-with-bearer>

-   Goto Azure Portal, navigate to Function App, Platform Features,
    Authentication/Authorization

![](media/19c14c710b51656e6a8533116f79f0d9.png)

-   Choose Azure AD

![](media/be2c2a48519983499bf3fa5475efc3ac.png)

-   Use Express setting and click OK to complete Azure AD configuration

![](media/2a07d99b1d5f363ee0e7f66a4b7c939c.png)

-   Go back to “Express” mode, click “Manage Application” to open Azure AD
    application registration tab

![](media/8d202dd00420c1331f6812c65ebd116c.png)

-   Switch to “Advanced” mode, note “Application ID”

![](media/056a466107f611e3fdbbbc4aedd80a34.png)

-   Go to “Required Permissions” tab, Windows Azure Active Directory, default
    permission is sufficient for our API, you may want to grant other
    permissions when needed.

![](media/5ec7abec51e729821b63bde35e35a5ff.png)

-   Goto Properties, note “App ID URI”

![](media/106fcea62bf9a96fcf9cbdd97314b4ee.png)

-   Switch back to “Advanced” mode, add “App ID URL” we just copied to “Allowed
    Token Audiences” and Copy the “Client Secret”, we will need it in our
    consumer application.

![](media/fcb0396afe730756ce35a6dfe078d31b.png)

-   Once complete, leave Management Mode in “Advanced” than click “OK” than
    “Save” to accept settings.

![](media/319ad279744ff21983e936ebd800b688.png)

### Writing Client Application ### 
--------------------------

In this section we will be introducing how to write a client application to
consume Azure AD protected Function App.

-   Create a new Console Application in Visual Studio, add below Nuget package

![](media/7f024d1a4e3f4076e3bdb2c82ccb43a8.png)

-   In order to invoke an Azure AD protected API, we must first acquire access
    token.
```csharp
static async Task\<string\> GetToken2(string url, string cid, string secret)
{

    var postData =
    $"client_id={cid}\&scope={url}.default&client_secret={secret}&grant_type=client_credentials";

    var http = new System.Net.Http.HttpClient();

    //Replace below highlighted with your own Tenant ID

    var resp = await http.PostAsync( "https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47/oauth2/v2.0/token" , new StringContent( postData, Encoding.ASCII, "application/x-www-form-urlencoded"));

    var body = await resp.Content.ReadAsStringAsync();

    JObject o = JsonConvert.DeserializeObject\<JObject\>(body);

    return o["access_token"].Value\<string\>();

}
```
-   To invoke protected API with access token we just acquired.
```csharp
static void Main(string[] args)
{
    var encodedUri = HttpUtility.UrlEncode(Encoding.ASCII.GetBytes("{APP ID URL We
note in previous step (https://somehost.domain/blah)}"));

    var token = Task.Run(() =\> GetToken2(encodedUri, "{app id}", "{client
secret}")).Result;

    var http = new System.Net.Http.HttpClient();

    http.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

    var resp = Task.Run(() =\> http.GetAsync("{Function App’s Http Trigger
endpoint}")).Result;

    var body = Task.Run(() =\> resp.Content.ReadAsStringAsync()).Result;

    Console.WriteLine(body);

    Console.ReadLine();
}
```

-   Full sample codes can be found [here](ConsumerApp/ConsoleApp2)


### Troubleshooting ###
---------------
