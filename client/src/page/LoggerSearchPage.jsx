import React, { useEffect, useState } from "react";
import "./LoggerSearchPage.css";
import PaginationBar from "../components/PaginationBar/PaginationBar";
import axios from "axios";
import SearchBar from "../components/SearchBar/SearchBar";



const demoData = [
  {
    logId: 906468196730134,
    applicationId: null,
    applicationType: null,
    companyId: null,
    actionType: "DARI_REFRESH_TOKEN",
    ip: "10.11.0.89",
    userAgent:
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36",
    userId: 115678,
    source: null,
    ownerId: null,
    logInfo: null,
    creationTimestamp: "2022-01-31 17:29:00",
  },
  {
    logId: 365001413757985,
    applicationId: null,
    applicationType: null,
    companyId: null,
    actionType: "DARI_REFRESH_TOKEN",
    ip: "10.11.1.39",
    userAgent:
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36",
    userId: 115678,
    source: null,
    ownerId: null,
    logInfo: null,
    creationTimestamp: "2022-01-31 17:51:01",
  },
  {
    logId: 934448782347868,
    applicationId: null,
    applicationType: null,
    companyId: null,
    actionType: "DARI_REFRESH_TOKEN",
    ip: "10.11.0.89",
    userAgent:
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36",
    userId: 115678,
    source: null,
    ownerId: null,
    logInfo: null,
    creationTimestamp: "2022-01-31 17:51:01",
  },
  {
    logId: 805901994400875,
    applicationId: null,
    applicationType: null,
    companyId: null,
    actionType: "DARI_REFRESH_TOKEN",
    ip: "10.11.0.83",
    userAgent:
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36",
    userId: 115678,
    source: null,
    ownerId: null,
    logInfo: null,
    creationTimestamp: "2022-01-31 19:28:02",
  },
  {
    logId: 842180396585606,
    applicationId: null,
    applicationType: null,
    companyId: null,
    actionType: "DARI_REFRESH_TOKEN",
    ip: "10.11.1.39",
    userAgent:
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36",
    userId: 115678,
    source: null,
    ownerId: null,
    logInfo: null,
    creationTimestamp: "2022-01-31 17:29:00",
  },
  {
    logId: 712087267864057,
    applicationId: null,
    applicationType: null,
    companyId: null,
    actionType: "DARI_APP_LOGIN",
    ip: "10.11.0.89",
    userAgent:
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36",
    userId: 115678,
    source: null,
    ownerId: null,
    logInfo: null,
    creationTimestamp: "2022-01-31 17:17:32",
  },
  {
    logId: 757782069396282,
    applicationId: 999981634772447,
    applicationType: "ADD_COMPANY",
    companyId: null,
    actionType: "SUBMIT_APPLICATION",
    ip: "10.11.0.93",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
    userId: 91030,
    source: "ONLINE",
    ownerId: null,
    logInfo: null,
    creationTimestamp: "2021-12-12 23:35:58",
  },
  {
    logId: 373114413870203,
    applicationId: 999981634772448,
    applicationType: "ADD_COMPANY",
    companyId: null,
    actionType: "SUBMIT_APPLICATION",
    ip: "10.11.0.93",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
    userId: 91030,
    source: "ONLINE",
    ownerId: null,
    logInfo: null,
    creationTimestamp: "2021-12-12 23:41:38",
  },
  {
    logId: 843816019981720,
    applicationId: 999981634772446,
    applicationType: "ADD_COMPANY",
    companyId: null,
    actionType: "SUBMIT_APPLICATION",
    ip: "10.11.0.93",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
    userId: 91030,
    source: "ONLINE",
    ownerId: null,
    logInfo: null,
    creationTimestamp: "2021-12-12 23:30:48",
  },
  {
    logId: 367295467136512,
    applicationId: 530463163501219,
    applicationType: "ADD_COMPANY_EMPLOYEE",
    companyId: 52,
    actionType: "INITIATE_APPLICATION",
    ip: "10.11.0.93",
    userAgent:
      "Aurora/1.0 (com.glowfishlab.Adres-Dari; build:20; iOS 15.0.0) Alamofire/5.4.4",
    userId: 3202,
    source: "ONLINE",
    ownerId: null,
    logInfo: null,
    creationTimestamp: "2021-12-07 14:44:37",
  },
];

const LoggerSearchPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [url, setUrl] = useState(`${process.env.REACT_APP_MY_BASEURL}/loggerHome/all_logs?`);
  const [sortUrl, setSortUrl] = useState(null);
  const [status, setStatus] = useState(null);
  const [totalItem, setTotalItem] = useState(0);

  const [search, setSearch] = useState({
    logId: null,
    actionType: null,
    applicationType: null,
    applicationId: null,
    fromDate: undefined,
    toDate: "",
  });

  const sortFunction = async (value) => {
    setSortUrl(null);
    //change status : loading started
    setStatus("loading");
    //setSort url with appending sort query
    setSortUrl(`${url}sort=${value}&`);
    const result = await axios.get(`${url}sort=${value}&`);

    //update data with new api call
    setData(result.data.logs);
    setTotalItem(result.data.totalItem)

    //change status : loading finished
    setStatus(null);
    console.log(result.data.length);
  };

  const getDataByPage = async (currentPage) => {
    setStatus("loading");
    let result;

    if (sortUrl) {
    //   console.log("taking sorted url");
      result = await axios.get(`${sortUrl}page=${currentPage}`);
    } else {
    //   console.log("taking url");
      result = await axios.get(`${url}page=${currentPage}`);
    }
    setData(result.data.logs);
    setTotalItem(result.data.totalItem);
    setStatus(null);
    console.log(url);
  };
  useEffect(() => {
    getDataByPage(page);
  }, [page]);


//  useEffect :  render on change in url
  useEffect(() => {
    const fetchData = async () => {
      setStatus("loading");
      const result = await axios.get(url);

      setData(result.data.logs);
      setTotalItem(result.data.totalItem);
      setStatus(null);
    };
    fetchData();
  }, [url]);

  return (
    <div className="LoggerSearchPageContainer">
      <SearchBar
        search={search}
        setSearch={setSearch}
        url={url}
        setUrl={setUrl}
      />
      <table className={"tableData" + ` ` + `${status}`}>
        <tr>
          <th className="thead">
            <label htmlFor="">LogID</label>
            <span onClick={() => sortFunction("logID")} className="sort">
              ⬇
            </span>
          </th>
          <th className="thead">
            <label htmlFor="">Application Type</label>
            <span
              onClick={() => sortFunction("applicationType")}
              className="sort"
            >
              ⬇
            </span>
          </th>
          <th className="thead">
            <label htmlFor="">Application ID </label>
            <span
              onClick={() => sortFunction("applicationId")}
              className="sort"
            >
              ⬇
            </span>
          </th>
          <th className="thead">
            <label htmlFor="">Action</label>
            <span onClick={() => sortFunction("actionType")} className="sort">
              ⬇
            </span>
          </th>
          <th className="thead">
            <label htmlFor="">Action Details</label>
            <span onClick={() => sortFunction("actionType")} className="sort">
              ⬇
            </span>
          </th>
          <th className="thead">
            <label htmlFor="">Date:Time</label>
            <span onClick={() => sortFunction("latest")} className="sort">
              ⬇
            </span>
          </th>
        </tr>

        {data?.map((log) => {
          const logId = log.logId;
          const AppType = log.applicationType;
          const AppId = log.applicationId;
          const Action = log.actionType;
          const Action_Details = log.actionType;
          const Date_Time = log.creationTimestamp;

          return (
            <tr key={logId} className="tRowData">
              <td>{logId}</td>
              <td>{AppType || <span className="notFound">-/-</span>}</td>
              <td>{AppId || <span className="notFound">-/-</span>}</td>
              <td>{Action || <span className="notFound">-/-</span>}</td>
              <td>{Action_Details || <span className="notFound">-/-</span>}</td>
              <td>{Date_Time || <span className="notFound">-/-</span>}</td>
            </tr>
          );
        })}
      </table>
      <PaginationBar page={page} setPage={setPage} totalItem={totalItem} />
    </div>
  );
};

export default LoggerSearchPage;
