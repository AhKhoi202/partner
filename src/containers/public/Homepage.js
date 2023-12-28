import React from "react";
import background1 from "../../assets/background1.png";
import background2 from "../../assets/background2.jpg";
import home3 from "../../assets/home3.png";
import SVGhome3 from "../../assets/home3.svg";
import profilenew from "../../assets/profilenew.jpg";
import home4 from "../../assets/home4.jpg";
import win from "../../assets/winCommerce.jpeg";
import thaco from "../../assets/thacoAuto.jpeg";
import ngsc from "../../assets/NGSC_logo.png";
import fast from "../../assets/fastboy.png";
import panasonic from "../../assets/panasonic.png";
import ogp from "../../assets/ogp.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faUsers } from "@fortawesome/free-solid-svg-icons";
import { faCodepen } from "@fortawesome/free-brands-svg-icons";
import Carousel from "../../components/Carousel";

const Homepage = () => {
  const processSteps = [
    {
      title: "Khảo Sát, Tư Vấn",
      content:
        "Các chuyên gia của BBSW sẽ tiến hành khảo sát và tư vấn cùng khách hàng để hiểu rõ nhu cầu và mục tiêu của dự án. Chúng tôi sẽ đưa ra những gợi ý và lời khuyên chuyên môn để tối ưu hóa quá trình phát triển phần mềm",
      icon: "fa-comments",
    },
    {
      title: "Lựa Chọn Công Nghệ",
      content:
        "Dựa trên yêu cầu và khả năng của dự án, chúng tôi sẽ lựa chọn công nghệ phù hợp nhất. Đội ngũ kỹ sư giàu kinh nghiệm của chúng tôi sẽ đảm bảo việc chọn công nghệ này tối ưu, đáng tin cậy và đáp ứng được yêu cầu của khách hàng",
      icon: "fa-file-code",
    },
    {
      title: "Xây Dựng Giải Pháp",
      content:
        "Chúng tôi bắt đầu xây dựng giải pháp phần mềm tùy chỉnh dựa trên yêu cầu và thiết kế đã được thống nhất. Đội ngũ kỹ sư tài năng của chúng tôi áp dụng kiến thức chuyên môn và sử dụng các phương pháp phát triển tiên tiến để tạo ra một giải pháp chất lượng cao và tương thích",
      icon: "fa-cubes",
    },
    {
      title: "Triển Khai Demo",
      content:
        "Sau khi hoàn thành phần mềm, chúng tôi triển khai phiên bản demo để khách hàng có thể trải nghiệm trực tiếp. Chúng tôi sẽ cung cấp hướng dẫn và hỗ trợ để đảm bảo khách hàng có thể tận dụng tối đa tiềm năng của sản phẩm",
      icon: "fa-check",
    },
  ];
  const statsData = [
    { number: "40++", label: "Khách Hàng" },
    { number: "90++", label: "Dự Án Đã Triển Khai" },
    { number: "100%", label: "Tỷ Lệ Tái Ký" },
    { number: "60++", label: "Nhân sự" },
    { number: "3", label: "Quốc Gia" },
  ];
  const imagesData = [
    { src: win, alt: "Image 1" },
    { src: thaco, alt: "Image 2" },
    { src: ngsc, alt: "Image 3" },
    { src: fast, alt: "Image 4" },
    { src: panasonic, alt: "Image 5" },
    { src: ogp, alt: "Image 6" },
  ];
  const StatisticItem = ({ number, label, bgColor }) => (
    <div className={`text-center p-1 ${bgColor}`}>
      <span className="text-3xl">{number}</span>
      <h6 className="text-base ">{label}</h6>
    </div>
  );
  const ProcessStep = ({ title, content, icon }) => (
    <div className="w-full lg:w-1/4 p-6 flex flex-col items-center text-center relative">
      <div className="text-3xl mb-4 flex items-center justify-center rounded-full bg-[#154e8d] p-2 text-white">
        <i
          className={`fas ${icon} w-[56px] p-3 text-2xl text-white bg-[#154e8d] rounded-full`}
        ></i>
      </div>
      <h2 className="text-xl mb-2">{title}</h2>
      <p className="text-xs">{content}</p>
    </div>
  );

  return (
    <div className="w-full">
      <section
        className="relative pt-56 text-center w-full bg-black bg-cover bg-center pb-40"
        style={{ backgroundImage: `url(${background1})` }}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>

        <div className="relative container mx-auto px-4">
          <h1 className="text-6xl font-bold text-white">
            Giải Pháp Công Nghệ Phù Hợp Nhất
          </h1>
          <p className="lead mt-4 text-white">
            Tại BLUEBOLT SOFTWARE chúng tôi tin rằng phần mềm Phù Hợp Nhất chính
            là phần mềm Tốt Nhất. Hãy để chúng tôi đồng hành cùng bạn trong hành
            trình khám phá thế giới công nghệ đầy thú vị
          </p>
          <p className="mt-4">
            <a
              href="https://blueboltsoftware.com/contactus"
              className="text-white bg-[#154e8d] border-none py-2 px-4 rounded-lg hover:bg-[#124278]"
            >
              Đặt Lịch Hẹn Với Chúng Tôi
            </a>
          </p>
        </div>
      </section>
      <section className="pt-8 pb-8 bg-none">
        <div className="container mx-auto px-4">
          <h1 className="text-center text-2xl text-[#F2842B]">
            Dịch Vụ Của BLUEBOLT SOFTWARE
          </h1>
        </div>
      </section>
      <section className="pt-0 pb-12 bg-none">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/3 text-center py-0 px-3">
              <FontAwesomeIcon
                icon={faCodepen}
                className=" p-8 mb-3 text-4xl text-white bg-[#154e8d] rounded-lg"
              />
              <h3 className="text-lg text-[#154e8d] mb-2">
                Xây Dựng Phần Mềm, Ứng Dụng Theo Yêu Cầu
              </h3>
              <p className="text-sm text-gray-700 bg-o-color-3">
                Xây dựng các ứng dụng Mobile App, Web App, Game, Blockchain,
                IOT, Ai .. theo yêu cầu
              </p>
            </div>
            <div className="w-full lg:w-1/3 text-center py-0 px-3">
              <FontAwesomeIcon
                icon={faBuilding}
                className=" p-8 mb-3 aspect-square text-4xl text-white bg-[#154e8d] rounded-lg"
              />
              <h3 className="text-lg text-[#154e8d] mb-2">
                Triển Khai Hệ Thống Quản Trị Doanh Nghiệp
              </h3>
              <p className="text-sm text-gray-700 bg-o-color-3">
                Tư vấn xây dựng, triển khai các hệ thống quản trị doanh nghiệp
                như CRM, ERP, WMS, DMS, HRM..
              </p>
            </div>
            <div className="w-full lg:w-1/3 text-center py-0 px-3">
              <FontAwesomeIcon
                icon={faUsers}
                className=" p-8 mb-3 text-4xl text-white bg-[#154e8d] rounded-lg"
              />
              <h3 className="text-lg text-[#154e8d] mb-2">
                Cho Thuê Nhân Sự Công Nghệ Chất Lượng Cao
              </h3>
              <p className="text-sm text-gray-700 bg-o-color-3">
                Cho thuê đội ngũ nhân sự công nghệ trình độ cao với đa dạng hình
                thức làm việc như Onsite, Offsite, Remote..
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="text-white bg-black-50 pt-8 pb-12 relative">
        <span
          className="absolute inset-0 bg-cover bg-fixed"
          style={{ backgroundImage: `url(${background2})` }}
        ></span>
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        ></div>
        <div className="container mx-auto px-4 relative">
          <h1 className="text-center text-4xl font-bold mt-4">
            Xây Dựng Phiên Bản Dùng Thử Miễn Phí
          </h1>
          <p className="text-center text-lg m-4">
            Chúng tôi xây dựng phiên bản dùng thử miễn phí cho khách hàng. Chúng
            tôi tin rằng trải nghiệm thực tế sẽ giúp khách hàng đánh giá chính
            xác sự hiệu quả và chất lượng sản phẩm phần mềm của chúng tôi.
          </p>
          <p className="text-center">
            <a
              href="https://blueboltsoftware.com/contactus"
              className="text-white bg-[#154e8d] border-none py-2 px-4 rounded-lg hover:bg-[#124278]"
            >
              Liên hệ
            </a>
          </p>
        </div>
      </section>
      <section className="py-6 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center">
            {processSteps.map((step, index) => (
              <ProcessStep
                key={index}
                title={step.title}
                content={step.content}
                icon={step.icon}
                // isLast={index === processSteps.length - 1}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="flex flex-col md:flex-row items-center bg-white bg-cover ">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-1/2 ">
              <div className="relative mx-auto">
                <img
                  src={home3}
                  alt={"Descriptive Alt Text"}
                  className="mx-auto lazy"
                  loading="lazy"
                />
                <img
                  src={SVGhome3}
                  alt="Overlay Alt Text"
                  className="absolute top-0 left-0 h-full w-full"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 pl-8">
              <h2 className="text-4xl text-[#154e8d] pb-4">Công Nghệ</h2>
              <p className="text-sm mb-4">
                Với sự am hiểu hơn 50 nền tảng, ngôn ngữ công nghệ. Chúng tôi tự
                tin sẽ đem đến cho khách hàng giải pháp công nghệ phù hợp nhất.
              </p>
              <p className="h-4 m-4"></p>
              <a
                href="https://blueboltsoftware.com/contactus"
                className="text-white bg-[#154e8d] border-none py-2 px-4 rounded-lg hover:bg-[#124278]"
              >
                Khám phá thêm
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="py-6 bg-[#f5f5f5]">
        <div className="container mx-auto px-24">
          <div className="grid grid-cols-5">
            {statsData.map((step, index) => (
              <StatisticItem
                key={index}
                number={step.number}
                label={step.label}
                bgColor={index % 2 === 0 ? "text-[#154e8d]" : "text-[#F2842B]"}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="py-0 bg-white">
        <div className="container px-28 mx-auto">
          <div className="grid grid-cols-6 justify-center">
            {imagesData.map((image, index) => (
              <div key={index} className="   m-auto">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-44 h-28 object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="relative">
        <div>
          <Carousel
            backgroundImage={home4}
            quote="Tại BLUEBOLT SOFTWARE, chúng tôi luôn hướng đến sự thành công của Khách Hàng, Đối Tác và Nhân Viên. Mọi hành động của chúng tôi được dẫn dắt bởi 3 sự cam kết đó là S.M.A.R.T - Quality - Commit"
            detail="(Specific- Measurable- Achievable- Relevant- Time-bound)"
            author="Đạt Lê "
            position={"CEO BBSW"}
            authorImage={profilenew}
          />
        </div>
      </section>
    </div>
  );
};

export default Homepage;
