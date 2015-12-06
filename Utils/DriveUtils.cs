using App.Models;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v2;
using Google.Apis.Drive.v2.Data;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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

        public System.IO.Stream GetFileStream(string googleSheetId)
        {
            if (string.IsNullOrEmpty(googleSheetId))
                return null;

            FilesResource.ListRequest request = driveService.Files.List();

            var getFile = this.driveService.Files.Get(googleSheetId);
            File file = AsyncHelpers.RunSync(() => getFile.ExecuteAsync());
   
            string downloadUrl = file.ExportLinks.FirstOrDefault(e => e.Key == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet").Value;
            var documentStream = AsyncHelpers.RunSync(() => this.driveService.HttpClient.GetStreamAsync(downloadUrl));
            return documentStream;
        }

        public bool IsFileExists(string parentId, string directoryName)
        {
            FilesResource.ListRequest request = driveService.Files.List();
            request.Q = string.Format("'{0}' in parents and title = '{1}'", parentId, directoryName);
            request.MaxResults = 1;
            var result = AsyncHelpers.RunSync(request.ExecuteAsync);
            return result.Items.Count > 0;
        }

        public string UploadFile(string parentDir, string filePath, string fileName)
        {
            var mime = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            File body = new File();
            body.Title = fileName;
            body.Description = "Kawaldesa file";
            body.MimeType = mime;
            body.Parents = new List<ParentReference>() { new ParentReference() { Id = parentDir } };

            byte[] byteArray = System.IO.File.ReadAllBytes(filePath);
            System.IO.MemoryStream stream = new System.IO.MemoryStream(byteArray);

            FilesResource.InsertMediaUpload request = driveService.Files.Insert(body, stream, mime);
            request.Convert = true; 
            var progress = AsyncHelpers.RunSync(request.UploadAsync);
            return request.ResponseBody.Id;
        }
        public string CreateRootDirectory()
        {
            File body = new File();
            body.Title = "Kawal Desa Spreadsheet Roots Devel";
            body.Description = "Kawal Desa Spreasheet Roots";
            body.MimeType = "application/vnd.google-apps.folder";

            FilesResource.InsertRequest request = driveService.Files.Insert(body);
            var result = AsyncHelpers.RunSync(request.ExecuteAsync);

            Permission newPermission = new Permission();
            newPermission.Value = "anyone";
            newPermission.Type = "anyone";
            newPermission.Role = "reader";
            AsyncHelpers.RunSync(driveService.Permissions.Insert(newPermission, result.Id).ExecuteAsync);

            newPermission = new Permission();
            newPermission.Value = "kawaldesaorg@gmail.com";
            newPermission.Type = "user";
            newPermission.Role = "writer";
            AsyncHelpers.RunSync(driveService.Permissions.Insert(newPermission, result.Id).ExecuteAsync);

            return result.Id;
        }

        public string CreateParentDirectory(string writerEmail, string directoryName)
        {
            File body = new File();
            body.Title = directoryName;
            body.Description = directoryName;
            body.MimeType = "application/vnd.google-apps.folder";
            body.Parents = new List<ParentReference>() { new ParentReference() { Id = parentDirectoryId } };

            FilesResource.InsertRequest request = driveService.Files.Insert(body);
            var result = AsyncHelpers.RunSync(request.ExecuteAsync);

            Permission newPermission = new Permission();
            newPermission.Value = "anyone";
            newPermission.Type = "anyone";
            newPermission.Role = "reader";
            AsyncHelpers.RunSync(driveService.Permissions.Insert(newPermission, result.Id).ExecuteAsync);

            newPermission = new Permission();
            newPermission.Value = "kawaldesaorg@gmail.com";
            newPermission.Type = "user";
            newPermission.Role = "writer";
            AsyncHelpers.RunSync(driveService.Permissions.Insert(newPermission, result.Id).ExecuteAsync);

            if(writerEmail != null)
            {
                newPermission = new Permission();
                newPermission.Value = writerEmail;
                newPermission.Type = "user";
                newPermission.Role = "writer";
                AsyncHelpers.RunSync(driveService.Permissions.Insert(newPermission, result.Id).ExecuteAsync);
            }

            return result.Id;
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