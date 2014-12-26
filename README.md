# Kawal Desa
Source code untuk kawaldesa.org, aplikasi transparansi penyaluran dan realisasi dana desa. 
Kontribusi diterima dengan terbuka. 

Saran/bug/diskusi bisa di https://github.com/ghk/kawaldesa/issues 

Hak Cipta Kontributor & Relawan kawaldesa.org, source code berlisensi AGPL

## Code Overview

Currently build with C# WebAPI, Typescript and angularjs:

- `Content`: mostly stylesheets
- `Controllers`: WebAPI and MVC Controllers
- `Migrations`: DB seed and migrations code
- `Models`: EF Code First Models
- `Scripts/KawalDesa`: Here lies the angular code
- `SQLs`: SQL Views and Seeds

## Installation

Requirements:

- Visual Studio 2013 (Download the community edition, it's free for this kind of project)
- PostgreSQL > 9.3 (Requires materialized views)
- WebEssentials for Visual Studio (not mandatory, but it leads to nicer typescript development)
- Microvac's ASP Scaffold's at http://www.github.com/microvac/asp-scaffold

Installation:

- symlink asp-scaffold's Scaffold folder to Scaffold directory right under this root directory (for excample in windows `mklink /j Scaffold ..\asp-scaffold\Scaffold`)
- Create a new postgres database, copy the connectionStrings.config.example to connectionStrings.config, change the database connections config on it
- Copy appSettings.config.example to appSettings.config
- Open the project in VS, build it so it will download the nuget dependencies
- Open nuget package manager, run `update-database`
- You can run it now, but to load the region load the SQLs\Seeds\combined.sql, e.g. `psql -U postgres kawaldesa < SQLs\Seeds\combined.sql`
- Run App projects! You can login with username: 'admin' or 'volunteer' and password: '123456'

## Current Contributors

Gozali Kumara (ghk@microvac.co.id)
Vidyapati (vidyapati@microvac.co.id)
Muhammad Reza (m.reza@microvac.co.id)