import fs from "fs";
import { parse } from "node-html-parser";

const findAndUpdateNode = (node, id, value) => {
  // NodeType 1 is an HTMLElement
  if (node.nodeType !== 1) {
    return;
  } else if (node.rawAttrs && node.rawAttrs.includes(id)) {
    // If we found the id then replace the content
    node.set_content(value);
    return;
  } else {
    // Go through all the childNodes until we find the id
    node.childNodes.forEach((childNode) =>
      findAndUpdateNode(childNode, id, value)
    );
  }
};

export default (req, res) => {
  const { fileUrl, id, html } = req.body;
  let file = null;

  // Try to read the file
  try {
    file = fs.readFileSync(fileUrl, "utf8");
  } catch (err) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.json({
      message: "Oops!! We got an error reading the file!",
      error: err,
    });
    return;
  }

  // Parse the file and update the element.
  const root = parse(file);
  findAndUpdateNode(root, id, html);

  // Need to write the file now.
  try {
    fs.writeFileSync(fileUrl, root.toString());
  } catch (err) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.json({
      message: "Oops!! We got an error writing the file!",
      error: err,
    });
    return;
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({ message: "Success" });
};
