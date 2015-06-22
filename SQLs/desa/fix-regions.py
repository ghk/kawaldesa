from anu import Region
import pickle

regions = []
with open("regions.pickle", "rb") as f:
    regions = pickle.load(f)

for r in regions:
    r.Name = r.Name.replace("'", "\'")
    r.Name = r.Name.replace("KAB. ", "")
    r.Name = r.Name.replace("KAB ", "")
print len(regions)

with open("regions.pickle", "wb") as f:
    pickle.dump(regions, f)
