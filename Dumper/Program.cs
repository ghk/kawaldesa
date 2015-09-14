using CsQuery;
using NetMQ;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Dumper
{
    class Program
    {
        private static string appHost = "http://localhost:11002";
        private static string bindAddress;
        private static string connectAddress;
        private static string root = "dumps";

        private static string[] apbnKeys = new string[] { "2015p" };
        private static string[] regionIds;
        private static WebClient webClient = new WebClient();
        static void Main(string[] args)
        {
            var settings = ConfigurationManager.AppSettings;
            appHost = settings["AppHost"];
            bindAddress = settings["BindAddress"];
            connectAddress = settings["ConnectAddress"];
            root = settings["Root"];

            if(args.Length >= 1)
            {
                switch (args[0])
                {
                    case "server":
                        Serve();
                        break;
                    case "client":
                        if (args.Length < 2) {
                            Console.WriteLine("dumper.exe client [message]");
                        }
                        Client(args[1]);
                        break;
                    case "regions":
                        DumpRegions();
                        break;
                }
            }
        }

        private static void InitialDump()
        {
            InitRegions();
            var sw = Stopwatch.StartNew();
            regionIds = File.ReadAllLines("regions.txt");
            Directory.CreateDirectory(root);

            Console.WriteLine("Downloading index");
            Download(appHost, Path.Combine(root, "index.html"));

            foreach(var apbnKey in apbnKeys)
            {
                foreach(var r in regionIds)
                {
                    var regionId = r;
                    var bundles = new string[] {"p", "dd", "add", "bhpr"};
                    foreach (var bundle in bundles)
                    {
                        Console.WriteLine("Downloading bundle {0} - {1} - {2}", apbnKey, regionId, bundle);
                        var dir = Path.Combine(root, "bundles", bundle, apbnKey);
                        string url = appHost+"/bundles/"+bundle+"/"+apbnKey+"/"+regionId+".json";
                        Directory.CreateDirectory(dir);
                        Download(url, Path.Combine(dir, regionId + ".json"));
                    }
                }
            }
            sw.Stop();
            Console.WriteLine("elapsed " + sw.Elapsed.TotalSeconds);
            Console.ReadLine();
        }

        private static void DumpRegions()
        {
            InitRegions();
            var sw = Stopwatch.StartNew();
            regionIds = File.ReadAllLines("regions.txt");
            Directory.CreateDirectory(root);

            foreach(var apbnKey in apbnKeys)
            {
                foreach(var r in regionIds)
                {
                    var regionId = r;
                    var bundles = new string[] {"p", "dd", "add", "bhpr"};
                    foreach (var bundle in bundles)
                    {
                        Console.WriteLine("Downloading bundle {0} - {1} - {2}", apbnKey, regionId, bundle);
                        var dir = Path.Combine(root, "bundles", bundle, apbnKey);
                        string url = appHost+"/bundles/"+bundle+"/"+apbnKey+"/"+regionId+".json";
                        Directory.CreateDirectory(dir);
                        Download(url, Path.Combine(dir, regionId + ".json"));
                    }
                }
            }
            sw.Stop();
            Console.WriteLine("elapsed " + sw.Elapsed.TotalSeconds);
        }

        private static void Serve()
        {
            Console.WriteLine("====== Server ======");
            InitRegions();

            using (NetMQContext ctx = NetMQContext.Create())
            {
                using (var receiver = ctx.CreatePullSocket())
                {
                    receiver.Bind(bindAddress);

                    while (true)
                    {
                        string cmd = receiver.ReceiveString();
                        Dump(cmd);
                    }
                }
            }
        }

        private static void InitRegions()
        {
            var rIds = File.ReadAllLines("regions.txt");
            regionIds = rIds.Select(r => r.Trim()).ToArray();
        }

        private static void Dump(string cmd)
        {
            try
            {
                Console.WriteLine("receive: "+cmd);
                var splits = cmd.Split();
                if(splits.Length > 0)
                {
                    switch (splits[0])
                    {
                        case "html":
                            DumpHtml();
                            return;
                        case "p":
                            if(splits.Length >= 3)
                            {
                                DumpP(splits[1], splits[2]);
                            }
                            else
                            {
                                Console.WriteLine("invalid cmd, require 2 args");
                            }
                            return;
                        case "dd":
                        case "add":
                        case "bhpr":
                            if(splits.Length >= 3)
                            {
                                DumpAlloc(splits[0], splits[1], splits[2]);
                            }
                            else
                            {
                                Console.WriteLine("invalid cmd, require 2 args");
                            }
                            return;
                        case "source":
                            if(splits.Length >= 3)
                            {
                                DumpSource(splits[1], splits[2]);
                            }
                            else
                            {
                                Console.WriteLine("invalid cmd, require 2 args");
                            }
                            return;
                    }
                }

                Console.WriteLine("cmd not found");
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                Console.WriteLine(e.StackTrace);
            }
        }

        private static void Client(string cmd)
        {
            Console.WriteLine("====== CLient ======");

            using (NetMQContext ctx = NetMQContext.Create())
            {
                using (var sender = ctx.CreatePushSocket())
                {
                    sender.Connect(connectAddress);
                    sender.Send(cmd);
                }
            }
        }

        private static void DumpHtml()
        {
            Directory.CreateDirectory(root);

            Console.WriteLine("Downloading index");
            CQ dom = webClient.DownloadString(appHost+"?anonForce=true");
            foreach(var script in dom["script"])
            {
                if (script.HasAttribute("src"))
                {
                    var src = script["src"];
                    if (src.Contains("/js/kawaldesa-lib"))
                        script["src"] = "/js/kawaldesa-lib.js";
                    if (src.Contains("/js/kawaldesa-own"))
                        script["src"] = "/js/kawaldesa-own.js";
                }
            }
            foreach(var script in dom["link"])
            {
                if (script.HasAttribute("src"))
                {
                    var src = script["src"];
                    if (src.Contains("/js/kawaldesa-lib"))
                        script["src"] = "/js/kawaldesa-lib.js";
                    if (src.Contains("/js/kawaldesa-own"))
                        script["src"] = "/js/kawaldesa-own.js";
                }
            }
            foreach(var link in dom["link"])
            {
                if (link.HasAttribute("href"))
                {
                    var href = link["href"];
                    if (href.Contains("/css/kawaldesa-all"))
                        link["href"] = "/css/kawaldesa-all.css";
                }
            }
            var htmlPath = Path.Combine(root, "index.html");
            File.WriteAllText(htmlPath, dom.Render());
            Gunzip(htmlPath);
            Download(appHost+"/js/kawaldesa-lib", Path.Combine(root, "js/kawaldesa-lib.js")); 
            Download(appHost+"/js/kawaldesa-own", Path.Combine(root, "js/kawaldesa-own.js")); 
            Download(appHost+"/css/kawaldesa-all", Path.Combine(root, "css/kawaldesa-all.css")); 
        }

        private static void DumpP(string apbnKey, string dumpedRegionId)
        {
            Directory.CreateDirectory(root);

            var bundle = "p";
            foreach(var regionId in GetSelfAndParents(dumpedRegionId))
            {

                Console.WriteLine("Downloading bundle {0} - {1} - {2}", apbnKey, regionId, bundle);
                var dir = Path.Combine(root, "bundles", bundle, apbnKey);
                string url = appHost+"/bundles/"+bundle+"/"+apbnKey+"/"+regionId+".json";
                Directory.CreateDirectory(dir);
                Download(url, Path.Combine(dir, regionId + ".json"));
            }
        }

        private static void DumpSource(string fileName, string id)
        {
            Directory.CreateDirectory(root);

            Download(appHost+"/Content/files/"+fileName, Path.Combine(root, "Content", "files", fileName)); 
            Download(appHost+"/Content/thumbs/"+id+".png", Path.Combine(root, "Content", "thumbs", id+".png")); 
        }

        private static void DumpAlloc(string bundle, string apbnKey, string dumpedRegionId)
        {
            Directory.CreateDirectory(root);
            foreach (var regionId in GetSelfAndChildren(dumpedRegionId))
            {
                Console.WriteLine("Downloading bundle {0} - {1} - {2}", apbnKey, regionId, bundle);
                var dir = Path.Combine(root, "bundles", bundle, apbnKey);
                string url = appHost + "/bundles/" + bundle + "/" + apbnKey + "/" + regionId + ".json";
                Directory.CreateDirectory(dir);
                Download(url, Path.Combine(dir, regionId + ".json"));
            }
        }

        private static List<String> GetSelfAndParents(String id)
        {
            List<String> results = new List<string>();
            var current = id;
            while(current != "0")
            {
                results.Add(current);
                if (current.IndexOf('.') < 1)
                    current = "0";
                else
                    current = current.Substring(0, current.LastIndexOf('.'));
            }
            results.Add(current);
            return results;
        }

        private static IEnumerable<String> GetSelfAndChildren(String id)
        {
            yield return id;

            Func<string, int> countDot = (str) => str.Count(c => c == '.');
            if(id == "0")
            {
                foreach (var regionId in regionIds)
                    if (countDot(regionId) < 1)
                        yield return regionId;

            }
            else
            {
                var maxDot = countDot(id)+1;
                foreach (var regionId in regionIds)
                    if (regionId.StartsWith(id+".") && countDot(regionId) <= maxDot)
                        yield return regionId;

            }
        }

        private static void Download(string url, string file)
        {
            webClient.DownloadFile(url, file);
            Gunzip(file);
        }

        private static void Gunzip(string file)
        {
            using (var source = new FileStream(file, FileMode.Open, FileAccess.Read))
            {
                using (FileStream target = new FileStream(file+".gz", FileMode.Create, FileAccess.Write))
                {
                    using (GZipStream gzs = new GZipStream(target, CompressionLevel.Optimal))
                    {
                        source.CopyTo(gzs);
                    }
                }
            }
        }
    }
}
