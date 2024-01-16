import React from 'react'
import Desktop from "../../assets/images/Desktop.svg";

import { Link } from 'react-router-dom';
import { getCurrencyFormattedPrice } from '../../utils';

const tablehead = [
    "User",
    "Email",
    "Phone",
    "Joined at",
    "Balance",
    "Status",
    "Action",
  ];   

function UserListTable({filteredTableBody}) {
  return (
    <div className="common-table overflow-x-auto">
      <table className="w-[900px] xl:w-full">
        <thead>
          <tr>
            {tablehead.map((item, index) => (
              <th className="text-white text-center text-xs font-bold leading-5 py-[18px] px-[10px] align-middle w-[12.5%] bg-[#18191D]"
                key={index}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredTableBody.map((item, index) => (
            <tr key={index}>
                <td>{item.fname} {item.lname}</td>
                <td className='user-email'>{item.email}</td>
                <td>{item.phoneCountry}{item.phone}</td>
                <td>{item.joined_at}</td>
                <td>{getCurrencyFormattedPrice(0)}</td>
                <td>{item.is_banned ? 
                  <button className="table-btn danger">Banned User</button>
                : <button className="table-btn succeed">Active User</button>}
                </td>
                  
                <td>
                  <Link className="action" to={`/userdetails/${item._id}`}>
                    <img src={Desktop} alt="" /> Detail
                  </Link>
                </td>
            </tr>
          ))}
          {!filteredTableBody.length && 
              <tr>
                <td></td>
                <td colSpan={5} className="text-center">You haven't any user records</td>
                <td></td>
              </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default UserListTable