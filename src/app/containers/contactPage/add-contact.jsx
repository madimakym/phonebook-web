import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { create } from "../../../services/contact-service";

const initialContactState = {
  firstname: "",
  lastname: "",
  phonenumber: "",
};

export function AddContact() {
  const [contact, setContact] = useState(initialContactState);
  const [submitted, setSubmitted] = useState(false);

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
    setContact({ ...contact, [name]: value2 });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (contact.firstname && contact.lastname && contact.phonenumber) {
      create(contact)
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
          <h5 className="text-xl text-center">New contact</h5>
        </div>
        <form
          className="p-10 shadow w-full my-6 space-y-8 bg-white"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="label">Firstname</label>
            <input
              id="first-name"
              className="form-field"
              type="text"
              name="firstname"
              autocomplete="off"
              value={contact.firstname}
              onChange={handleInputChange}
            />
            {submitted && !contact.firstname && (
              <span id="first-name-error" className="error">
                Please enter a first name
              </span>
            )}
          </div>
          <div>
            <label className="label">Lastname</label>
            <input
              id="last-name"
              className="form-field"
              type="text"
              name="lastname"
              autocomplete="off"
              value={contact.lastname}
              onChange={handleInputChange}
            />
            {submitted && !contact.lastname && (
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
                id="phonenumber"
                autocomplete="off"
                className="form-field border border-gray-300 px-12 py-2 w-full focus:outline-none relative outline-none focus:shadow-outline"
                type="text"
                placeholder=""
                name="phonenumber"
                value={contact.phonenumber}
                onChange={handleInputChange}
              />
            </div>
            {submitted && !contact.phonenumber && (
              <span id="phonenumber-error" className="error">
                Please enter a phone number
              </span>
            )}
          </div>
          <button className="btn btn-lg btn-primary" type="submit">
            Register
          </button>
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
