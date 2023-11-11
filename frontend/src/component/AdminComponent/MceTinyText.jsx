import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const MceTinyText = ({ setDesc, hight }) => {
  const editorRef = useRef(null);
  //   const log = () => {
  //     if (editorRef.current) {
  //       console.log(editorRef.current.getContent());
  //     }
  //   };
  return (
    <>
      <Editor
        onChange={(e) => setDesc(e.target.getContent())}
        apiKey="y9oom0880sfhg5fi9gjn9n34wvv05gn4s44tvupdficp9m90"
        onInit={(evt, editor) => (editorRef.current = editor)}
        // initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: hight ? +hight : 300,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      {/* <button onClick={log}>Log editor content</button> */}
    </>
  );
};

export default MceTinyText;
