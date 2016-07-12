import React from 'react'
import {Link} from 'react-router'

const Home = ()=> (
  <div className="container">
    <div className="home page active">
      <div className="left-panel">
        <div className="glyphicon logo-icon" />
        <div className="title">ΓΝΩΡΙΖΟΝΤΑΣ ΤΗ ΜΟΥΣΙΚΗ ΚΑΙ ΧΟΡΕΥΤΙΚΗ ΠΑΡΑΔΟΣΗ ΤΗΣ ΚΡΗΤΗΣ</div>
        <div className="description">
          <br />
          <br />
          <div className="btn btn-primary btn-lg">Έναρξη</div>
        </div>
      </div>
      <div className="right-panel">
        <div className="description">
          Το Μουσείο Μουσικών Κρήτης σας καλωσορίζει στη διαδικτυακή εκπαιδευτική εφαρμογή για τη μουσική και χορευτική παράδοση της Κρήτης, εκφάνσεις άμεσα συνδεδεμένες με την ψυχοσύνθεση αλλά και με την κοινωνική ζωή των Κρητικών.
          <br />
          <br />
          <Link to="quiz" className="btn btn-primary btn-lg">Έναρξη</Link>
        </div>
      </div>
    </div>
  </div>
)

export default Home;
