import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../store/actions/user";
import Table from "../../components/table/Table";

const ListPartner = () => {
  const [partners, setPartners] = useState([]);
  const { customers } = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  console.log(customers);
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div className="w-full h-full">
      <Table
        data={customers}
        headerMapping={[
          { key: "name", header: "Tên" },
          { key: "phone", header: "Số điện thoại" },
        ]}
        invisibleColumns={["id", "updatedAt", "createdAt"]}
      />
    </div>
  );
};

export default ListPartner;
