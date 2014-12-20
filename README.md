# Kawal Desa
Currently build with C# WebAPI, Typescript and angularjs, come contribute!

## Installation

Requirements:

- Visual Studio 2013
- PostgreSQL > 9.3
- WebEssentials (for nicer typescript)
- Our ASP Scaffold's at http://www.github.com/microvac/asp-scaffold

Installation:

- symlink asp-scaffold's Scaffold folder to Scaffold directory right under this root directory (for excample in windows `mklink /j Scaffold ..\asp-scaffold\Scaffold`)
- Open the project in VS, build so it download the nuget dependencies
- Create a new postgres database, copy the connectionStrings.config.example to connectionStrings.config, change the database connections config on it
- Open nuget package manager, run `update-database`
- Delete Recapitulations table on the database, load the regions.sql, then all the materialized views on it
- Run!

## Roles

- **admin**: Set APBN (APBN), Upload APBD (Unggah DAU & DBH Daerah), User Management (Daftar Pengguna)
- **pusat**: Upload APBN Transactions (Unggah Penyaluran Dana Desa Dari APBN)
- **daerah**: Upload ADD Transactions (Unggah Penyaluran Dana Desa Dari ADD)
- **desa**: Input Transaction (Input Penyaluran Dana Desa)