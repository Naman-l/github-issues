import React, { useState, useEffect } from "react";

import moment from "moment";
import { FaRegDotCircle, FaCaretDown, FaRegCommentAlt } from "react-icons/fa";

import UserService from "../utils/UserService";

const Content = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [page, setPage] = useState(1);

  const loadUserList = (page) => {
    setLoading(true);
    UserService.getList(page)
      .then((res) => {
        const newPage = page + 1;

        const newList = tableData.concat(res.data);
        setTableData(newList);
        setPage(newPage);
        if (res.data.length === 0) setNoData(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (!noData) {
        loadUserList(page);
      }
    }
  };

  useEffect(() => {
    loadUserList(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   useEffect(() => {
  //     axios
  //       .get("https://api.github.com/repos/facebook/create-react-app/issues")
  //       .then((res) => {
  //         setTableData(res.data);
  //       });
  //   }, []);

  //   const getItems = async (page) => {
  //     setIsLoading(true);
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     await axios
  //       .get(
  //         `https://api.github.com/repos/facebook/create-react-app/issues?page=${page}`
  //       )
  //       .then((resp) => {
  //         setTableData([...tableData, ...resp.data]);
  //         setIsLoading(false);
  //       });
  //   };

  //   useEffect(() => {
  //     window.addEventListener("scroll", handleScroll);
  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }, []);

  //   function handleScroll() {
  //     if (
  //       window.innerHeight + document.documentElement.scrollTop !==
  //         document.documentElement.offsetHeight ||
  //       isFetching
  //     )
  //       return;
  //     setIsFetching(true);
  //   }

  //   const fetchData = () => {
  //     axios
  //       .get(
  //         `https://api.github.com/repos/facebook/create-react-app/issues?page=${page}`
  //       )
  //       .then((res) => {
  //         const result = res.data;
  //         setTableData([...tableData, ...result]);
  //         setPage((prev) => prev + 1);
  //       });
  //   };

  return (
    <div className="check">
      <div className="content">
        <span className="contentHead">
          <span className="contentcontent">
            <span>Author</span>{" "}
            <span>
              <FaCaretDown />
            </span>{" "}
          </span>
          <span className="contentcontent">
            <span>Label</span>
            <span>
              <FaCaretDown />
            </span>{" "}
          </span>
          <span className="contentcontent">
            <span>Projects</span>{" "}
            <span>
              <FaCaretDown />
            </span>{" "}
          </span>
          <span className="contentcontent">
            <span>Milestones</span>{" "}
            <span>
              <FaCaretDown />
            </span>{" "}
          </span>
          <span className="contentcontent">
            <span>Assignee</span>{" "}
            <span>
              <FaCaretDown />
            </span>
          </span>
          <span className="contentcontent">
            <span>Sort</span>
            <span>
              <FaCaretDown />
            </span>
          </span>
        </span>
        <div>
          <table style={{ width: "100%" }}>
            {tableData?.map((v) => (
              <span className="tablerowcon">
                <>
                  <tr className="tablerow1">
                    <span className="wrapper">
                      <td className="td1">
                        <span className="tableicon">
                          <FaRegDotCircle />
                        </span>
                        <span className="tabletitle">{v?.title}</span>

                        {v?.labels.map((n) => (
                          // eslint-disable-next-line no-sequences
                          <span className="outer">
                            <span className="tableissue"> {n?.name}</span>
                          </span>
                        ))}
                      </td>
                    </span>
                    <td className="tablecomments">
                      {v?.comments > 0 ? <FaRegCommentAlt size="14px" /> : ""}

                      {v?.comments > 0 ? v?.comments : ""}
                    </td>
                  </tr>
                  <tr className="tablerow2">
                    <td>
                      <span className="tablenumber">#{v?.number}</span>
                      <span className="tabletime">
                        opened {moment(v?.updated_at).fromNow()} by{" "}
                        {v?.user.login}
                      </span>
                    </td>
                  </tr>

                  <hr
                    style={{ color: "#cbd4d3", width: "100%", margin: "0px" }}
                  />
                </>
              </span>
            ))}
          </table>

          {loading ? <div className="text-center">loading data ...</div> : ""}
          {noData ? <div className="text-center">no data anymore ...</div> : ""}
        </div>
      </div>
    </div>
  );
};

export default Content;
