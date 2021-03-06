import React, { useRef, useState } from "react";
import { Editor, EditorTools, EditorUtils } from "@progress/kendo-react-editor";
import { renderToStaticMarkup } from "react-dom/server";
import parse from "html-react-parser";
import reactElementToJSXString from "react-element-to-jsx-string";
import axios from "axios";

const {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ForeColor,
  AlignJustify,
  Indent,
  Outdent,
  OrderedList,
  UnorderedList,
  Undo,
  Redo,
  FontSize,
  FormatBlock,
  Link,
  Unlink,
} = EditorTools;

const EditableText = ({ children, fileUrl, id }) => {
  const defaultContent = renderToStaticMarkup(children);
  const editorRef = useRef(null);
  const [previewValue, setPreviewValue] = useState(null);
  const [showEdit, setShowEdit] = useState(null);

  const save = () => {
    const { view } = editorRef.current;

    // Parse the editor value to html and then to React nodes
    const nodeHtml = parse(EditorUtils.getHtml(view.state));

    let jsxHtml = "";
    if (nodeHtml && nodeHtml.length > 0) {
      nodeHtml.forEach((node) => {
        jsxHtml += reactElementToJSXString(node);
      });
    } else {
      // Change the React nodes to JSX text
      jsxHtml = reactElementToJSXString(nodeHtml);
    }

    // Create body and make request
    const body = {
      html: jsxHtml,
      fileUrl,
      id,
    };

    axios
      .post("/api/update", body)
      .then(() => {
        setShowEdit(false);
      })
      .catch((err) =>
        console.error("We encountered an error while saving the file:", err)
      );
    setPreviewValue(false);
  };

  const preview = () => {
    const { view } = editorRef.current;
    const nodeHtml = parse(EditorUtils.getHtml(view.state));
    setPreviewValue(nodeHtml);
  };

  return (
    <>
      <span onClickCapture={() => setShowEdit(true)}>
        {previewValue ? previewValue : children}
      </span>

      {showEdit && (
        <>
          <Editor
            tools={[
              [Bold, Italic, Underline, Strikethrough, ForeColor],
              [AlignLeft, AlignCenter, AlignRight, AlignJustify],
              [Indent, Outdent],
              [OrderedList, UnorderedList],
              FontSize,
              FormatBlock,
              [Undo, Redo],
              [Link, Unlink],
            ]}
            contentStyle={{ height: 160, width: "100%" }}
            defaultContent={defaultContent}
            ref={editorRef}
          />
          <div className="k-button-group button-group">
            <button className="k-button k-button-icontext" onClick={save}>
              Save
            </button>
            <button className="k-button k-button-icontext" onClick={preview}>
              Preview
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default EditableText;
