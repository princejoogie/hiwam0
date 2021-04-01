import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import db from "./firebase";

export default function Redir() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const addhttp = (url) => {
    if (!url.match(/^[a-zA-Z]+:\/\//)) {
      url = "http://" + url;
    }
    return url;
  };

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const docRef = db.collection("tags").doc(id);
      const data = await (await docRef.get()).data();

      if (!data) {
        alert("Tag does not exist");
        window.location = window.location.origin;
      } else {
        window.location = addhttp(data.url);
      }
      setLoading(false);
    };

    getData();
  }, [id]);

  return loading ? (
    <div className="flex items-center justify-center w-full h-full">
      <h1 className="text-xl">Loading...</h1>
    </div>
  ) : null;
}
