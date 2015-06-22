@echo off

python tosql.py > regions.sql
cat parent-regions.sql > combined-regions.sql
cat regions.sql >> combined-regions.sql
psql -U postgres kawaldesa < combined-regions.sql 1> out.log 2> err.log
