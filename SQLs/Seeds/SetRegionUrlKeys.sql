update dbo."Regions" r
set "UrlKey" = lower(replace(replace(replace(replace(replace(replace(replace(r."Name", ' ', ''), '"', ''), '-', ''), ')', ''), '(', ''), E'\'', ''), '.', ''))
where r."Type" = 4 and r."UrlKey" is null and r."ID" not in
(select distinct a."ID"
from dbo."Regions" a
inner join dbo."Regions" b on b."Type" = 4 
and lower(replace(replace(replace(replace(replace(replace(replace(a."Name", ' ', ''), '"', ''), '-', ''), ')', ''), '(', ''), E'\'', ''), '.', ''))
= lower(replace(replace(replace(replace(replace(replace(replace(b."Name", ' ', ''), '"', ''), '-', ''), ')', ''), '(', ''), E'\'', ''), '.', ''))
and a."ID" != b."ID"
where a."Type" = 4);

update dbo."Regions" r
set "UrlKey" = 
(
select 
lower(replace(replace(replace(replace(replace(replace(replace(rc."Name", ' ', ''), '"', ''), '-', ''), ')', ''), '(', ''), E'\'', ''), '.', ''))
||'.'
||lower(replace(replace(replace(replace(replace(replace(replace(rpp."Name", ' ', ''), '"', ''), '-', ''), ')', ''), '(', ''), E'\'', ''), '.', ''))
from dbo."Regions" rc
inner join dbo."Regions" rp on rp."ID" = rc."fkParentID" 
inner join dbo."Regions" rpp on rpp."ID" = rp."fkParentID" 
 where rc."ID" = r."ID" 
)
where r."Type" = 4 and r."UrlKey" is null and r."ID" not in
(select distinct a."ID"
from dbo."Regions" a
inner join dbo."Regions" ap on a."fkParentID" = ap."ID"
inner join dbo."Regions" app on ap."fkParentID" = app."ID"
inner join dbo."Regions" b on b."Type" = 4 
inner join dbo."Regions" bp on b."fkParentID" = bp."ID"
inner join dbo."Regions" bpp on bp."fkParentID" = bpp."ID"
and lower(replace(replace(replace(replace(replace(replace(replace(a."Name", ' ', ''), '"', ''), '-', ''), ')', ''), '(', ''), E'\'', ''), '.', ''))
|| lower(replace(replace(replace(replace(replace(replace(replace(app."Name", ' ', ''), '"', ''), '-', ''), ')', ''), '(', ''), E'\'', ''), '.', ''))
= lower(replace(replace(replace(replace(replace(replace(replace(b."Name", ' ', ''), '"', ''), '-', ''), ')', ''), '(', ''), E'\'', ''), '.', ''))
|| lower(replace(replace(replace(replace(replace(replace(replace(bpp."Name", ' ', ''), '"', ''), '-', ''), ')', ''), '(', ''), E'\'', ''), '.', ''))
and a."ID" != b."ID"
where a."Type" = 4 and a."UrlKey" is null);
