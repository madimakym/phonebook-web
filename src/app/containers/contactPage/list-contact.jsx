import React, { useEffect, useState } from "react";
import { Link } from "../../components/Link";
import {
  getAll,
  findByKey,
  deleteById,
} from "../../../services/contact-service";

export function ListContacts() {
  const [contacts, setContacts] = useState([]);
  const [loader, setLoader] = useState(true);
  const fetchContacts = () => {
    getAll()
      .then((response) => {
        setContacts(response.data);
        setLoader(false);
      })
      .catch((e) => {
        console.log(e);
        setLoader(false);
      });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSearch = (event) => {
    const { value } = event.target;
    if (value) {
      findByKey(value)
        .then((response) => {
          setContacts(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      fetchContacts();
    }
  };

  const deleteContact = (id) => {
    if (window.confirm("Are you sure to delete this contact?")) {
      deleteById(id)
        .then(() => {
          fetchContacts();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <>
      <div className="flex justify-between ">
        <div>
          <Link
            to="/contact/add"
            label="New contact"
            className="btn btn-sm btn-primary"
          />
        </div>

        <div>
          <form>
            <div>
              <input
                id="first-name"
                className="form-field"
                placeholder="Search"
                autocomplete="off"
                type="text"
                name="firstname"
                onChange={handleSearch}
              />
            </div>
          </form>
        </div>
      </div>

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
                  <Link
                    to={{ pathname: `/contact/edit/${item.id}` }}
                    label="Edit"
                    className=""
                  />
                  <button
                    className="ml-5 text-red-500"
                    onClick={() => deleteContact(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {loader ? (
        <div className="text-center mt-10 text-1xl"> Loading... </div>
      ) : null}
    </>
  );
}
