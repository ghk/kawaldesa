using App.Models;
using OfficeOpenXml;
using Scaffold;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace App.Controllers.Models
{
    public class DocumentUploadController: BaseController<DocumentUpload, long>
    {
        public DocumentUploadController(DB dbContext)
            : base(dbContext)
        {
        }
        protected override IQueryable<DocumentUpload> ApplyQuery(IQueryable<DocumentUpload> query)
        {
            var orgId = GetQueryString<long?>("fkOrganizationId");
            if(orgId.HasValue) 
                query = query.Where(r => r.fkOrganizationId == orgId.Value);

            var type = GetQueryString<int?>("Type");
            if(type.HasValue) 
                query = query.Where(r => r.Type == (DocumentUploadType) type);

            var regionId = GetQueryString<string>("fkRegionId");
            if (!string.IsNullOrEmpty(regionId))
                query = query.Where(r => r.fkRegionId == regionId);

            var createdById = GetQueryString<string>("fkCreatedById");
            if (!string.IsNullOrEmpty(createdById))
                query = query.Where(r => r.fkCreatedById == createdById);

            return query;
        }


    }
}