import React, { useState, useEffect } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { update } from "../../../services/contact-service";
import { get } from "../../../services/contact-service";

const initialContactState = {
  firstname: "",
  lastname: "",
  phonenumber: "",
};

export function EditContact() {
  let { id } = useParams();
  const [currentContact, setCurrentContact] = useState(initialContactState);
  const [submitted, setSubmitted] = useState(false);

  const fetchCurrentContact = (id) => {
    get(id)
      .then((response) => {
        setCurrentContact(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchCurrentContact(id);
  }, [id]);

  const phoneControl = (value) => {
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, "");
    const cvLength = currentValue.length;
    if (cvLength < 3) return currentValue;
    if (cvLength < 5) {
      return `${currentValue.slice(0, 2)} ${currentValue.slice(2)}`;
    }
    return `${currentValue.slice(0, 2)} ${currentValue.slice(
      2,
      4
    )} ${currentValue.slice(4, 10)}`;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const value2 = name === "phonenumber" ? phoneControl(value) : value;
    setCurrentContact({ ...currentContact, [name]: value2 });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      currentContact.firstname &&
      currentContact.lastname &&
      currentContact.phonenumber
    ) {
      update(id, currentContact)
        .then((response) => {
          console.log(response);
          window.history.back();
        })
        .catch((e) => {
          console.log(e);
        });
    }
    setSubmitted(true);
  };

  return (
    <>
      <div className="mx-auto max-w-2xl">
        <div className="mt-10">
          <h5 className="text-xl text-center">Edit contact</h5>
        </div>
        <form className="p-10 shadow w-full my-6 space-y-8 bg-white">
          <div>
            <label className="label">Firstname</label>
            <input
              type="text"
              className="form-field"
              id="first-name"
              name="firstname"
              autocomplete="off"
              value={currentContact.firstname}
              onChange={handleInputChange}
            />
            {submitted && !currentContact.firstname && (
              <span id="first-name-error" className="error">
                Please enter a first name
              </span>
            )}
          </div>
          <div>
            <label className="label">Lastname</label>
            <input
              type="text"
              className="form-field"
              id="last-name"
              name="lastname"
              autocomplete="off"
              value={currentContact.lastname}
              onChange={handleInputChange}
            />
            {submitted && !currentContact.lastname && (
              <span id="last-name-error" className="error">
                Please enter a last name
              </span>
            )}
          </div>

          <div>
            <label className="label">Phone Number</label>
            <div className="relative flex w-full flex-wrap items-stretch mb-3">
              <span className="icon-input">+</span>
              <input
                type="text"
                className="form-field border border-gray-300 px-12 py-2 w-full focus:outline-none relative outline-none focus:shadow-outline"
                id="phonenumber"
                name="phonenumber"
                autocomplete="off"
                value={currentContact.phonenumber}
                onChange={handleInputChange}
              />
            </div>
            {submitted && !currentContact.phonenumber && (
              <span id="phonenumber-error" className="error">
                Please enter a phone number
              </span>
            )}
          </div>

          <input
            className="btn btn-lg btn-primary text-center"
            value="Update"
            onClick={handleSubmit}
          />
        </form>
        <div className="text-center">
          <RouterLink to="/" className="text-orange">
            All contacts
          </RouterLink>
        </div>
      </div>
    </>
  );
}
