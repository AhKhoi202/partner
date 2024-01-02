import React from "react";

const ContactInfo = ({ country, email, address, phone }) => (
  <div className="col-span-1">
    <h5 className="mb-1  text-[#F2842B] text-lg font-bold">{country}</h5>
    <ul className="list-none text-[#154e8d] text-sm px-2">
      <li className="flex items-center ">
        <i className="fa fa-comment fa-fw "></i>
        <a href="/contactus" className="text-[#343A40] font-normal ">
          Liên hệ
        </a>
      </li>
      <li className="flex items-center ">
        <i className="fa fa-envelope fa-fw "></i>
        <a href={`mailto:${email}`} className="text-[#343A40] font-normal ">
          {email}
        </a>
      </li>
      <li className="flex items-center ">
        <i className="fa fa-location-arrow fa-fw"></i>
        <span className="font-normal ">{address}</span>
      </li>
      <li className="flex items-center">
        <i className="fa fa-phone fa-fw "></i>
        <span className="text-[#343A40] font-normal ">{phone}</span>
      </li>
    </ul>
  </div>
);

export default ContactInfo;
