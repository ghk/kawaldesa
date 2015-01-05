using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net;
using System.Security.Cryptography;
using System.IO;
using System.Net.Http;

namespace App.Security
{
    public static class CryptographyHelper
    {
        private static UTF8Encoding encoding = new UTF8Encoding();
        private static HashAlgorithm md5 = HashAlgorithm.Create("MD5");

        public static bool IsMethodNeedsContent(HttpMethod method)
        {
            if (method.Equals(HttpMethod.Post) || method.Equals(HttpMethod.Put))
                return true;
            return false;
        }

        public static String Sign(HttpRequestMessage request, String secretKey)
        {
            String message = BuildMessage(request);

            HMACSHA512 hmac = new HMACSHA512(Convert.FromBase64String(secretKey));
            byte[] signature = hmac.ComputeHash(encoding.GetBytes(message));
            
            return Convert.ToBase64String(signature);
        }

        private static String BuildMessage(HttpRequestMessage request)
        {
            String message = "";
            message += request.Method + "\n";
            message += request.Headers.GetValues(KawalDesaHeaders.X_KD_EXPIRES).FirstOrDefault() + "\n";
            if (IsMethodNeedsContent(request.Method))
            {
                message += Convert.ToBase64String(request.Content.Headers.ContentMD5) +"\n";
                message += request.Content.Headers.ContentLength.Value + "\n";
                message += request.Content.Headers.ContentType.MediaType + "\n";                
            }
            else
            {
                message += "\n\n\n";
            }

            return message;
        }
        
        public static String GenerateSecretKey() 
        {
            RNGCryptoServiceProvider rngCsp = new RNGCryptoServiceProvider();
            byte[] randomBytes = new byte[512];
            rngCsp.GetBytes(randomBytes);
            return Convert.ToBase64String(randomBytes);
        }

    }


}
