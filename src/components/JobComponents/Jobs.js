import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "../../Api";
import JobCard from "./JobCard";
import LoadingSpinner from "../Common/LoadingSpinner";
import UserContext from "../Common/UserContext";
import "../../App.css";
import Container from '@material-ui/core/Container';


/* Shows a list of companies along with a search bar to search in companies. 
Shows each company in state as a company card with its information */
function Jobs() {
  const { currentUser } = useContext(UserContext);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Updates tagSearchTerm with every type
  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  function handleSubmit(evt) {
    // take care of accidentally trying to search for just spaces
    evt.preventDefault();
    setSearchTerm(searchTerm.trim());
  }

  useEffect(() => {
    async function getJobss() {
      if (currentUser) {
      let res = await JoblyApi.getJobs();

        for (let i = 0; i < res.length; i++) {
          if (Object.values(currentUser.applications).includes(res[i].id)) {
            res[i].hasApplied = true
            console.log("res[i]", res[i])
          }
        }
      
      setJobs(res);
      setFilteredJobs(res);
      }
    }
    getJobss();
  }, [currentUser]);

  useEffect(() => {
    async function showJobsBasedOnSearch() {
      // If no search terms, display all students
      if (!searchTerm) {
        setFilteredJobs(jobs);
        return;
      } else {
        let searchTermEdit = searchTerm.toLowerCase().trim();

        let jobsWithSearchTerm = jobs.filter((job) =>
          job.title.toLowerCase().includes(searchTermEdit)
        );

        setFilteredJobs(jobsWithSearchTerm);
      }
    }
    showJobsBasedOnSearch();
  }, [searchTerm]);

  async function search(job) {
    let jobs = await JoblyApi.getJobs(job);
    setJobs(jobs);
  }

  if (!currentUser) {
    return (
      <div>
        <br />
        <br />
        <h4 className="unauthorized">
          Please log in or create an account to view jobs
        </h4>
      </div>
    );
  }

  if (!filteredJobs) return <LoadingSpinner />;

  return (
    <div>
    <br />
      <h1>List of Jobs</h1>
      <br />
      <div className="SearchForm mb-4">
        <form className="form-inline" onSubmit={handleSubmit}>
          <input
            className="form-control form-control-lg flex-grow-1"
            name="searchTerm"
            placeholder="Enter search term for job title"
            value={searchTerm}
            onChange={handleChange}
          />
        </form>
      </div>{" "}
      {filteredJobs.length ? (
    <Container maxWidth="xs">
    {filteredJobs.map((j) => (
            <JobCard
              key={j.id}
              id={j.id}
              title={j.title}
              salary={j.salary}
              equity={j.equity}
              companyName={j.companyName}
              hasApplied={j.hasApplied}
            />
          ))}
        </Container>
      ) : (
        <p>No results found</p>
      )}
      </div>
  );
}

export default Jobs;
