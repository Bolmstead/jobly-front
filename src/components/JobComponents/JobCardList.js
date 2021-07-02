import React from "react";
import JobCard from "./JobCard";
import LoadingSpinner from "../Common/LoadingSpinner";
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  if (!jobs) return <LoadingSpinner />;

  return (
      <div className="JobCardList">
        {jobs.map(job => (
            <JobCard
                key={job.id}
                id={job.id}
                title={job.title}
                salary={job.salary}
                equity={job.equity}
            />
        ))}
      </div>
  );
}

export default JobCardList;
