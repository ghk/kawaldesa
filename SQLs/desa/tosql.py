from anu import Region
import pickle

regions = []
with open("regions.pickle", "rb") as f:
    regions = pickle.load(f)

for r in regions:
    tup = (r.ID, r.Name.replace("'", "\\'"), r.Type+1, 'true' if r.IsKelurahan else 'false', r.fkParentID)
    print "INSERT INTO regions VALUES (E'%s',E'%s', %d, %s, NULL, NULL, '%s','2014-12-13 04:48:57','2014-12-13 10:56:16');" % tup
