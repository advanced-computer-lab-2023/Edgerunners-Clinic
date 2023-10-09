import React from "react";
import getRelation from "./GetRelation";

export default function ViewFamilyMem() {
    
  const relations = getRelation();
  if (relations.data != null) {
    return (
      <div className="Bootstrap ViewFamilyMem">
        <div className="event-schedule-area-two bg-color pad100">
          <div className="container">
            <div className="row col-lg-12 section-title text-center title-text">
              <h2>Family Members</h2>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade active show"
                    id="home"
                    role="tabpanel"
                  >
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th className="text-center" scope="col">
                              Relation
                            </th>
                            <th scope="col"></th>
                            <th scope="col">Information</th>
                            <th scope="col" className="text-center" width="200px">
                              National ID
                            </th>
                          </tr>
                        </thead>
                        {relations.data.map((r, index) => {
                          let gender = null;
                          let pic = null;
                          if (r.Relation === "Husband") {
                            pic =
                              "https://bootdey.com/img/Content/avatar/avatar1.png";
                          } else if (r.Relation === "Wife") {
                            pic =
                              "https://bootdey.com/img/Content/avatar/avatar8.png";
                          } else if (
                            r.Relation === "Child" &&
                            r.Gender === "Male"
                          ) {
                            pic =
                              "https://bootdey.com/img/Content/avatar/avatar7.png";
                          } else {
                            pic =
                              "https://bootdey.com/img/Content/avatar/avatar3.png";
                          }
                          if (r.Gender === "Male") {
                            gender = (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="currentColor"
                                className="bi bi-gender-male"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2H9.5zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
                                />
                              </svg>
                            );
                          } else {
                            gender = (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="currentColor"
                                className="bi bi-gender-female"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5z"
                                />
                              </svg>
                            );
                          }
                          return (
                            <tbody key={index}>
                              <tr className="inner-box">
                                <th scope="row">
                                  <h2 className="text-center">{r.Relation}</h2>
                                </th>
                                <td>
                                  <div className="event-img">
                                    <img
                                      src={pic}
                                      alt=""
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div className="event-wrap">
                                    <h2>{r.Name}</h2>
                                    {gender}
                                  </div>
                                </td>
                                <td>
                                  <div className="r-no">
                                    <h2> {r.NationalID}</h2>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          );
                        })}
                      </table>
                    </div>
                  </div>
                </div>
                <div className="primary-btn text-center">
                  <a href="/NewFamilyMem" className="btn btn-primary">
                    Add Family Member
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
