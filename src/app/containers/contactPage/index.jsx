import React, { useEffect, useState } from "react";
import { ListContacts } from "./list-contact";

export function Contact() {
  return (
    <>
      <div className="container mx-auto">
        <div className="mx-auto max-w-2xl">
          <div className="mt-10 text-center">
            <h5 className="text-xl">All Contacts</h5>
          </div>
        </div>
        <br></br>
        <ListContacts />
      </div>
    </>
  );
}
