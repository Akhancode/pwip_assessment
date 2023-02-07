import React, { useEffect, useState } from "react";
import "./SearchBar.css";
const SearchBar = (props) => {
  const ACTIONTYPES = [
    null,
    "ADD_EMPLOYEE",
    "INITIATE_APPLICATION",
    "SUBMIT_APPLICATION",
  ];
  const APPLICATIONTYPES = [
    null,
    "ADD_COMPANY",
    "ADD_COMPANY_EMPLOYEE",
    "ADD_POA",
    "CERT_TITLE_DEED_PLOT",
    "CERT_PROP_OWNERSHIP",
  ];

  const { search, setSearch,url,setUrl } = props;
  const changeHandler = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const searchLogger = async () => {
    //USING URL FOR MODIFY URL
    let searchURL =`${process.env.REACT_APP_MY_BASEURL}/loggerHome/all_logs` +
      `?` +
      (search.logId ? `logID=${search.logId}&` : "") +
      (search.actionType ? `actionType=${search.actionType}&` : "") +
      (search.applicationType ? `applicationType=${search.applicationType}&` : "") +
      (search.applicationId ? `applicationId=${search.applicationId}&` : "") +
      (search.fromDate ? `startDate=${search.fromDate}&` : "") +
      (search.toDate ? `endDate=${search.toDate}&` : "");
      
    
      setUrl(searchURL)
      console.log(url);
  };

//   useEffect(() => {
//     console.log(search);
//   }, [search]);

  return (
    <div className="SearchBarContainer">
      <div className="logIdContainer">
        <label htmlFor="" className="LogID">
          Log ID
        </label>
        <input
          type="text"
          className="LogIdInput"
          name="logId"
          onChange={changeHandler}
        />
      </div>
      <div className="logIdContainer">
        <label htmlFor="" className="LogID">
          Action Type
        </label>
        <select
          type="text"
          className="LogIdInput"
          name="actionType"
          onChange={changeHandler}
          value={search.actionType}
        >
          {ACTIONTYPES?.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
      <div className="logIdContainer">
        <label htmlFor="" className="LogID">
          Application Type
        </label>
        <select
          type="text"
          className="LogIdInput"
          name="applicationType"
          onChange={changeHandler}
          value={search.applicationType}
        >
          {APPLICATIONTYPES?.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
      <div className="logIdContainer">
        <label htmlFor="" className="LogID">
          Application Id
        </label>
        <input
          type="text"
          className="LogIdInput"
          name="applicationId"
          onChange={changeHandler}
          placeholder="eg. 219841/2021"
        />
      </div>
      <div className="logIdContainer">
        <label htmlFor="" className="LogID">
          From Date
        </label>
        <input
          type="date"
          className="LogIdInput"
          name="fromDate"
          onChange={changeHandler}
        />
      </div>
      <div className="logIdContainer">
        <label htmlFor="" className="LogID">
          From Date
        </label>
        <input
          type="date"
          className="LogIdInput"
          name="toDate"
          onChange={changeHandler}
        />
      </div>
      <div className="logIdContainer">
        <span htmlFor="" className="LogID">
          {}
        </span>
        <button className="searchBtn" onClick={searchLogger}>
          Search Logger
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
