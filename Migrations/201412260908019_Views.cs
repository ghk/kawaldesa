namespace App.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    using System.IO;
    using System.Reflection;
    using System.Web;
    using System.Web.Hosting;

    public partial class Views : DbMigration
    {
        public override void Up()
        {
            DropTable("dbo.AccountRecapitulations");
            DropTable("dbo.FrozenAccountRecapitulations");
            DropTable("dbo.FrozenTransactions");
            DropTable("dbo.TransferRecapitulations");
            DropTable("dbo.FrozenTransferRecapitulations");
            Sql(File.ReadAllText(MapPath("~/SQLs/RegionParents.sql")));
            Sql(File.ReadAllText(MapPath("~/SQLs/RegionDesaCounts.sql")));
            Sql(File.ReadAllText(MapPath("~/SQLs/RegionADDs.sql")));
            Sql(File.ReadAllText(MapPath("~/SQLs/FrozenTransactions.sql")));
            Sql(File.ReadAllText(MapPath("~/SQLs/TransferRecapitulations.sql")));
            Sql(File.ReadAllText(MapPath("~/SQLs/FrozenTransferRecapitulations.sql")));
            Sql(File.ReadAllText(MapPath("~/SQLs/AccountRecapitulations.sql")));
            Sql(File.ReadAllText(MapPath("~/SQLs/FrozenAccountRecapitulations.sql")));
        }

        public override void Down()
        {
        }

        private string MapPath(string seedFile)
        {
            if (HttpContext.Current != null)
                return HostingEnvironment.MapPath(seedFile);

            var absolutePath = new Uri(Assembly.GetExecutingAssembly().CodeBase).AbsolutePath;
            var directoryName = Path.GetDirectoryName(absolutePath);
            var path = Path.Combine(directoryName, ".." + seedFile.TrimStart('~').Replace('/', '\\'));

            return path;
        }
    }
}
