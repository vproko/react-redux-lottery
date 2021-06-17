import React, { useEffect } from "react";

const Pagination = ({ pages, index, getUsers, identify }) => {
  const navigation = (() => {
    const items = [];

    if (pages === 3)
      items.push(<li id="page-2" className="page-item mx-1 px-4" value="2" onClick={(e) => getUsers(e)}>2</li>);

    if (pages > 3 && pages <= 5) {
      for (let i = 2; i <= (pages - 1); i++) {
        items.push(<li id={`page-${i}`} className="page-item mx-1 px-4" value={i} onClick={(e) => getUsers(e)}>{i}</li>);
      }
    }

    if (index === 1 && pages > 5) {
      for (let i = (index + 1); i <= (index + 3); i++) {
        items.push(<li id={`page-${i}`} className="page-item mx-1 px-4" value={i} onClick={(e) => getUsers(e)}>{i}</li>);
      }
    }

    if (index === 2 && pages > 5) {
      for (let i = index ; i <= (index + 2); i++) {
        items.push(<li id={`page-${i}`} className="page-item mx-1 px-4" value={i} onClick={(e) => getUsers(e)}>{i}</li>);
      }
    }

    if ((((index - 1) > 1 ) && ((index + 1) < pages)) && pages > 5) {
      for (let i = (index - 1); i <= (index + 1); i++) {
        items.push(<li id={`page-${i}`} className="page-item mx-1 px-4" value={i} onClick={(e) => getUsers(e)}>{i}</li>);
      }
    }

    if (((index + 1) === pages) && pages > 5) {
      for (let i = (index - 2); i <= index; i++) {
        items.push(<li id={`page-${i}`} className="page-item mx-1 px-4" value={i} onClick={(e) => getUsers(e)}>{i}</li>);
      }
    }

    if (index === pages && pages > 5) {
      for (let i = (index - 3); i < index; i++) {
        items.push(<li id={`page-${i}`} className="page-item mx-1 px-4" value={i} onClick={(e) => getUsers(e)}>{i}</li>);
      }
    }

    return (
      <React.Fragment>
        <li id="page-first" className="page-item mx-1 px-4" value="1" onClick={(e) => getUsers(e)}>FIRST</li>
          { items.length > 0 ? items : null }
        <li id="page-last" className="page-item mx-1 px-4" value={pages} onClick={(e) => getUsers(e)}>LAST</li>
      </React.Fragment>
    )
  })();

  useEffect(() => {
    if(document.getElementById(identify) !== null) document.getElementById(identify).classList.add("active");
  }, [identify])

  return (
    <nav aria-label="Page navigation example" className="table-pagination">
      <ul className="pagination justify-content-center">
        { navigation }
      </ul>
    </nav>
  )
};

export default Pagination;
