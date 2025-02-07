import React from "react";
import { List, ListItemButton, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore, InsertDriveFile } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleCollapse } from "./features/collapseSlice";

/**
 * Converts an object-based structure into a nested tree format.
 * @param {Object} data - The input object containing nodes.
 * @returns {Array} - The structured nested list as an array.
 */
const buildTree = (data) => {
  let tree = {};
  let lookup = {};

  // Convert object data to a lookup table
  Object.values(data).forEach((item) => {
    lookup[item.nodeID] = { ...item, children: [] };
  });

  // Build the nested tree structure
  Object.values(lookup).forEach((item) => {
    if (item.nodeParentID === null) {
      tree[item.nodeID] = item;
    } else {
      lookup[item.nodeParentID]?.children.push(item);
    }
  });

  return Object.values(tree); // Return as an array of root nodes
};

const NestedList = ({ data, onOpenTab }) => {
  const dispatch = useDispatch();
  const collapseState = useSelector((state) => state.collapse);
  const structuredData = buildTree(data); // Convert object to tree structure

  return (
    <List>
      {structuredData.map((node) => (
        <NodeItem key={node.nodeID} node={node} collapseState={collapseState} dispatch={dispatch} onOpenTab={onOpenTab} />
      ))}
    </List>
  );
};

const NodeItem = ({ node, collapseState, dispatch, onOpenTab }) => {
  return (
    <div>
      {node.nodeType === "folder" ? (
        <>
          <ListItemButton onClick={() => dispatch(toggleCollapse(node.nodeID))}>
            <ListItemText primary={node.nodeText} />
            {collapseState[node.nodeID] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={collapseState[node.nodeID]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {node.children.map((child) => (
                <NodeItem key={child.nodeID} node={child} collapseState={collapseState} dispatch={dispatch} onOpenTab={onOpenTab} />
              ))}
            </List>
          </Collapse>
        </>
      ) : (
        <ListItemButton sx={{ pl: 4 }} onClick={() => onOpenTab(node)}>
          <InsertDriveFile sx={{ mr: 1 }} />
          <ListItemText primary={node.nodeText} />
        </ListItemButton>
      )}
    </div>
  );
};

export default NestedList;