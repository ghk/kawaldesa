using MySql.Data.MySqlClient;
using Npgsql;
using System;

namespace SidekaImporter
{
    class Program
    {

        static void Main()
        {
            Import import = new Import();
            import.DoImport();


        }

    }

    public class Import
    {

        private static string CONNECTION_STRING = "Server=localhost;Port=3306;Database=sideka;Uid=root; Password=;";
        private static string NPG_CONNECTION_STRING = "User ID=postgres;Password=admin;Host=localhost;Port=5432;Database=kawaldesa;";

        private MySqlConnection connection = null;
        private NpgsqlConnection kawalDesaConnection = null;

        private void OpenConnection()
        {
            connection = new MySqlConnection();
            kawalDesaConnection = new NpgsqlConnection();

            connection.ConnectionString = CONNECTION_STRING;
            kawalDesaConnection.ConnectionString = NPG_CONNECTION_STRING;

            connection.Open();
            kawalDesaConnection.Open();
        }

        private void CloseConnection()
        {
            connection.Close();
            kawalDesaConnection.Close();
        }

        public void DoImport()
        {
            OpenConnection();
            ImportAPBDes();
            OpenConnection();
            ImportParentAccount();
            OpenConnection();
            ImportAccount();
            OpenConnection();
            ImportRealization();
        }

        private void ImportAPBDes()
        {
            var query = "SELECT * FROM tbl_apbdes";
            var command = new MySqlCommand(query, connection);
            var dataReader = command.ExecuteReader();

            var apbdesInsertQuery = "INSERT INTO apbdes(name, year, date_created, date_modified) SELECT @name, @year, @dateCreated, @dateModified WHERE NOT EXISTS (SELECT name, year FROM apbdes WHERE name = @name AND year = @year);";

            while (dataReader.Read())
            {
                var kawalDesaCommand = new NpgsqlCommand(apbdesInsertQuery, kawalDesaConnection);

                string name = dataReader["nama"].ToString();
                int year = int.Parse(dataReader["tahun"].ToString());

                Console.WriteLine("Nama: " + name + " Year: " + year);

                kawalDesaCommand.Parameters.AddWithValue("@name", name);
                kawalDesaCommand.Parameters.AddWithValue("@year", year);
                kawalDesaCommand.Parameters.AddWithValue("@dateCreated", new DateTime());
                kawalDesaCommand.Parameters.AddWithValue("@dateModified", new DateTime());
                kawalDesaCommand.ExecuteNonQuery();
            }

            CloseConnection();
        }

        private void ImportParentAccount()
        {
            var query = "SELECT * FROM tbl_anggaran WHERE id_parent = 0";
            var command = new MySqlCommand(query, connection);
            var dataReader = command.ExecuteReader();

            var accountInsertQuery = "INSERT INTO accounts(id, code, name, type, fk_apbdes_id, amount, notes, date_modified, date_created) SELECT @id, @code, @name, @type, @fkapbdesid, @amount, @notes, @dateModified, @dateCreated WHERE NOT EXISTS (SELECT code FROM accounts WHERE code = @code);";
            while (dataReader.Read())
            {
                var kawalDesaCommand = new NpgsqlCommand(accountInsertQuery, kawalDesaConnection);

                string code = (string)dataReader["nomor"];
                string name = (string)dataReader["nama"];
                int type = ((bool)dataReader["tipe_apbdes"]) ? 1 : 0;

                int id = int.Parse(dataReader["id_anggaran"].ToString());
                int fkapbdesid = int.Parse(dataReader["id_apbdes"].ToString());
                decimal amount = decimal.Parse(dataReader["jumlah"].ToString());
                string notes = (string)dataReader["keterangan"];
                int fkparentid = int.Parse(dataReader["id_parent"].ToString());

                kawalDesaCommand.Parameters.AddWithValue("@id", id);
                kawalDesaCommand.Parameters.AddWithValue("@code", code);
                kawalDesaCommand.Parameters.AddWithValue("@name", name);
                kawalDesaCommand.Parameters.AddWithValue("@type", type);
                kawalDesaCommand.Parameters.AddWithValue("@fkapbdesid", fkapbdesid);
                kawalDesaCommand.Parameters.AddWithValue("@amount", amount);
                kawalDesaCommand.Parameters.AddWithValue("@notes", notes);
                kawalDesaCommand.Parameters.AddWithValue("@dateModified", new DateTime());
                kawalDesaCommand.Parameters.AddWithValue("@dateCreated", new DateTime());
                kawalDesaCommand.ExecuteNonQuery();
            }

            CloseConnection();
        }

        //test git yang kedua
        private void ImportAccount()
        {
            var query = "SELECT * FROM tbl_anggaran WHERE id_parent > 0";
            var command = new MySqlCommand(query, connection);
            var dataReader = command.ExecuteReader();

            var accountInsertQuery = "INSERT INTO accounts(id, code, name, type, fk_apbdes_id, amount, notes, fk_parent_account_id, date_modified, date_created) SELECT @id, @code, @name, @type, @fkapbdesid, @amount, @notes, @fkparentid, @dateModified, @dateCreated WHERE NOT EXISTS (SELECT code FROM accounts WHERE code = @code);";
            while (dataReader.Read())
            {
                var kawalDesaCommand = new NpgsqlCommand(accountInsertQuery, kawalDesaConnection);

                string code = (string)dataReader["nomor"];
                string name = (string)dataReader["nama"];
                int type = ((bool)dataReader["tipe_apbdes"]) ? 1 : 0;
                int id = int.Parse(dataReader["id_anggaran"].ToString());
                int fkapbdesid = int.Parse(dataReader["id_apbdes"].ToString());
                decimal amount = decimal.Parse(dataReader["jumlah"].ToString());
                string notes = (string)dataReader["keterangan"];
                int fkparentid = int.Parse(dataReader["id_parent"].ToString());

                //Console.WriteLine("id: "+id+" code: "+ code + " name: " + name + " type: " +type+ " fkapbdesid: " +fkapbdesid+ " amount: " +amount+ " notes: "+ notes+ " fkparentid: "+fkparentid);
                kawalDesaCommand.Parameters.AddWithValue("@id", id);
                kawalDesaCommand.Parameters.AddWithValue("@code", code);
                kawalDesaCommand.Parameters.AddWithValue("@name", name);
                kawalDesaCommand.Parameters.AddWithValue("@type", type);
                kawalDesaCommand.Parameters.AddWithValue("@fkapbdesid", fkapbdesid);
                kawalDesaCommand.Parameters.AddWithValue("@amount", amount);
                kawalDesaCommand.Parameters.AddWithValue("@notes", notes);
                kawalDesaCommand.Parameters.AddWithValue("@fkparentid", fkparentid);
                kawalDesaCommand.Parameters.AddWithValue("@dateModified", new DateTime());
                kawalDesaCommand.Parameters.AddWithValue("@dateCreated", new DateTime());
                kawalDesaCommand.ExecuteNonQuery();
            }
            CloseConnection();
        }

        private void ImportRealization()
        {
            var query = "SELECT * FROM tbl_realisasi";
            var command = new MySqlCommand(query, connection);
            var dataReader = command.ExecuteReader();


            var accountInsertQuery = "INSERT INTO realizations( fk_account_id, date, amount, date_created, date_modified) SELECT @fkaccountid, @date, @amount, @dateCreated, @dateModified WHERE NOT EXISTS (SELECT fk_account_id, date, amount FROM realizations WHERE fk_account_id = @fkaccountid AND date = @date AND amount = @amount);";

            while (dataReader.Read())
            {
                var kawalDesaCommand = new NpgsqlCommand(accountInsertQuery, kawalDesaConnection);

                //int id = int.Parse(dataReader["id_realisasi"].ToString());
                int fkaccountid = int.Parse(dataReader["id_anggaran"].ToString());
                DateTime date = DateTime.Parse(dataReader["tanggal"].ToString());
                decimal amount = decimal.Parse(dataReader["jumlah"].ToString());

               // kawalDesaCommand.Parameters.AddWithValue("@id", id);
                kawalDesaCommand.Parameters.AddWithValue("@fkaccountid", fkaccountid);
                kawalDesaCommand.Parameters.AddWithValue("@date", date);
                kawalDesaCommand.Parameters.AddWithValue("@amount", amount);
                kawalDesaCommand.Parameters.AddWithValue("@dateModified", new DateTime());
                kawalDesaCommand.Parameters.AddWithValue("@dateCreated", new DateTime());
                kawalDesaCommand.ExecuteNonQuery();
            }
            CloseConnection();
        }
    }
}