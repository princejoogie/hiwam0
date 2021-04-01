import React, { useRef, useState } from "react";
import db from "./firebase";

export default function Home() {
  const urlRef = useRef();
  const tagRef = useRef();
  const [str, setStr] = useState("");
  const [copied, setCopied] = useState(false);

  const randomize = () => {
    var res = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const n = characters.length;
    for (var i = 0; i < 5; i++)
      res += characters.charAt(Math.floor(Math.random() * n));

    return res;
  };

  const copyToClipboard = (str) => {
    const el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const url = urlRef.current.value;
    const tag = tagRef.current.value;

    if (!url) alert("URL is required.");
    else if (!tag) {
      var rando = randomize();
      var docRef = db.collection("tags").doc(rando);
      while (true) {
        docRef = db.collection("tags").doc(rando);
        const data = (await docRef.get()).data();
        if (!data) break;
        else rando = randomize();
      }

      setStr(rando);
      docRef.set({ url, rando });
    } else {
      const docRef = db.collection("tags").doc(tag);
      const data = (await docRef.get()).data();

      if (!data) {
        setStr(tag);
        docRef.set({ url, tag });
      } else {
        setStr("");
        alert("Tag already taken.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-semibold">Joog</h1>
        <p>URL Shortener</p>
      </div>

      <form className="flex flex-col w-full mt-8" onSubmit={onSubmit}>
        <div className="mx-auto rounded">
          <input
            ref={urlRef}
            placeholder="Paste your URL"
            type="text"
            className="border-gray-400 rounded-l w-52 focus:border-gray-600 sm:w-64 md:w-96 focus:outline-none focus:ring-0"
          />
          <button
            type="submit"
            className="h-full px-4 text-gray-200 bg-green-500 rounded-r focus:outline-none active:bg-green-600"
          >
            Shorten
          </button>
        </div>

        <input
          ref={tagRef}
          placeholder="Desired Tag (optional)"
          type="text"
          className="w-48 mx-auto mt-4 border-gray-400 rounded focus:border-gray-600 focus:outline-none focus:ring-0"
        />
      </form>

      {str && (
        <>
          <h3 className="mt-8 text-xl">Congratulations!</h3>
          <div className="flex items-center mt-2 text-gray-500 bg-gray-100 rounded">
            <div className="flex items-center px-4 py-2 border border-gray-200 rounded-l">
              <p>Your Link: &nbsp;</p>
              <a
                className="text-blue-500 underline"
                href={`${window.location.origin}/${str}`}
              >{`${window.location.host}/${str}`}</a>
            </div>
            <div
              onClick={() => {
                setCopied(true);
                copyToClipboard(`${window.location.origin}/${str}`);
              }}
              className="grid content-center h-full px-2 text-gray-200 bg-green-500 rounded-r cursor-pointer select-none active:bg-green-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
          </div>
          {copied && (
            <p className="text-sm text-green-500">Copied to clipboard!</p>
          )}
        </>
      )}
    </div>
  );
}
