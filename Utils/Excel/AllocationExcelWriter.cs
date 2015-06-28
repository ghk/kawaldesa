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

namespace App.Utils.Excel
{
    public class AllocationExcelWriter<TAllocation>
        where TAllocation: IAllocation
    {
        public HttpResponseMessage WriteData(List<Region> parentRegions, List<Region> regions, List<TAllocation> allocations)
        {
            byte[] output = null;

            int startRow = 2;
            int startColumn = 2;
            var fileAttr = (ExcelFileNameAttribute) Attribute.GetCustomAttribute(typeof(TAllocation), typeof(ExcelFileNameAttribute));
            String fileName = fileAttr == null ? typeof(TAllocation).Name : fileAttr.Value; 

            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("Sheet 1");
                var headers = new ExcelHeaders(typeof(TAllocation));
                int row = startRow;

                row = WriteHeader(worksheet, row, startColumn, headers);
                int headerEndRow = row - 1;

                foreach(var group in regions.GroupBy(r => r.fkParentId).OrderBy(g => g.Key))
                {
                    var parentRegion = parentRegions.First(r => r.Id == group.Key);
                    WriteGroupRow(worksheet, parentRegion.Id, row, startColumn, headers, parentRegion);
                    row += 1;

                    bool isAlternatingColor = false;
                    foreach (var region in group.OrderBy(r => r.Id))
                    {
                        var allocation = allocations.FirstOrDefault(a => a.fkRegionId == region.Id);
                        WriteDataRow(worksheet, isAlternatingColor, region.Id, row, startColumn, headers, region, allocation);
                        row += 1;
                        isAlternatingColor = !isAlternatingColor;
                    }
                }

                int col = startColumn;
                foreach(var leaf in headers.Root.Leafs)
                {
                    var attr = (ExcelHeaderAttribute) Attribute.GetCustomAttribute(leaf.Property, typeof(ExcelHeaderAttribute));
                    if(attr.Width.HasValue)
                        worksheet.Column(col).Width = attr.Width.Value;
                    col += 1;
                }

                var tableAddr = GetAddress(startRow, startColumn) + ":" + GetAddress(row - 1, startColumn + headers.Root.ColSpan - 1);
                worksheet.Cells[tableAddr].Style.Border.Top.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
                worksheet.Cells[tableAddr].Style.Border.Bottom.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
                worksheet.Cells[tableAddr].Style.Border.Left.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
                worksheet.Cells[tableAddr].Style.Border.Right.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
                worksheet.Cells[tableAddr].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thick);

                var headerAddr = GetAddress(startRow, startColumn) + ":" + GetAddress(headerEndRow, startColumn + headers.Root.ColSpan - 1);
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

            var result = new HttpResponseMessage(HttpStatusCode.OK) { Content = new ByteArrayContent(output) };
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
            {
                FileName = fileName + ".xlsx"
            };
            return result;
        }
        private void WriteGroupRow(ExcelWorksheet worksheet, String no, int row, int columnStart, ExcelHeaders headers, Region region)
        {
            worksheet.Cells[GetAddress(row, columnStart)].Value = no;
            worksheet.Cells[GetAddress(row, columnStart + 1)].Value = region.Name;
            var groupAddr = GetAddress(row, columnStart) + ":" + GetAddress(row, columnStart + headers.Root.ColSpan + 1);
            worksheet.Cells[groupAddr].Style.Font.Bold = true;
            worksheet.Cells[groupAddr].Style.Font.Color.SetColor(System.Drawing.Color.Red);
            if(headers.Root.ColSpan > 2)
                worksheet.Cells[GetAddress(row, columnStart + 1)+":"+GetAddress(row, columnStart + headers.Root.ColSpan - 1)].Merge = true;
        }

        private void WriteDataRow(ExcelWorksheet worksheet, bool isAlternatingColor, String no, int row, int columnStart, ExcelHeaders headers,
            Region region, TAllocation allocation)
        {
            worksheet.Cells[GetAddress(row, columnStart)].Value = no;
            worksheet.Cells[GetAddress(row, columnStart + 1)].Value = region.Name;
            int colOffset = 2;
            foreach(var leaf in headers.Root.Leafs)
            {
                if (leaf.Property.Name != "RegionName")
                {
                    var value = allocation == null ? null : leaf.Property.GetValue(allocation);
                    var addr = GetAddress(row, columnStart + colOffset);
                    worksheet.Cells[addr].Value = value;
                    colOffset++;
                }
            }
            if(isAlternatingColor)
            {
                var rowAddr = GetAddress(row, columnStart) + ":" + GetAddress(row, columnStart + headers.Root.ColSpan - 1);
                worksheet.Cells[rowAddr].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells[rowAddr].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.FromArgb(220, 230, 241));
            }
        }
        private int WriteHeader(ExcelWorksheet worksheet, int row, int columnStart, ExcelHeaders headers)
        {
            List<ExcelHeaders.TreeNode> currentNodes = new List<ExcelHeaders.TreeNode>();
            List<ExcelHeaders.TreeNode> allNodes = new List<ExcelHeaders.TreeNode>();
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
                string addr = GetAddress(row + node.RowOffset, columnStart + node.ColOffset);
                worksheet.Cells[addr].Value = node.Value;
            }
            foreach(var node in allNodes)
            {
                if (node.ColSpan == 1 && node.RowSpan == 1)
                    continue;
                string start = GetAddress(row + node.RowOffset, columnStart + node.ColOffset);
                string end = GetAddress(row + node.RowOffset + node.RowSpan, columnStart + node.ColOffset + node.ColSpan);
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