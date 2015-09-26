using App.Models;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;

namespace App.Utils.Spreadsheets
{
    public class AllocationSpreadsheetWriter<TAllocation>
        where TAllocation: IAllocation
    {
        public HttpResponseMessage Write(List<Region> parentRegions, List<Region> regions, List<TAllocation> allocations)
        {
            byte[] output = WriteToBytes(parentRegions, regions, allocations);

            var fileAttr = (SpreadsheetFileNameAttribute) Attribute.GetCustomAttribute(typeof(TAllocation), typeof(SpreadsheetFileNameAttribute));
            String fileName = fileAttr == null ? typeof(TAllocation).Name : fileAttr.Value; 

            var result = new HttpResponseMessage(HttpStatusCode.OK) { Content = new ByteArrayContent(output) };
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            result.Headers.CacheControl = new CacheControlHeaderValue
            {
            };
            return result;
        }
        public byte[] WriteToBytes(List<Region> parentRegions, List<Region> regions, List<TAllocation> allocations)
        {
            byte[] output = null;

            int startRow = 2;
            int startCol = 2;

            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("Sheet 1");
                var headers = new SpreadsheetHeaders(typeof(TAllocation));
                int row = startRow;

                row = WriteHeader(worksheet, row, startCol, headers);
                int headerEndRow = row - 1;

                foreach(var group in regions.GroupBy(r => r.fkParentId).OrderBy(g => g.Key))
                {
                    var parentRegion = parentRegions.First(r => r.Id == group.Key);
                    WriteGroupRow(worksheet, parentRegion.Id, row, startCol, headers, parentRegion);
                    row += 1;

                    bool isAlternatingColor = false;
                    foreach (var region in group.OrderBy(r => r.Id))
                    {
                        var allocation = allocations.FirstOrDefault(a => a.fkRegionId == region.Id);
                        WriteDataRow(worksheet, isAlternatingColor, region.Id, row, startCol, headers, region, allocation);
                        row += 1;
                        isAlternatingColor = !isAlternatingColor;
                    }
                }

                int col = startCol;
                foreach(var leaf in headers.Root.Leafs)
                {
                    var attr = (SpreadsheetHeaderAttribute) Attribute.GetCustomAttribute(leaf.Property, typeof(SpreadsheetHeaderAttribute));
                    if(attr.Width.HasValue)
                        worksheet.Column(col).Width = attr.Width.Value;
                    col += 1;
                }

                var tableAddr = GetAddress(startRow, startCol) + ":" + GetAddress(row - 1, startCol + headers.Root.ColSpan - 1);
                worksheet.Cells[tableAddr].Style.Border.Top.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
                worksheet.Cells[tableAddr].Style.Border.Bottom.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
                worksheet.Cells[tableAddr].Style.Border.Left.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
                worksheet.Cells[tableAddr].Style.Border.Right.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
                worksheet.Cells[tableAddr].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thick);

                var headerAddr = GetAddress(startRow, startCol) + ":" + GetAddress(headerEndRow, startCol + headers.Root.ColSpan - 1);
                worksheet.Cells[headerAddr].Style.Font.Bold = true;
                worksheet.Cells[headerAddr].Style.Font.Color.SetColor(System.Drawing.Color.White);
                worksheet.Cells[headerAddr].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells[headerAddr].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.FromArgb(79, 129, 189));
                worksheet.Cells[headerAddr].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                worksheet.Cells[headerAddr].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
                worksheet.Cells[headerAddr].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thick);

                var stream = new MemoryStream(package.GetAsByteArray());
                output = stream.ToArray();
            }

            return output;
        }
        private void WriteGroupRow(ExcelWorksheet worksheet, String no, int row, int startCol, SpreadsheetHeaders headers, Region region)
        {
            worksheet.Cells[GetAddress(row, startCol)].Value = no;
            worksheet.Cells[GetAddress(row, startCol + 1)].Value = region.Name;
            var groupAddr = GetAddress(row, startCol) + ":" + GetAddress(row, startCol + headers.Root.ColSpan + 1);
            worksheet.Cells[groupAddr].Style.Font.Bold = true;
            worksheet.Cells[groupAddr].Style.Font.Color.SetColor(System.Drawing.Color.Red);
            if(headers.Root.ColSpan > 2)
                worksheet.Cells[GetAddress(row, startCol + 1)+":"+GetAddress(row, startCol + headers.Root.ColSpan - 1)].Merge = true;
        }

        private void WriteDataRow(ExcelWorksheet worksheet, bool isAlternatingColor, String no, int row, int startCol, SpreadsheetHeaders headers,
            Region region, TAllocation allocation)
        {
            worksheet.Cells[GetAddress(row, startCol)].Value = no;
            worksheet.Cells[GetAddress(row, startCol + 1)].Value = region.Name;
            int colOffset = 2;
            foreach(var leaf in headers.Root.Leafs)
            {
                if (leaf.Property.Name != "RegionName" && leaf.Property.Name != "No")
                {
                    var value = allocation == null ? null : leaf.Property.GetValue(allocation);
                    var addr = GetAddress(row, startCol + colOffset);
                    worksheet.Cells[addr].Value = value;
                    if (leaf.Property.PropertyType == typeof(decimal) || leaf.Property.PropertyType == typeof(double) || leaf.Property.PropertyType == typeof(int)) 
                        worksheet.Cells[addr].Style.Numberformat.Format = "#,##0";
                    colOffset++;
                }
            }
            if(isAlternatingColor)
            {
                var rowAddr = GetAddress(row, startCol) + ":" + GetAddress(row, startCol + headers.Root.ColSpan - 1);
                worksheet.Cells[rowAddr].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells[rowAddr].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.FromArgb(220, 230, 241));
            }
        }
        private int WriteHeader(ExcelWorksheet worksheet, int row, int startCol, SpreadsheetHeaders headers)
        {
            List<SpreadsheetHeaders.TreeNode> currentNodes = new List<SpreadsheetHeaders.TreeNode>();
            List<SpreadsheetHeaders.TreeNode> allNodes = new List<SpreadsheetHeaders.TreeNode>();
            currentNodes.Add(headers.Root);
            while(currentNodes.Count > 0)
            {
                var node = currentNodes[0];
                currentNodes.RemoveAt(0);
                if(node.Parent != null)
                    allNodes.Add(node);
                currentNodes.AddRange(node.Children);
            }
            foreach(var node in allNodes)
            {
                string addr = GetAddress(row + node.RowOffset, startCol + node.ColOffset);
                worksheet.Cells[addr].Value = node.Value;
            }
            foreach(var node in allNodes)
            {
                if (node.ColSpan == 1 && node.RowSpan == 1)
                    continue;
                string start = GetAddress(row + node.RowOffset, startCol + node.ColOffset);
                string end = GetAddress(row + node.RowOffset + node.RowSpan - 1, startCol + node.ColOffset + node.ColSpan - 1);
                worksheet.Cells[start + ":" + end].Merge = true;
            }
            int maxRow = row;
            foreach(var node in allNodes)
            {
                var current = row + node.RowOffset + node.RowSpan;
                if (current > maxRow)
                    maxRow = current;
            }
            return maxRow;
        }

        private string GetAddress(int row, int column)
        {
            var c = "-ABCDEFGHIJKLMNOPQRSTU"[column];
            string addr = c + row.ToString();
            return addr;
        }
    }
}