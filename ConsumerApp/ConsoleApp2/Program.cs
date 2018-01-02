using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Dynamic;
using Newtonsoft.Json.Linq;

namespace ConsoleApp2
{
    class Program
    {
        static async Task<string> GetToken2(string url, string cid, string secret)
        {
            //https://stackoverflow.com/questions/44337449/postman-you-do-not-have-permission-to-view-this-directory-or-page-with-bearer -> Works!
            var postData = $"client_id={cid}&scope={url}.default&client_secret={secret}&grant_type=client_credentials";
            var http = new System.Net.Http.HttpClient();
            
            var resp = await http.PostAsync("https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47/oauth2/v2.0/token",
                        new StringContent(postData,Encoding.ASCII, "application/x-www-form-urlencoded"));
            var body = await resp.Content.ReadAsStringAsync();
            JObject o = JsonConvert.DeserializeObject<JObject>(body) ;
            return o["access_token"].Value<string>();
        }
        
        static void Main(string[] args)
        {
            var token = Task.Run(() => GetToken2("https%3A%2F%2Fethereumfunctionappdemo.azurewebsites.net%2Fapi%2FEthereumFunctionAppDemo%2F", "{Application Id}", "{Client Secret}")).Result;

            var http = new System.Net.Http.HttpClient();
            http.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
            var resp = Task.Run(() => http.GetAsync("https://ethereumfunctionappdemo.azurewebsites.net/api/NodeJsConsumer?code=TTplIEfWza2bSVHppDBapCMBW2AnH6q4yOeEwUfEdfeTq0vnkYaY6A==")).Result;
            var body = Task.Run(() => resp.Content.ReadAsStringAsync()).Result;

            Console.WriteLine(body);
            Console.ReadLine();
        }
    }
}
