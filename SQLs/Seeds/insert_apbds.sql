insert into apbds (fk_apbn_id, fk_region_id, date_created, date_modified)
select apbn.id, region.id, '2014-12-25 22:36:39.755962', '2014-12-25 22:36:39.755962' from
	apbns apbn cross join regions region where region.type = 2;
