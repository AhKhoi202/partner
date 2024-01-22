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
          message: "Vui lòng nhập thông tin.",
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
      case "passwordConfirmation":
        if (item[1] !== payload.password) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Xác nhận mật khẩu không trùng khớp.",
            },
          ]);
          invalids++;
        }
        break;
      case "estimatedCosts":
        if (!+item[1]) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Chi phí bạn nhập không hợp lệ.",
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
          invalids++;
        }
        break;

      default:
        break;
    }
  });
  return invalids;
};

export default validate;
