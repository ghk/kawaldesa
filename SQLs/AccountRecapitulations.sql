CREATE OR REPLACE VIEW dbo."AccountRecapitulations" AS
SELECT
	apbn."ID" * 100000 + r."ID" as "ID",
	r."ID" as "RegionID",
	apbn."ID" as "APBNID",
	apbn."Year" as "APBNYear",
	r."fkParentID" as "ParentRegionID",
	r."Name" as "RegionName",
	COALESCE((
		select sum(a."Target") 
		from dbo."Accounts" a
		inner join dbo."APBDes" apbdes on a."fkAPBDesID" = apbdes."ID" 
		inner join dbo."RegionParents" desa on apbdes."fkRegionID" = desa."ID"
		where a."Type" = 1  AND a."IsActivated" AND apbdes."fkAPBNID" = apbn."ID" AND (
			(r."Type" = 0 AND desa."ParentParentParentParentID" = r."ID") 
			OR (r."Type" = 1 AND desa."ParentParentParentID" = r."ID") 
			OR (r."Type" = 2 AND desa."ParentParentID" = r."ID") 
			OR (r."Type" = 3 AND desa."ParentID" = r."ID")
			OR (r."Type" = 4 AND desa."ID" = r."ID")
		)
	), 0) as "BudgetedIncome",
	COALESCE((
		select sum(t."Amount")
		from dbo."Transactions" t 
		inner join dbo."Accounts" a on t."fkAccountID" = a."ID"
		inner join dbo."APBDes" apbdes on a."fkAPBDesID" = apbdes."ID" 
		inner join dbo."RegionParents" desa on apbdes."fkRegionID" = desa."ID"
		where a."Type" = 1  AND a."IsActivated" AND apbdes."fkAPBNID" = apbn."ID" AND (
			(r."Type" = 0 AND desa."ParentParentParentParentID" = r."ID") 
			OR (r."Type" = 1 AND desa."ParentParentParentID" = r."ID") 
			OR (r."Type" = 2 AND desa."ParentParentID" = r."ID") 
			OR (r."Type" = 3 AND desa."ParentID" = r."ID")
			OR (r."Type" = 4 AND desa."ID" = r."ID")
		)
	), 0) as "RealizedIncome",
	COALESCE((
		select sum(a."Target") 
		from dbo."Accounts" a
		inner join dbo."APBDes" apbdes on a."fkAPBDesID" = apbdes."ID" 
		inner join dbo."RegionParents" desa on apbdes."fkRegionID" = desa."ID"
		where a."Type" = 2  AND a."IsActivated" AND apbdes."fkAPBNID" = apbn."ID"  AND (
			(r."Type" = 0 AND desa."ParentParentParentParentID" = r."ID") 
			OR (r."Type" = 1 AND desa."ParentParentParentID" = r."ID") 
			OR (r."Type" = 2 AND desa."ParentParentID" = r."ID") 
			OR (r."Type" = 3 AND desa."ParentID" = r."ID")
			OR (r."Type" = 4 AND desa."ID" = r."ID")
		)
	), 0) as "BudgetedExpense",
	COALESCE((
		select sum(t."Amount")
		from dbo."Transactions" t 
		inner join dbo."Accounts" a on t."fkAccountID" = a."ID"
		inner join dbo."APBDes" apbdes on a."fkAPBDesID" = apbdes."ID" 
		inner join dbo."RegionParents" desa on apbdes."fkRegionID" = desa."ID"
		where a."Type" = 2  AND a."IsActivated" AND apbdes."fkAPBNID" = apbn."ID"  AND (
			(r."Type" = 0 AND desa."ParentParentParentParentID" = r."ID") 
			OR (r."Type" = 1 AND desa."ParentParentParentID" = r."ID") 
			OR (r."Type" = 2 AND desa."ParentParentID" = r."ID") 
			OR (r."Type" = 3 AND desa."ParentID" = r."ID")
			OR (r."Type" = 4 AND desa."ID" = r."ID")
		)
	), 0) as "RealizedExpense",
	COALESCE((
		select sum(a."Target") 
		from dbo."Accounts" a
		inner join dbo."APBDes" apbdes on a."fkAPBDesID" = apbdes."ID" 
		inner join dbo."RegionParents" desa on apbdes."fkRegionID" = desa."ID"
		where a."Type" = 2 and a."ExpenseGroup" = 0  AND a."IsActivated" AND apbdes."fkAPBNID" = apbn."ID"  AND (
			(r."Type" = 0 AND desa."ParentParentParentParentID" = r."ID") 
			OR (r."Type" = 1 AND desa."ParentParentParentID" = r."ID") 
			OR (r."Type" = 2 AND desa."ParentParentID" = r."ID") 
			OR (r."Type" = 3 AND desa."ParentID" = r."ID")
			OR (r."Type" = 4 AND desa."ID" = r."ID")
		)
	), 0) as "EmployeeExpense",
	COALESCE((
		select sum(a."Target") 
		from dbo."Accounts" a
		inner join dbo."APBDes" apbdes on a."fkAPBDesID" = apbdes."ID" 
		inner join dbo."RegionParents" desa on apbdes."fkRegionID" = desa."ID"
		where a."Type" = 2 and a."ExpenseGroup" = 1  AND a."IsActivated" AND apbdes."fkAPBNID" = apbn."ID"  AND (
			(r."Type" = 0 AND desa."ParentParentParentParentID" = r."ID") 
			OR (r."Type" = 1 AND desa."ParentParentParentID" = r."ID") 
			OR (r."Type" = 2 AND desa."ParentParentID" = r."ID") 
			OR (r."Type" = 3 AND desa."ParentID" = r."ID")
			OR (r."Type" = 4 AND desa."ID" = r."ID")
		)
	), 0) as "GoodsAndServicesExpense",
	COALESCE((
		select sum(a."Target") 
		from dbo."Accounts" a
		inner join dbo."APBDes" apbdes on a."fkAPBDesID" = apbdes."ID" 
		inner join dbo."RegionParents" desa on apbdes."fkRegionID" = desa."ID"
		where a."Type" = 2 and a."ExpenseGroup" = 2  AND a."IsActivated" AND apbdes."fkAPBNID" = apbn."ID"  AND (
			(r."Type" = 0 AND desa."ParentParentParentParentID" = r."ID") 
			OR (r."Type" = 1 AND desa."ParentParentParentID" = r."ID") 
			OR (r."Type" = 2 AND desa."ParentParentID" = r."ID") 
			OR (r."Type" = 3 AND desa."ParentID" = r."ID")
			OR (r."Type" = 4 AND desa."ID" = r."ID")
		)
	), 0) as "CapitalExpense",
	COALESCE((
		select sum(a."Target") 
		from dbo."Accounts" a
		inner join dbo."APBDes" apbdes on a."fkAPBDesID" = apbdes."ID" 
		inner join dbo."RegionParents" desa on apbdes."fkRegionID" = desa."ID"
		where a."Type" = 2 and a."ExpenseGroup" = 99  AND a."IsActivated" AND apbdes."fkAPBNID" = apbn."ID"  AND (
			(r."Type" = 0 AND desa."ParentParentParentParentID" = r."ID") 
			OR (r."Type" = 1 AND desa."ParentParentParentID" = r."ID") 
			OR (r."Type" = 2 AND desa."ParentParentID" = r."ID") 
			OR (r."Type" = 3 AND desa."ParentID" = r."ID")
			OR (r."Type" = 4 AND desa."ID" = r."ID")
		)
	), 0) as "OthersExpense",
	(select rdc."DesaCount" from dbo."RegionDesaCounts" rdc where rdc."ID" = r."ID") as "TotalVillage",
	0 as "AccountCompletedVillage"
    FROM dbo."Regions" r, dbo."APBNs" apbn;
