using log4net;
using NetMQ;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace App.Utils
{
    public class DumpMessager
    {
        private string dumperAddress;
        private NetMQContext netMQContext;
        private static ILog log = LogManager.GetLogger(typeof(DumpMessager));

        public DumpMessager(NetMQContext netMQContext)
        {
            this.dumperAddress = ConfigurationManager.AppSettings["DumperAddress"];
            this.netMQContext = netMQContext;
        }

        public void Message(string cmd)
        {
            if(dumperAddress == null)
            {
                log.Warn("empty DumperAddress config, ignoring: "+cmd);
                return;
            }
            try
            {
                using (var requestSocket = netMQContext.CreatePushSocket())
                {
                    requestSocket.Connect(dumperAddress);
                    requestSocket.Send(cmd);
                }
            } catch(Exception e)
            {
                log.Error("error on dumping", e);
            }
        }
    }
}