import React from "react";
import Button from "../Button";

const RowReadOnly = ({ customers, handleEditClick }) => {
  return (
    <tr className="bg-cyan-200">
      <td className="border border-slate-600">{customers.name}</td>
      <td className="border border-slate-600">{customers.phone}</td>
      <td className="border border-slate-600">{customers.email}</td>
      <td className="border border-slate-600">{customers.note}</td>
      <td className="border border-slate-600">
        <Button text="Sua" onClick={(event) => handleEditClick(event, customers)}  />
      </td>
    </tr>
  );
};

export default RowReadOnly;
