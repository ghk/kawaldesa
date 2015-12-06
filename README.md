# Kawal Desa
Source code untuk http://kawaldesa.org, aplikasi transparansi penyaluran dan realisasi dana desa. 

[![Build Status](http://gitlab.microvac.co.id/ci/projects/4/status.png?ref=master)](http://gitlab.microvac.co.id/ci/projects/4?ref=master)

Kontribusi diterima dengan terbuka. Saran/bug/diskusi bisa di https://github.com/ghk/kawaldesa/issues 

Hak Cipta Kontributor & Relawan kawaldesa.org, source code berlisensi AGPL

## Code Overview

Currently built with C# WebAPI, Typescript and angularjs:

- `Content`: mostly stylesheets
- `Controllers`: WebAPI and MVC Controllers
- `Migrations`: DB seed and migrations code
- `Models`: EF Code First Models
- `Scripts/KawalDesa`: Here lies the angular code
- `SQLs`: SQL Views and Seeds


## Requirements:

- Visual Studio 2015 (Download the community edition, it's free for this kind of project)
- PostgreSQL > 9.3 (Requires materialized views)
- WebEssentials for Visual Studio (not mandatory, but it leads to nicer typescript development)
- Microvac's ASP Scaffold's at http://www.github.com/microvac/asp-scaffold

## Installation:

1. Create a symlink from asp-scaffold's Scaffold folder to Scaffold directory; right under this root directory (for example in windows `mklink /j Scaffold ..\asp-scaffold\Scaffold`)
2. Create a new postgresql database, copy the connectionStrings.config.example to connectionStrings.config, change the database settings on it.
3. Copy appSettings.config.example to appSettings.config.
4. Open the project in Visual Studio; Build and let it download the nuget dependencies.
5. Open nuget package manager, run `update-database`
6. You can run it now; but to have all regions, you need to load SQLs\Seeds\combined.sql, e.g. `psql -U postgres kawaldesa < SQLs\Seeds\combined.sql`
7. Run App projects! You can login with username: 'admin' or 'volunteer' and password: '123456'

## Current Contributors

- Gozali Kumara (ghk@microvac.co.id)
- Achmad Rifai (rifai@microvac.co.id)
- Vidyapati (vidyapati@microvac.co.id)
- Anton Maulana (anton@microvac.co.id)
- Muhammad Reza (m.reza@microvac.co.id)