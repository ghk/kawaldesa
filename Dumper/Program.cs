using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Dumper
{
    class Program
    {
        private static string host = "http://localhost:11002";
        private static string[] apbnKeys = new string[] { "2015p" };
        private static string[] regionIds;
        private static WebClient webClient = new WebClient();
        static void Main(string[] args)
        {
            var sw = Stopwatch.StartNew();
            regionIds = File.ReadAllLines("regions.txt");
            if (Directory.Exists("dumps"))
                throw new ApplicationException("dumps dir exists");
            Directory.CreateDirectory("dumps");

            Console.WriteLine("Downloading index");
            webClient.DownloadFile(host, "dumps/index.html");

            foreach(var apbnKey in apbnKeys)
            {
                foreach(var r in regionIds)
                {
                    var regionId = r.Trim();
                    var bundles = new string[] {"p", "dd", "add", "bhpr"};
                    foreach (var bundle in bundles)
                    {
                        Console.WriteLine("Downloading bundle {0} - {1} - {2}", apbnKey, regionId, bundle);
                        var dir = Path.Combine("dumps", "bundles", bundle, apbnKey);
                        string url = host+"/bundles/"+bundle+"/"+apbnKey+"/"+regionId+".json";
                        Directory.CreateDirectory(dir);
                        webClient.DownloadFile(url, Path.Combine(dir, regionId + ".json"));
                    }
                }
            }
            sw.Stop();
            Console.WriteLine("elapsed " + sw.Elapsed.TotalSeconds);
            Console.ReadLine();
        }
    }
}
