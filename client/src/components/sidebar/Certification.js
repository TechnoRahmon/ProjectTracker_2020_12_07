import React from 'react';
import "../../css/styleV1.css";
const Certification = () => {
    return (
      <div className="certification_container">
        <h1>Certification</h1>
        <div className="certification_list responsive-table">
          <table>
            <thead>
              <tr>
                <th>School</th>
                <th>Instracture</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Codify Collage</td>
                <td>John Due</td>
                <td>2020-01-01</td>
              </tr>
            </tbody>
          </table>
          <div className="certification_row">
            <img
              src="https://www.realisticdiplomas.com/Images/Products/Certificates/fake-tesol-certificate-L.jpg"
              alt="certiti"
            />
          </div>
        </div>
        <div className="certification_list responsive-table">
          <table>
            <thead>
              <tr>
                <th>School</th>
                <th>Instracture</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Codify Collage</td>
                <td>John Due</td>
                <td>2020-01-01</td>
              </tr>
            </tbody>
          </table>
          <div className="certification_row">
            <img
              src="https://i0.wp.com/superiorfakedegrees.com/wp-content/uploads/2019/02/Fake-Certificate-Of-Marriage-2.png"
              alt="certic"
            />
          </div>
        </div>
      </div>
    );
}

export default Certification;
