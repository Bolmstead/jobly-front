import React, { useState, useContext, useEffect } from "react";
import UserContext from '../Common/UserContext'
import {Card, Button} from 'react-bootstrap';
import '../../App.css';


/* returns the card template of a job opening */
function JobCard({title, salary, equity, id, companyName, hasApplied}) {
  const { hasAppliedToJob, applyToJob } = useContext(UserContext);
  const [applied, setApplied] = useState();

  React.useEffect(function updateAppliedStatus() {
    console.debug("JobCard useEffect updateAppliedStatus", "id=", id);

    setApplied(hasAppliedToJob(id));
  }, [id, hasAppliedToJob]);

  /** Apply for a job */
  async function handleApply(evt) {
    if (hasAppliedToJob(id)) return;
    applyToJob(id);
    setApplied(true);
  }

  useEffect(() => {
    async function hasUserApplied() {
      if (hasApplied) {
        setApplied(true)
      }
    }
    hasUserApplied();
  }, []);

  return (
    <Card className="card">
      <Card.Body>
      <h4>{title}</h4>
      <h6>{companyName}</h6>
      <span className="caption">Salary: ${salary} &nbsp; &nbsp;</span>
      <span className="caption">Equity: {equity}</span><br/><br/>
      <Button 
              className="btn btn-sm btn-primary"
              onClick={handleApply}
              disabled={applied}>
            {applied ? "Applied" : "Apply"}</Button>
        </Card.Body>
    </Card>
  );
}

export default JobCard;
