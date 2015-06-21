import re, os
import pickle
from openpyxl import Workbook, load_workbook

regions = []

class Region:
    ID = "",
    Name = "",
    IsKelurahan = "",
    Website = "",
    URLKey = "",
    fkParentID = "",
    Type = 0

def clean_code(code):
    if code is None:
        return None
    code = str(code)
    code = re.sub( '\s+', ' ', code ).strip()
    if len(code) == 0:
        return None
    return code

def clean_name(name):
    if name is None:
        return None
    name = str(name)
    name = re.sub( '\s+', ' ', name ).strip()
    if len(name) == 0:
        return None
    name = re.sub('^\d+\s*\.\s+', '', name).strip()
    if len(name) == 0:
        return None
    name = re.sub('^\d+\s*', '', name).strip()
    if len(name) == 0:
        return None
    name = re.sub('^\d+\s*(KAB)\s*\.\s+', '', name).strip()
    if len(name) == 0:
        return None
    return name

def get_region_type(code):
    return code.count(".")

def add_region(code, name, parent_code, is_kelurahan = False):
    region = Region()
    region.ID = code
    region.Name = name
    region.Type = get_region_type(code)
    region.IsKelurahan = is_kelurahan
    region.fkParentID = parent_code
    regions.append(region)
    print "adding %s %d" % (name, region.Type)
    return region

def parse_xls(xls, cur_prov_code):
    print "opening %s %s" % (xls, cur_prov_code)
    wb = load_workbook(xls)
    ws = wb.active

    cur_kab = None
    cur_kec = None

    columns = {
            'code': -1,
            'kab': -1,
            'kec': -1,
            'lurah': -1,
            'desa': -1,
    };

    def header_lower_tester(content):
        def test(s):
            if s is None:
                return False
            s = str(s)
            s = re.sub('\s+', '', s).strip()
            return s.lower() == content
        return test

    def kab_tester(s):
        if s is None:
            return False
        s = str(s)
        s = re.sub('\s+', '', s).strip().lower()
        return "provinsi" in s and "kabupaten" in s


    headers = {
            'code': header_lower_tester('kode'),
            'kab': kab_tester,
            'kec': header_lower_tester('kecamatan'),
            'lurah': header_lower_tester("kelurahan"),
            'desa': header_lower_tester("desa"),
    }

    is_header_filled = False
    for row in ws.rows:
        is_header = False
        i = 0
        for cell in row:
            for col, tester in headers.iteritems():
                if tester(cell.value):
                    columns[col]=i
                    is_header = True
                    print "column: %s is in %i, %s, %s" % (col, i, cell.value, cell.column)
            i = i + 1

        is_header_filled = True
        for col, idx in columns.iteritems():
            if idx == -1:
                print '--------------%s' % col
                is_header_filled = False

        if not is_header and is_header_filled:
            code = clean_code(row[columns["code"]].value)
            if code is not None:
                typ = get_region_type(code)
                if typ == 1:
                    kab_name = clean_name(row[columns["kab"]].value)
                    if kab_name is not None:
                        cur_kab = add_region(code, kab_name, cur_prov_code)
                if typ == 2:
                    kec_name = clean_name(row[columns["kec"]].value)
                    if kec_name is not None:
                        cur_kec = add_region(code, kec_name, cur_kab.ID)
                if typ == 3:
                    lurah_name = clean_name(row[columns["lurah"]].value)
                    desa_name = clean_name(row[columns["desa"]].value)
                    if lurah_name is not None:
                        add_region(code, lurah_name, cur_kec.ID, True)
                    elif desa_name is not None:
                        add_region(code, desa_name, cur_kec.ID, False)

if __name__ == "__main__":
    for f in os.listdir('data'):
        parse_xls('data/%s' % f, f[0:2])
        print len(regions)

    print len(regions)
    with open("regions.pickle", "wb") as f:
        pickle.dump(regions, f)

    for region in regions:
        print '%s %s %d %s' % (region.ID, region.Name, region.Type, region.fkParentID)
