import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "../../Api";
import CompanyCard from "./CompanyCard";
import LoadingSpinner from "../Common/LoadingSpinner";
import UserContext from "../Common/UserContext";
import "../../App.css";

/* Shows a list of companies along with a search bar to search in companies. 
Shows each company in state as a company card with its information */
function Companies() {
  const { currentUser } = useContext(UserContext);
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState(null);
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
    async function getComps() {
      let res = await JoblyApi.getCompanies();
      setCompanies(res);
      setFilteredCompanies(res);
    }
    getComps();
  }, []);

  useEffect(() => {
    async function showCompaniesBasedOnSearchTerms() {
      // If no search terms, display all students
      if (!searchTerm) {
        setFilteredCompanies(companies);
        return;
      } else {
        let searchTermEdit = searchTerm.toLowerCase().trim();

        let companiesWithSearchTerm = companies.filter((company) =>
          company.name.toLowerCase().includes(searchTermEdit)
        );

        setFilteredCompanies(companiesWithSearchTerm);
      }
    }
    showCompaniesBasedOnSearchTerms();
  }, [searchTerm]);

  async function search(name) {
    let companies = await JoblyApi.getCompanies(name);
    setCompanies(companies);
  }

  if (!currentUser) {
    return (
      <div>
        <br />
        <br />
        <h4 className="unauthorized">
          Please log in or create an account to view companies
        </h4>
      </div>
    );
  }

  if (!filteredCompanies) return <LoadingSpinner />;

  return (
    <div>
      <br />
      <h1>List of Companies</h1>
      <br />
      <div className="SearchForm mb-4">
        <form className="form-inline" onSubmit={handleSubmit}>
          <input
            className="form-control form-control-lg flex-grow-1"
            name="searchTerm"
            placeholder="Enter search term"
            value={searchTerm}
            onChange={handleChange}
          />
        </form>
      </div>{" "}
      {filteredCompanies.length ? (
        <div>
          {filteredCompanies.map((c) => (
            <CompanyCard
              key={c.handle}
              handle={c.handle}
              name={c.name}
              description={c.description}
              logoUrl={c.logoUrl}
            />
          ))}
        </div>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}

export default Companies;
