import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../../utils/API";

function Test(props) {
  const [book, setBook] = useState({})

  useEffect(() => {
    API.getProjects()
      .then(res => setBook(res.data.book))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container">
        
    </div>
  );
}

export default Test;
