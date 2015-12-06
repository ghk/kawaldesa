using App.Models;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace App.Utils.Spreadsheets
{
    public class AllocationSpreadsheetReader<TAllocation>
        where TAllocation : IAllocation, new()
    {
        public IList<TAllocation> Read(List<Region> regions, FileInfo file)
        {
            List<TAllocation> results = new List<TAllocation>();
            using (var package = new ExcelPackage(file))
            {
                var worksheet = package.Workbook.Worksheets.FirstOrDefault(ws => ws.Name == "Sheet 1");
                if (worksheet == null)
                    throw new ExcelReadException("Tidak ada worksheet 'Sheet 1'");
                int colStart = -1;
                int rowStart = -1;
                for (int j = worksheet.Dimension.Start.Row; j < worksheet.Dimension.End.Row; j++)
                {
                    for (int i = worksheet.Dimension.Start.Column; i < worksheet.Dimension.End.Column; i++)
                    {
                        if (worksheet.Cells[j, i].Value != null)
                        {
                            colStart = i;
                            rowStart = j;
                            break;
                        }
                    }
                    if (colStart != -1)
                    {
                        break;
                    }
                }
                if (colStart == -1)
                    throw new ExcelReadException("Tidak ada data pada worksheet 'Sheet 1'");

                var headers = new SpreadsheetHeaders(typeof(TAllocation));
                int row = rowStart + headers.Root.RowSpan;

                for (int j = row; j < worksheet.Dimension.End.Row; j++)
                {
                    var no = worksheet.Cells[j, colStart].Value;
                    if (no == null)
                        continue;
                    if (!(no is string))
                        no = no.ToString();
                    var strNo = (no as string).Trim();
                    if (strNo.Count() == 0)
                        continue;
                    var region = regions.FirstOrDefault(r => r.Id == strNo);
                    if (region == null)
                        continue;
                    var allocation = new TAllocation();
                    allocation.fkRegionId = region.Id;
                    allocation.No = strNo;
                    allocation.RegionName = worksheet.Cells[j, colStart + 1].Value as string;
                    int colOffset = 2;
                    foreach(var leaf in headers.Root.Leafs)
                    {
                        if (leaf.Property.Name != "RegionName" && leaf.Property.Name != "No")
                        {
                            var value = worksheet.Cells[j, colStart + colOffset].Value;
                            if(value != null)
                            {
                                if(leaf.Property.PropertyType == typeof(decimal?) || leaf.Property.PropertyType == typeof(decimal))
                                {
                                    var val = Convert.ToDecimal(value);
                                    leaf.Property.SetValue(allocation, val);
                                }
                                else if(leaf.Property.PropertyType == typeof(int?) || leaf.Property.PropertyType == typeof(int))
                                {
                                    var val = Convert.ToInt32(value);
                                    leaf.Property.SetValue(allocation, val);
                                }
                            }
                            colOffset += 1;
                        }
                    }
                    results.Add(allocation);
                }
            }
            return results;
        }

        public IList<TAllocation> Read(List<Region> regions, byte[] fileBytes)
        {
            Stream stream = new MemoryStream(fileBytes);
            List<TAllocation> results = new List<TAllocation>();
           
            using (var package = new ExcelPackage(stream))
            {
                var worksheet = package.Workbook.Worksheets.FirstOrDefault(ws => ws.Name == "Sheet 1");
                if (worksheet == null)
                    throw new ExcelReadException("Tidak ada worksheet 'Sheet 1'");
                int colStart = -1;
                int rowStart = -1;
                for (int j = worksheet.Dimension.Start.Row; j < worksheet.Dimension.End.Row; j++)
                {
                    for (int i = worksheet.Dimension.Start.Column; i < worksheet.Dimension.End.Column; i++)
                    {
                        if (worksheet.Cells[j, i].Value != null)
                        {
                            colStart = i;
                            rowStart = j;
                            break;
                        }
                    }
                    if (colStart != -1)
                    {
                        break;
                    }
                }
                if (colStart == -1)
                    throw new ExcelReadException("Tidak ada data pada worksheet 'Sheet 1'");

                var headers = new SpreadsheetHeaders(typeof(TAllocation));
                int row = rowStart + headers.Root.RowSpan;

                for (int j = row; j < worksheet.Dimension.End.Row; j++)
                {
                    var no = worksheet.Cells[j, colStart].Value;
                    if (no == null)
                        continue;
                    if (!(no is string))
                        no = no.ToString();
                    var strNo = (no as string).Trim();
                    if (strNo.Count() == 0)
                        continue;
                    var region = regions.FirstOrDefault(r => r.Id == strNo);
                    if (region == null)
                        continue;
                    var allocation = new TAllocation();
                    allocation.fkRegionId = region.Id;
                    allocation.No = strNo;
                    allocation.RegionName = worksheet.Cells[j, colStart + 1].Value as string;
                    int colOffset = 2;
                    foreach (var leaf in headers.Root.Leafs)
                    {
                        if (leaf.Property.Name != "RegionName" && leaf.Property.Name != "No")
                        {
                            var value = worksheet.Cells[j, colStart + colOffset].Value;
                            if (value != null)
                            {
                                if (leaf.Property.PropertyType == typeof(decimal?) || leaf.Property.PropertyType == typeof(decimal))
                                {
                                    var val = Convert.ToDecimal(value);
                                    leaf.Property.SetValue(allocation, val);
                                }
                                else if (leaf.Property.PropertyType == typeof(int?) || leaf.Property.PropertyType == typeof(int))
                                {
                                    var val = Convert.ToInt32(value);
                                    leaf.Property.SetValue(allocation, val);
                                }
                            }
                            colOffset += 1;
                        }
                    }
                    results.Add(allocation);
                }
            }
            return results;
        }
    }

    public class ExcelReadException : Exception
    {
        public ExcelReadException(string message)
            : base(message)
        {
        }
    }
}

