import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "../../Api"
import CompanyCard from "./CompanyCard"
import LoadingSpinner from "../Common/LoadingSpinner";
import SearchForm from "../Common/SearchForm"
import UserContext from '../Common/UserContext'
import '../../App.css';

/* Shows a list of companies along with a search bar to search in companies. 
Shows each company in state as a company card with its information */
function Companies() {
  const {currentUser} = useContext(UserContext)
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function getComps() {
      let res = await JoblyApi.getCompanies();
      setCompanies(res);
    }
    getComps();
  }, []);

  async function search(name) {
    let companies = await JoblyApi.getCompanies(name);
    setCompanies(companies);
  }
  
  if (!currentUser) { return <div><br/><br/><h4 className="unauthorized">Please log in or create an account to view companies</h4></div>}
  if (!companies) return <LoadingSpinner />;

  return (
    <div><br/>
        <h1>List of Companies</h1><br/>
        <SearchForm searchFor={search}/>
        {companies.length
            ? (
        <div>
        {companies.map(c => (
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
