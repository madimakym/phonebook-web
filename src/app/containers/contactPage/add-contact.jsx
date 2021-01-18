import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { create } from "../../../services/contact-service";

export function AddContact() {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    create(data)
      .then((response) => {
        console.log(response);
        window.history.back();
      })
      .catch((e) => {
        console.log(e);
        setStatus("failed");
      });
  };

  const [phonenumber, setPhonenumber] = useState("");
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
    )} ${currentValue.slice(4)}`;
  };
  const handleChange = ({ target: { value } }) => {
    setPhonenumber(phoneControl(value));
  };

  return (
    <>
      <div className="mx-auto max-w-2xl">
        <div className="mt-10">
          <h5 className="text-xl text-center">New contact</h5>
        </div>
        {status === "failed" ? { message } : null}
        <form
          className="p-10 shadow w-full my-6 space-y-8 bg-white"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="label">Firstname</label>
            <input
              className="input"
              type="text"
              name="firstname"
              id="firstname"
              ref={register({ required: true })}
            />
            {errors.firstname && (
              <span className="error">This field is required</span>
            )}
          </div>

          <div>
            <label className="label">Lastname</label>
            <input
              className="input"
              type="text"
              name="lastname"
              id="lastname"
              ref={register({ required: true })}
            />
            {errors.lastname && (
              <span className="error">This field is required</span>
            )}
          </div>

          <div>
            <label className="label">Phone Number</label>
            <div className="relative flex w-full flex-wrap items-stretch mb-3">
              <span className="icon-input">+</span>

              <input
                className="border border-gray-300 px-12 py-2 w-full focus:outline-none relative outline-none focus:shadow-outline"
                type="text"
                name="phonenumber"
                id="phonenumber"
                placeholder=""
                value={phonenumber}
                onChange={handleChange}
                ref={register({ required: true })}
              />
            </div>
            {errors.phonenumber && (
              <span className="error">This field is required </span>
            )}
          </div>
          <div>
            <input
              type="submit"
              value="Create"
              className="btn btn-lg btn-primary"
            />
          </div>
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
