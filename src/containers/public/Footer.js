import React from "react";
import ContactInfo from "../../components/ContactInfo";

const Footer = () => {
  const contactSections = [
    {
      country: "Việt Nam",
      email: "b2b@blueboltsoftware.com",
      address:
        "250 Nguyễn Đình Chiểu, phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh, Việt Nam",
      phone: "+84 (906) 965-737",
    },
    {
      country: "Mỹ",
      email: "daniel@blueboltsoftware.com",
      address: "7021 S Texas 6, Houston, TX 77083, Hoa Kỳ",
      phone: "+1 (832) 566-3940",
    },
    {
      country: "Nhật Bản",
      email: "son.nguyen@blueboltsoftware.com",
      address: "168-0073 東京都杉並区下高井戸1-26-3 フジミハイツ203",
      phone: "+81 090-1706-9619",
    },
    {
      country: "Úc",
      email: "johnny@blueboltsoftware.com",
      address: "Hemphill Road, Sunshine, VIC 3020, Australia",
      phone: "+61 426 791 5807",
    },
  ];
  return (
    <div className="w-full">
      <section className="py-5 mx-20">
        <div className=" mx-auto">
          <h1 className="text-[#154e8d] text-xl my-4">
            {" "}
            Kết nối với chúng tôi{" "}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {contactSections.map((section, index) => (
              <ContactInfo
                key={index}
                country={section.country}
                email={section.email}
                address={section.address}
                phone={section.phone}
              />
            ))}
          </div>
        </div>
      </section>
      <div className="bg-[#154e8d] w-full p-4">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="text-center sm:text-left text-sm text-[#f6f6f6]">
            <span className="ml-20">
              Bản quyền thuộc © BLUEBOLT SOFTWARE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
