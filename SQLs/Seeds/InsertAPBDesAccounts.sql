insert into dbo."APBDes" ("IsActivated", "DateCreated", "DateModified", "fkAPBNID", "fkRegionID")
select true, '2014-12-25 22:36:39.755962', '2014-12-25 22:36:39.755962', 1, desa."ID" from
	dbo."Regions" desa where desa."Type" = 4;
	
insert into dbo."Accounts" ("IsActivated", "Code", "Name", "Type", "DateCreated", "DateModified", "fkParentAccountID", "fkAPBDesID")
select true, 'A', 'Pendapatan', 1, '2014-12-25 22:36:39.755962', '2014-12-25 22:36:39.755962', NULL, apbdes."ID" from
	dbo."APBDes" apbdes;
	
insert into dbo."Accounts" ("IsActivated", "Code", "Name", "Type", "DateCreated", "DateModified", "fkParentAccountID", "fkAPBDesID")
select true, 'B', 'Belanja', 2, '2014-12-25 22:36:39.755962', '2014-12-25 22:36:39.755962', NULL, apbdes."ID" from
	dbo."APBDes" apbdes;
	
insert into dbo."Accounts" ("IsActivated", "Code", "Name", "Type", "DateCreated", "DateModified", "fkParentAccountID", "fkAPBDesID")
select true, '1', 'Pendapatan Asli Desa (PAD)', 1, '2014-12-25 22:36:39.755962', '2014-12-25 22:36:39.755962', acc."ID", apbdes."ID" 
from dbo."Accounts" acc
inner join dbo."APBDes" apbdes on acc."fkAPBDesID" = apbdes."ID"
where acc."Code" = 'A';

insert into dbo."Accounts" ("IsActivated", "Code", "Name", "Type", "DateCreated", "DateModified", "fkParentAccountID", "fkAPBDesID")
select true, '2', 'Bantuan Pemerintah Kabupaten', 1, '2014-12-25 22:36:39.755962', '2014-12-25 22:36:39.755962', acc."ID", apbdes."ID" 
from dbo."Accounts" acc
inner join dbo."APBDes" apbdes on acc."fkAPBDesID" = apbdes."ID"
where acc."Code" = 'A';

insert into dbo."Accounts" ("IsActivated", "Code", "Name", "Type", "DateCreated", "DateModified", "fkParentAccountID", "fkAPBDesID")
select true, '3', 'Bantuan Pemerintah Pusat', 1, '2014-12-25 22:36:39.755962', '2014-12-25 22:36:39.755962', acc."ID", apbdes."ID" 
from dbo."Accounts" acc
inner join dbo."APBDes" apbdes on acc."fkAPBDesID" = apbdes."ID"
where acc."Code" = 'A';

insert into dbo."Accounts" ("IsActivated", "Code", "Name", "Type", "DateCreated", "DateModified", "fkParentAccountID", "fkAPBDesID", "TargetSource")
select true, '2.1', 'Alokasi Dana Desa (ADD)', 1, '2014-12-25 22:36:39.755962', '2014-12-25 22:36:39.755962', acc."ID", apbdes."ID", 'add' 
from dbo."Accounts" acc
inner join dbo."APBDes" apbdes on acc."fkAPBDesID" = apbdes."ID"
where acc."Code" = '2' and acc."Type" = 1;

insert into dbo."Accounts" ("IsActivated", "Code", "Name", "Type", "DateCreated", "DateModified", "fkParentAccountID", "fkAPBDesID", "TargetSource")
select true, '3.1', 'Dana Desa dari APBN', 1, '2014-12-25 22:36:39.755962', '2014-12-25 22:36:39.755962', acc."ID", apbdes."ID", 'apbn'
from dbo."Accounts" acc
inner join dbo."APBDes" apbdes on acc."fkAPBDesID" = apbdes."ID"
where acc."Code" = '3' and acc."Type" = 1;

update dbo."Accounts" set "Target" = ( 
	select add."ADD" from dbo."APBDes" apbdes
	inner join dbo."RegionADDs" add on apbdes."fkRegionID" = add."ID" and apbdes."fkAPBNID" = add."APBNID"
	where apbdes."ID" = "fkAPBDesID"
) where "TargetSource" = 'add';

update dbo."Accounts" set "Target" = ( 
	select apbn."DanaPerDesa" from dbo."APBDes" apbdes
	inner join dbo."APBNs" apbn on apbdes."fkAPBNID" = apbn."ID"
	where apbdes."ID" = "fkAPBDesID"
) where "TargetSource" = 'apbn';






