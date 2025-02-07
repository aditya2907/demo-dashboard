import React from "react";
import { List, ListItemButton, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore, InsertDriveFile } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleCollapse } from "./features/collapseSlice";

const buildTree = (data) => {
  const map = new Map();
  const tree = [];

  // Initialize map with nodes
  data.forEach((item) => map.set(item.nodeID, { ...item, children: [] }));

  // Build tree structure
  data.forEach((item) => {
    if (item.nodeParentID === null) {
      tree.push(map.get(item.nodeID)); // Top-level nodes
    } else {
      const parent = map.get(item.nodeParentID);
      if (parent) {
        parent.children.push(map.get(item.nodeID));
      }
    }
  });

  return tree;
};

const NestedList = ({ data, onOpenTab }) => {
  const dispatch = useDispatch();
  const collapseState = useSelector((state) => state.collapse);

  // Build tree structure only once
  const treeData = React.useMemo(() => buildTree(data), [data]);

  const renderList = (nodes, level = 0) =>
    nodes.map((item) => (
      <div key={item.nodeID}>
        {/* Folder Type Node */}
        {item.nodeType === "folder" ? (
          <>
            <ListItemButton onClick={() => dispatch(toggleCollapse(item.nodeID))} sx={{ pl: level * 2 }}>
              <ListItemText primary={item.nodeText} />
              {collapseState[item.nodeID] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={collapseState[item.nodeID]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderList(item.children, level + 1)}
              </List>
            </Collapse>
          </>
        ) : (
          // Report Type Node (Last Level)
          <ListItemButton sx={{ pl: (level + 1) * 2 }} onClick={() => onOpenTab(item)}>
            <InsertDriveFile sx={{ mr: 1 }} />
            <ListItemText primary={item.nodeText} />
          </ListItemButton>
        )}
      </div>
    ));

  return <List>{renderList(treeData)}</List>;
};

export default NestedList;