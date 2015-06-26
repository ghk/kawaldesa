using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Utils.Excel
{
    public class ExcelHeaders
    {
        public ExcelHeaders(List<List<String>> headers)
        {
            TreeNode root = new TreeNode(null);
            Process(root, headers);
        }

        private void Process(TreeNode root, List<List<String>> input)
        {
            List<List<String>> output = new List<List<string>>();
            ISet<String> children = new HashSet<String>();
            foreach(var item in input)
            {
                children.Add(item[item.Count - 1]);
            }
            foreach(var child in children)
            {
                List<List<String>> owners = input.Where(item => item[item.Count - 1] == child).ToList();
                List<List<String>> removeds = new List<List<string>>();
                foreach(var owner in owners)
                {
                    var removed = new List<string>(owner);
                    removed.RemoveAt(removed.Count - 1);
                    if (removed.Count > 0)
                        removeds.Add(removed);
                }
                TreeNode childNode = new TreeNode(child);
                childNode.Parent = root;
                root.Children.Add(childNode);
                Process(childNode, removeds);
            }
        }

        public class TreeNode
        {
            public String Value { get; set; }
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
                    return maxDepth;
                }
            }

            public int RowSpan
            {
                get
                {
                    return Parent.Depth - this.Depth - 1;
                }
            }
        }
    }
}