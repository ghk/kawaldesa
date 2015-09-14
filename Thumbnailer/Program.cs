using NetMQ;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Thumbnailer
{
    class Program
    {
        static void Main(string[] args)
        {
            while(true)
            {
                Console.WriteLine("Creating thumbnails...");
                try
                { 
                    Run();
                }
                catch(Exception e)
                {
                    Console.WriteLine("Error: "+e.Message);
                    Console.WriteLine(e.StackTrace);
                }
                Console.WriteLine("Finished creating thumbnails...");
                Thread.Sleep(60000);
            }
        }

        private static void Run()
        {
            var connStr = ConfigurationManager.AppSettings["ConnectionString"];
            using(NpgsqlConnection conn = new NpgsqlConnection(connStr))
            using(NpgsqlConnection updateConn = new NpgsqlConnection(connStr))
            using(NetMQContext mqContext = NetMQContext.Create())
            {
                conn.Open();
                updateConn.Open();

                // Define a query returning a single row result set
                using (NpgsqlCommand command = new NpgsqlCommand("select id, file_name, fk_file_id from source_documents where thumbnail_created = false;", conn))
                {
                    using (NpgsqlDataReader dr = command.ExecuteReader())
                    {
                        // Output rows
                        while (dr.Read())
                        {
                            CreateThumbnail((string)dr[1], (long)dr[2]);
                            using (NpgsqlCommand update = new NpgsqlCommand("update source_documents set thumbnail_created = true where id = " + dr[0], updateConn))
                            {
                                update.ExecuteNonQuery();
                            }
                            SendDumperMessage(mqContext,(string)dr[1], (long)dr[2]);
                        }
                    }
                }
            }
        }

        private static void SendDumperMessage(NetMQContext mqContext, string fileName, long id)
        {
            try
            {
                var dumperAddress = ConfigurationManager.AppSettings["DumperAddress"];
                if (!string.IsNullOrEmpty(dumperAddress))
                {
                    using (var sender = mqContext.CreatePushSocket())
                    {
                        sender.Connect(dumperAddress);
                        sender.Send("source "+fileName+" "+id);
                    }
                }
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                Console.WriteLine(e.StackTrace);
            }
        }

        private static void CreateThumbnail(string fileName, long id)
        {
            var contentRoot = ConfigurationManager.AppSettings["ContentRoot"];

            var fileRoot = Path.Combine(contentRoot, "files");
            var source = Path.Combine(fileRoot, fileName);

            var thumbRoot = Path.Combine(contentRoot, "thumbs");
            Directory.CreateDirectory(thumbRoot);
            var target = Path.Combine(thumbRoot, id+".png");

            ProcessStartInfo psi = new ProcessStartInfo();
            psi.FileName = ConfigurationManager.AppSettings["Thumbnailer"];
            psi.Arguments = "\""+source + "\" \"" + target +"\"";
            psi.WorkingDirectory = Path.GetDirectoryName(psi.FileName);
            var process = Process.Start(psi);
            process.WaitForExit();
        }
    }
}
