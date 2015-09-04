using App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;

namespace App.Utils.Spreadsheets
{
    public class SpreadsheetHeaders
    {
        public TreeNode Root { get; set; }
        public SpreadsheetHeaders(Type type)
        {
            var  headers = new List<Tuple<PropertyInfo, List<String>>>(); 
            foreach(var prop in type.GetProperties())
            {
                var attr = (SpreadsheetHeaderAttribute) Attribute.GetCustomAttribute(prop, typeof(SpreadsheetHeaderAttribute));
                if(attr != null)
                {
                    headers.Add(Tuple.Create(prop, attr.Values.ToList()));
                }
            }

            Root = new TreeNode(null);
            Process(Root, headers);
        }

        private void Process(TreeNode root, List<Tuple<PropertyInfo, List<String>>> input)
        {
            List<List<String>> output = new List<List<string>>();
            ISet<String> children = new HashSet<String>();
            foreach(var item in input)
            {
                children.Add(item.Item2[item.Item2.Count - 1]);
            }
            foreach(var child in children)
            {
                List<Tuple<PropertyInfo, List<String>>> owners = input.Where(item => item.Item2[item.Item2.Count - 1] == child).ToList();
                List<Tuple<PropertyInfo, List<String>>> removeds = new List<Tuple<PropertyInfo, List<string>>>();
                PropertyInfo childProp = null;
                foreach(var owner in owners)
                {
                    var removed = new List<string>(owner.Item2);
                    removed.RemoveAt(removed.Count - 1);
                    if (removed.Count > 0)
                        removeds.Add(Tuple.Create(owner.Item1, removed));
                    else
                        childProp = owner.Item1;
                }
                TreeNode childNode = new TreeNode(child);
                childNode.Parent = root;
                childNode.Property = childProp;
                root.Children.Add(childNode);
                Process(childNode, removeds);
            }
        }

        public class TreeNode
        {
            public String Value { get; set; }
            public PropertyInfo Property { get; set; }
            public TreeNode Parent { get; set; }
            public IList<TreeNode> Children { get; set; }

            public TreeNode(string value)
            {
                Value = value;
                Children = new List<TreeNode>();
            }

            public int LeafCount
            {
                get
                {
                    if (Children.Count == 0)
                        return 1;
                    int leaf = 0;
                    foreach (var child in Children)
                        leaf += child.LeafCount;
                    return leaf;
                }
            }
            public IList<TreeNode> Leafs
            {
                get
                {
                    if (Children.Count == 0)
                        return new List<TreeNode> { this };
                    var leafs = new List<TreeNode>();
                    foreach (var child in Children)
                        leafs.AddRange(child.Leafs);
                    return leafs;
                }
            }

            public int Depth
            {
                get
                {
                    if (Children.Count == 0)
                        return 0;
                    int maxDepth = 0;
                    foreach (var child in Children)
                    {
                        int childDepth = child.Depth;
                        if (childDepth > maxDepth)
                            maxDepth = childDepth;
                    }
                    return maxDepth + 1;
                }
            }

            public int RowSpan
            {
                get
                {
                    if (Parent == null)
                        return 0;

                    return Parent.Depth - this.Depth;
                }
            }

            public int ColSpan
            {
                get
                {
                    if (Children.Count == 0)
                        return 1;

                    int colSpan = 0;
                    foreach (var child in Children)
                        colSpan += child.ColSpan;
                    return colSpan;
                }
            }

            public int ColOffset
            {
                get
                {
                    if(Parent == null)
                        return 0;

                    int colOffset = Parent.ColOffset;
                    foreach(var sibling in Parent.Children)
                    {
                        if (sibling == this)
                            break;
                        colOffset += sibling.ColSpan;
                    }
                    return colOffset;
                }
            }
            public int RowOffset
            {
                get
                {
                    if (Parent == null)
                        return 0;

                    return Parent.RowOffset + Parent.RowSpan;
                }
            }
        }
    }
}