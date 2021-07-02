import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "../../Api"
import JobCard from "./JobCard"
import LoadingSpinner from "../Common/LoadingSpinner";
import SearchForm from "../Common/SearchForm"
import UserContext from '../Common/UserContext'
import '../../App.css';

/* Lists all available jobs. Maps each job located in state as a JobCard component with the application button*/

function Jobs() {
  const {currentUser} = useContext(UserContext)
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function getComps() {
      let res = await JoblyApi.getJobs();
      setJobs(res);
    }
    getComps();
  }, []);

  async function search(name) {
    let jobs = await JoblyApi.getJobs(name);
    setJobs(jobs);
  }
  if (!currentUser) { return <div><br/><br/><h4 className="unauthorized">Please log in or create an account to view the job openings</h4></div>}
  if (!jobs) return <LoadingSpinner />;

  return (
    <div><br/>
        <h1>Jobs Available</h1><br/>
        <SearchForm searchFor={search}/>
        {jobs.length
            ? (
        <div>
          {jobs.map(c => (
              <JobCard
                  key={c.id}
                  id={c.id}
                  title={c.title}
                  salary={c.salary}
                  equity={c.equity}
                  companyName = {c.companyName}
              />
          ))}
        </div>
          ) : (
            <p>No results found</p>
        )}

    </div>
  );
}

export default Jobs;