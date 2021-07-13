import React, { useState, useEffect, useContext } from "react";
import JobCard from "./JobCard";
import LoadingSpinner from "../Common/LoadingSpinner";
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserContext from "../Common/UserContext";


/** Show list of job cards.
 *
 * Used by both JobList and CompanyDetail to list jobs. Receives an apply
 * func prop which will be called by JobCard on apply.
 *
 * JobList -> JobCardList -> JobCard
 * CompanyDetail -> JobCardList -> JobCard
 *
 */

function JobCardList({ jobs }) {
  const { currentUser } = useContext(UserContext);
  const [checkedForApplied, setCheckedForApplied] = useState(false);


  useEffect(() => {
    async function getJobss() {
      if (jobs) {
        for (let i = 0; i < jobs.length; i++) {
          if (Object.values(currentUser.applications).includes(jobs[i].id)) {
            jobs[i].hasApplied = true
          }
        }
      
        setCheckedForApplied(true);
      }
    }
    getJobss();
  }, [jobs]);

  if (!jobs || !checkedForApplied) return <LoadingSpinner />;

  return (
      <div className="JobCardList">
        {jobs.map(job => (
            <JobCard
                key={job.id}
                id={job.id}
                title={job.title}
                salary={job.salary}
                equity={job.equity}
                hasApplied={job.hasApplied}
            />
        ))}
      </div>
  );
}

export default JobCardList;
