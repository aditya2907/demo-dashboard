const buildTree = (data) => {
  let lookup = {}; // Stores nodes by nodeID
  let childSet = new Set(); // Tracks all nodeParentID references

  // Convert object data to lookup table and initialize children array
  Object.values(data).forEach((item) => {
    lookup[item.nodeID] = { ...item, children: [] };
    childSet.add(item.nodeParentID); // Track all nodeParentIDs
  });

  let tree = [];

  // Assign children to their respective parents
  Object.values(lookup).forEach((item) => {
    if (childSet.has(item.nodeID)) {
      // This node is a child, so link it to its parent
      lookup[item.nodeParentID]?.children.push(item);
    } else {
      // This node is NOT a child anywhere -> It's a root node
      tree.push(item);
    }
  });

  return tree; // Return only the root nodes
};