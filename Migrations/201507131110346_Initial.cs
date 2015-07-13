namespace App.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    using System.IO;
    using System.Web;
    using System.Web.Hosting;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            Sql(File.ReadAllText(MapPath(String.Format("~/SQLs/region_parents.sql"))));
            Sql(File.ReadAllText(MapPath(String.Format("~/SQLs/region_desa_counts.sql"))));

            foreach (var scope in new String[]{"national", "regional"})
            {
                foreach (var type in new String[]{"dd", "add", "bhpr"})
                {
                    DropTable(String.Format("{0}_{1}_recapitulations", scope, type));
                    DropTable(String.Format("frozen_{0}_{1}_recapitulations", scope, type));

                    Sql(File.ReadAllText(MapPath(String.Format("~/SQLs/{1}/{0}_{1}_sums.sql", scope, type))));
                    Sql(File.ReadAllText(MapPath(String.Format("~/SQLs/{1}/{0}_{1}_recapitulations.sql", scope, type))));
                    Sql(File.ReadAllText(MapPath(String.Format("~/SQLs/{1}/frozen_{0}_{1}_recapitulations.sql", scope, type))));
                    Sql(File.ReadAllText(MapPath(String.Format("~/SQLs/transfer/region_{0}s.sql", type))));
                }
            }

            DropTable(String.Format("transfer_recapitulations"));
            DropTable(String.Format("frozen_transfer_recapitulations"));
            DropTable(String.Format("frozen_transfers"));

            Sql(File.ReadAllText(MapPath(String.Format("~/SQLs/transfer/region_allocations.sql"))));
            Sql(File.ReadAllText(MapPath(String.Format("~/SQLs/transfer/region_transfers.sql"))));
            Sql(File.ReadAllText(MapPath(String.Format("~/SQLs/transfer/frozen_transfers.sql"))));
            Sql(File.ReadAllText(MapPath(String.Format("~/SQLs/transfer/transfer_recapitulations.sql"))));
            Sql(File.ReadAllText(MapPath(String.Format("~/SQLs/transfer/frozen_transfer_recapitulations.sql"))));

        }
        
        public override void Down()
        {
        }

        private string MapPath(string seedFile)
        {
            if (HttpContext.Current != null)
                return HostingEnvironment.MapPath(seedFile);

            var absolutePath = new Uri(AppDomain.CurrentDomain.BaseDirectory).LocalPath;
            var directoryName = Path.GetDirectoryName(absolutePath);
            var path = Path.Combine(directoryName, ".." + seedFile.TrimStart('~').Replace('/', '\\'));

            return path;
        }
    }
}
