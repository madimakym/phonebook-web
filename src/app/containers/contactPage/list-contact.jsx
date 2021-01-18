import React, { useEffect, useState } from "react";
import { Link } from "../../components/Link";
import { getAll } from "../../../services/contact-service";

export function ListContacts() {
  const [contacts, setContacts] = useState([]);
  const fetchContacts = () => {
    getAll()
      .then((response) => {
        setContacts(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <>
      <Link
        to="/contact/add"
        label="New contact"
        className="btn btn-sm btn-primary"
      />
      <table className="table">
        <tbody>
          <tr className="border-b">
            <th className="thead">FirstName</th>
            <th className="thead">LastName</th>
            <th className="thead">PhoneNumber</th>
            <th className="thead">Action</th>
          </tr>
          {contacts &&
            contacts.map((item, index) => (
              <tr className="trow" key={index}>
                <td className="tcol">{item.firstname}</td>
                <td className="tcol">{item.lastname}</td>
                <td className="tcol">
                  {item.phonenumber ? "+" + item.phonenumber : ""}
                </td>
                <td className="tcol flex justify-end">
                  <Link to="/contact/add" label="Edit" className="link" />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
