import React from "react";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
/*
Input: 
  List of Items
  Number per page

Output: 
  the items on page
*/

const PaginateTable = ({
  items,
  count,
  onPageChange,
  currentPage,
  onClick
}) => {
  // const items = props.items;
  if (!items) return "";
  const showItems = items.slice((currentPage - 1) * count, currentPage * count);

  const addButton = (title, id) => {
    if (!onClick) return "";
    return (
      <td>
        <div
          onClick={e => {
            e.cartItem = { title, id };
            onClick(e.cartItem);
          }}
          className="table__item--button"
        >
          <FontAwesomeIcon icon={faPlusSquare} />
        </div>
      </td>
    );
  };
  // let addButton;
  // if (onClick)
  //   addButton = (
  //     <td>
  //       <div onClick={e => onClick(e)} className="table__item--button">
  //         <FontAwesomeIcon icon={faPlusSquare} />
  //       </div>
  //     </td>
  //   );

  return (
    <React.Fragment>
      {showItems.map(item => {
        return (
          <tr key={item._id} className="table__item">
            <td>{item.title}</td>
            <td>{item.description}</td>
            <td>{item.difficulty}</td>
            <td>{item.primary}</td>
            <td>{item.secondary}</td>
            {addButton(item.title, item._id)}
          </tr>
        );
      })}
    </React.Fragment>
  );
};

export default PaginateTable;
