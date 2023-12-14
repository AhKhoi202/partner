const isPhoneZero = (phoneNumber) => {
  return phoneNumber.charAt(0) === "0";
};


const validate = (payload, setInvalidFields) => {
  let invalids = 0;
  let fields = Object.entries(payload);
  fields.forEach((item) => {
    if (item[1] === "") {
      setInvalidFields((prev) => [
        ...prev,
        {
          name: item[0],
          message: "Bạn không được bỏ trống trường này.",
        },
      ]);
      invalids++;
    }
  });
  fields.forEach((item) => {
    switch (item[0]) {
      // case "name":
      //   if (/^[a-zA-Z\s]+$/.item[1]) {
      //     setInvalidFields((prev) => [
      //       ...prev,
      //       {
      //         name: item[0],
      //         message: "Tên người dùng không hợp lệ.",
      //       },
      //     ]);
      //     invalids++;
      //   }
      //   break;
      case "password":
        if (item[1].length < 6) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Mật khẩu phải có tối thiểu 6 kí tự.",
            },
          ]);
          invalids++;
        }
        break;
      case "phone":
        if (
          !/^\d+$/.test(item[1]) ||
          item[1].length !== 10 ||
          !isPhoneZero(item[1])
        ) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Số điện thoại không hợp lệ.",
            },
          ]);
          invalids++;
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(item[1])) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Địa chỉ email không hợp lệ",
            },
          ]);
        }
        break;

      default:
        break;
    }
  });
  return invalids;
};

export default validate;
