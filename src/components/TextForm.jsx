import React, { useState } from "react";
// import { ReactDOM } from "react-dom";

function TextForm(props) {
  const [text, setText] = useState("");

  const handleOnChange = (event) => {
    // console.log("On cahnge ");
    setText(event.target.value);
  };

  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to UpperCase", "success");
  };
  const handleLowClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to LowerCase", "success");
  };
  const handleClerClick = () => {
    setText("");
    props.showAlert("Cleared the Text-Box", "success");
  };
  // Function to capitalize  first letter of each word
  const handleCapitalize = () => {
    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    const upper = text.split(" ").map(capitalize).join(" ");
    setText(upper);
    props.showAlert("Capitalized Successfully", "success");
  };

  const handleCopyClick = () => {
    let newText = document.getElementById("textArea");
    newText.select();
    navigator.clipboard.writeText(newText.value);
    props.showAlert("Text Copied to ClipBoard", "success");
  };
  const handleRemoveClick = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Extra Spaces Removed", "success");
  };
  const speak = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
  };
  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([text], {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download = "Word-CountFile.txt";
    element.click();
    props.showAlert("Download Would be Started Soon", "success");
  };
  return (
    <div
      className="container"
      style={{ color: props.mode === "light" ? "black" : "white" }}
    >
      <h1>{props.title}</h1>
      <div className="mb-3">
        <textarea
          style={{
            backgroundColor: props.mode === "light" ? "white" : "#1b1919",
            color: props.mode === "light" ? "black" : "white"
          }}
          placeholder="Enter the text"
          name="content"
          className="form-control"
          value={text}
          onChange={handleOnChange}
          id="textArea"
          rows="8"
        ></textarea>
      </div>
      <button className="btn btn-primary mx-2 my-2" onClick={handleUpClick}>
        Convert to Uppercase
      </button>
      <button className="btn btn-primary mx-2 my-2" onClick={handleLowClick}>
        Convert to Lowercase
      </button>
      <button className="btn btn-primary mx-2 my-2" onClick={handleCapitalize}>
        Capitalize
      </button>
      <button className="btn btn-primary mx-2 my-2" onClick={handleClerClick}>
        Clear Text
      </button>
      <button className="btn btn-primary mx-2 my-2" onClick={handleCopyClick}>
        Copy Text
      </button>
      <button className="btn btn-primary mx-2 my-2" onClick={handleRemoveClick}>
        Remove Extra Spaces
      </button>
      <button
        type="submit"
        onClick={speak}
        className="btn btn-outline-info mx-2 my-2"
      >
        <i className="fa-solid fa-volume-high"></i>
      </button>
      <button className="btn" onClick={downloadTxtFile}>
        <i className="fa-solid fa-file-arrow-down fa-2x"></i>
      </button>

      <div
        className="container my-3"
        style={{ color: props.mode === "light" ? "black" : "white" }}
      >
        <h2>Your Text Summary</h2>
        <p>
          {
            text.split(" ").filter((element) => {
              return element.length !== 0;
            }).length
          }
          words & {text.length} characters
        </p>
        <p>
          {0.008 *
            text.split(" ").filter((element) => {
              return element.length !== 0;
            }).length}
          Minutes will be taken to read above lines
        </p>
        <h3>Preview</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default TextForm;
