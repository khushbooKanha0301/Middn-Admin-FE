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

function UserListTable({filteredTableBody, statusFilter}) {
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
                <td>
                {statusFilter === 'All' ? (
                  <>
                    {item.email_verified === 0 || item.email_verified === undefined || item.email_verified === false? (
                      <button className="table-btn warning">Email Unverified</button>
                    ) : item.phone_verified === 0 || item.phone_verified === undefined || item.phone_verified === false ? (
                      <button className="table-btn check-status">Mobile Unverified</button>
                    ) : item.is_banned ? (
                      <button className="table-btn danger">Banned User</button>
                    ) : (
                      <button className="table-btn succeed">Active User</button>
                    )}
                  </>
                ) : statusFilter === 'Active'  ? 
                ( 
                <> {(item.email_verified === 1 || item.email_verified === true) && (item.phone_verified === 1 || item.phone_verified === true) && <button className="table-btn succeed">Active User</button>}
                </>
                ) : statusFilter === 'Ban' ? 
                (<button className="table-btn danger">Banned User</button>) 
                : statusFilter === 'Email' ? 
                (<button className="table-btn warning">Email Unverified</button>)
                : statusFilter === 'Mobile' ? 
                (<button className="table-btn check-status">Mobile Unverified</button>) 
                : null }
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