using App.Models;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v2;
using Google.Apis.Drive.v2.Data;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading;
using System.Web;

namespace App.Utils
{
    public class DriveUtils
    {
        private DriveService driveService;
        private String parentDirectoryId;

        public DriveUtils(String keyEmail, String keyFilePath, String parentDirectoryId)
        {
            var certificate = new X509Certificate2(System.IO.File.ReadAllBytes(keyFilePath), "notasecret", X509KeyStorageFlags.PersistKeySet | X509KeyStorageFlags.Exportable | X509KeyStorageFlags.MachineKeySet);

            ServiceAccountCredential credential = new ServiceAccountCredential(
               new ServiceAccountCredential.Initializer(keyEmail)
               {
                   Scopes = new[] { DriveService.Scope.Drive }
               }.FromCertificate(certificate));


            this.driveService = new DriveService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = "kawaldesa",
            });

            this.parentDirectoryId = parentDirectoryId;
        }

        public string UploadFile(string filePath, string fileName)
        {
            var mime = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            File body = new File();
            body.Title = fileName;
            body.Description = "Kawaldesa file";
            body.MimeType = mime;
            body.Parents = new List<ParentReference>() { new ParentReference() { Id = parentDirectoryId } };

            byte[] byteArray = System.IO.File.ReadAllBytes(filePath);
            System.IO.MemoryStream stream = new System.IO.MemoryStream(byteArray);

            FilesResource.InsertMediaUpload request = driveService.Files.Insert(body, stream, mime);
            request.Convert = true; 
            request.Upload();
            return request.ResponseBody.Id;
        }
        public string CreateParentDirectory()
        {
            File body = new File();
            body.Title = "kawaldesa-root-3";
            body.Description = "Kawaldesa root file";
            body.MimeType = "application/vnd.google-apps.folder";

            FilesResource.InsertRequest request = driveService.Files.Insert(body);
            var result = request.Execute();

            Permission newPermission = new Permission();
            newPermission.Value = "anyone";
            newPermission.Type = "anyone";
            newPermission.Role = "reader";
            driveService.Permissions.Insert(newPermission, result.Id).Execute();

            return result.Id+"\n"+result.WebViewLink;
        }

        private static string GetMimeType(string fileName)
        {
            string mimeType = "application/unknown";
            string ext = System.IO.Path.GetExtension(fileName).ToLower();
            Microsoft.Win32.RegistryKey regKey = Microsoft.Win32.Registry.ClassesRoot.OpenSubKey(ext);
            if (regKey != null && regKey.GetValue("Content Type") != null)
                mimeType = regKey.GetValue("Content Type").ToString();
            return mimeType;
        }
    }
}