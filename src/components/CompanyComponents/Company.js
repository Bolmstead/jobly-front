import React, { useState, useEffect, useContext } from "react";
import {useParams} from 'react-router-dom';
import JoblyApi from "../../Api"
import LoadingSpinner from "../Common/LoadingSpinner";
import JobCardList from "../JobComponents/JobCardList"
import UserContext from '../Common/UserContext'
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/* displays the detail of a company by calling the API to grab company information. */
function Company() {
  const {currentUser} = useContext(UserContext)
  const {handle} = useParams();
  const [company, setCompany] = useState([]);

  useEffect(() => {
    async function getComps() {
      setCompany(await JoblyApi.getCompany(handle));
    }
    getComps();
  }, [handle]);

  if (!currentUser) { return <h1 className="unauthorized">Access Unauthorized</h1>}
  if (!company) return <LoadingSpinner />;
  

  return (
    <div><br/>
        <h1>{company.name}</h1>
        <p>{company.description}</p><br/>
        <h3>Position Openings:</h3>
        <JobCardList jobs={company.jobs} />
    </div>
  );
}


export default Company;
