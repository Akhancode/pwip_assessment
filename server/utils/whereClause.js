class WhereClause {
  constructor(base, bigQ) {
    this.base = base; //current DATA
    this.bigQ = bigQ; //current Query eg. { page: '3', actiontype: '"xx"' }
  }
  //pagination
  pager(resultperpage) {
    let currentPage = 1;
    if (this.bigQ.page) {
      currentPage = this.bigQ.page;
    }

    // Calculate the start and end index of the items to display on this page
    const startIndex = (currentPage - 1) * resultperpage;
    const endIndex = startIndex + resultperpage;

    // Slice the items array to get the items for this page
    this.base = this.base.slice(startIndex, endIndex);

    return this;
  }

  filter() {
    //filter by LOG_ID
    if (this.bigQ.logID) {
      const logID = this.bigQ.logID;
      this.base = this.base.filter((log) => {
        return log.logId == logID;
      });
    }
    //filter by ACTION_TYPE
    if (this.bigQ.actionType) {
      const actionType = this.bigQ.actionType;
      this.base = this.base.filter((log) => {
        return log.actionType == actionType;
      });
    }
    //filter by APPLICATION_TYPE
    if (this.bigQ.applicationType) {
      const applicationType = this.bigQ.applicationType;
      this.base = this.base.filter((log) => {
        return log.applicationType == applicationType;
      });
    }

    //filter by APPLICATION_ID
    if (this.bigQ.applicationId) {
      const applicationId = this.bigQ.applicationId;
      this.base = this.base.filter((log) => {
        return log.applicationId == applicationId;
      });
    }
    //filter by APPLICATION_DATE
    if (this.bigQ.startDate || this.bigQ.endDate) {
      const startDate = new Date(this.bigQ.startDate);
      const endDate = new Date(this.bigQ.endDate);

      this.base = this.base.filter((log) => {
        const logDate = new Date(log.creationTimestamp);
        return logDate >= startDate && logDate <= endDate;
      });
    }

    return this;
  }

  sort() {
    if (!this.bigQ.sort) return this; //Guardian Clause for clean code

    //RECENT SORTING OLD TO NEW (DATE) using class Date
    if (this.bigQ.sort === "old") {
      this.base.sort(function (a, b) {
        return new Date(a.creationTimestamp) - new Date(b.creationTimestamp);
      });
    }
    //RECENT SORTING NEW TO OLD (DATE) using Date.parse
    if (this.bigQ.sort === "latest") {
      this.base.sort(function (a, b) {
        return (
          Date.parse(b.creationTimestamp) - Date.parse(a.creationTimestamp)
        );
      });
    }
    //sort by logID
    if (this.bigQ.sort === "logID") {
      this.base.sort(function (a, b) {
        return (
          a.logId - b.logId
        );
      });
    }
    //sort by APPLICATION ID
    if (this.bigQ.sort === "applicationId") {
      this.base.sort(function (a, b) {
        return (
          a.applicationId - b.applicationId
        );
      });
    }
    //sort by APPLICATION TYPE [string Ascending]
    if (this.bigQ.sort === "applicationType") {
      this.base.sort((a, b) => {
        if (a.applicationType < b.applicationType) {
            return -1;
        }
        if (a.applicationType > b.applicationType) {
            return 1;
        }
        return 0;
    });
    }
    //sort by ACTION TYPE [string Ascending]
    if (this.bigQ.sort === "actionType") {
      this.base.sort((a, b) => {
        if (a.actionType < b.actionType) {
            return -1;
        }
        if (a.actionType > b.actionType) {
            return 1;
        }
        return 0;
    });
    }




    return this;
  }
}

module.exports = WhereClause;
