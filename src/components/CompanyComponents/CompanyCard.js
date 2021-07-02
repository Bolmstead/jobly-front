import React from "react";
import {Link} from 'react-router-dom';
import '../../App.css';
import {Card} from 'react-bootstrap';

/* Card template to show information of company*/

function CompanyCard(company) {
  return (
        <Card className="mt-3">
      <Card.Body>
      <Link to={`/Companies/${company.handle}`} key={company.handle}>
      <h5>{company.name}</h5>
      </Link>
      <p>{company.description}</p>
        </Card.Body>
    </Card>
      );
}

export default CompanyCard;
