import React, { useEffect, useState } from "react";
import { fetchSubjects, SubjectType } from "../API";

import { useNavigate } from "react-router-dom";

import "./Home.css";

//favIcon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export type UserSubjObject = {
  subjectFile: string;
  subjectName: string;
  subjectSubName: string;
};
export let TEST_FILE: string;
export let SubjectName: string;


function Home() {
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState<SubjectType[]>([]);
  // const [userSubject, setUserSubject] = useState<UserSubjObject>();

  useEffect(() => {
    //Runs only on the first render
    starter();
  }, []);

  const starter = async () => {
    try {
      setLoading(true);

      // console.log(fetchSubjects());
      const newSubjects = await fetchSubjects();
      setSubjects(newSubjects);

      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const navigate = useNavigate();
  function clickHandle(
    subjectFile: string,
    subjectName: string,
    subjectSubName: string
  ) {
    console.log(subjectFile, subjectName, subjectSubName);
    // setUserSubject()
    TEST_FILE = subjectFile;
    SubjectName = subjectName;
    navigate(`/quizes`);
    return;
  }

  return (
    <div className="App">
      <h1 className="app-name">თსუ მასალების ქვიზის აპლიკაცია</h1>
      <h2 className="app-name__EN">TSU Masalebi Quiz App</h2>
      <div className="subject-card__container">
        <h3 className="title">
          აიჩიეთ სასურველი საგანი / Select the desired subject
        </h3>
        {loading && (
          <p className="spinner__container">
            <FontAwesomeIcon icon={faSpinner} className="spinner" /> Loading
            Questions...
          </p>
        )}

        {!loading && (
          <div className="subject-btn__container">
            {subjects.map((subject) => (
              <button
                className="subject_btn"
                key={subject.file_name}
                onClick={() =>
                  clickHandle(
                    subject.file_name,
                    subject.subject_name,
                    subject.sub_name
                  )
                }
              >
                {subject.subject_name}
                <br />
                <small>{subject.sub_name}</small>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
