:loop
"C:\Program Files\PostgreSQL\9.4\bin\psql.exe" -U postgres kawaldesa < refresh-mv.psql
ping localhost -n 61 > nul
goto loop