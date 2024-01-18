import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../../store/actions/project";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";

const ProjectDetail = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const projectId = searchParams.get("projectId");
  const { projects } = useSelector((state) => state.allProjects);
  const dispatch = useDispatch();
  console.log(projects);

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  const project = projects.find((project) => project.id === projectId);
  console.log(project);


  return (
    <div class="bg-gray-100 p-4">
      <div class="border-1 shadow-lg shadow-gray-700 rounded-lg">
        {/* <!-- top content --> */}
        <div class="flex rounded-t-lg bg-top-color sm:px-2 w-full">
          <div class="w-full font-bold text-3xl sm:text-center pl-5 mt-10 text-center">
            {project.name}
          </div>
        </div>

        {/* <!-- main content --> */}
        <div class="p-5">
          <div class="flex flex-col sm:flex-row sm:mt-10">
            <div class="flex flex-col sm:w-1/3">
              {/* <!-- My contact --> */}
              <div class="py-3 sm:order-none order-1">
                <h2 class="text-lg font-poppins font-bold text-top-color">
                  Khách hàng
                </h2>
                <div class="border-2 w-20 border-top-color my-2"></div>

                <div>
                  <div class="flex items-center my-1">
                    <div class="">{project.customer.name}</div>
                  </div>
                  <div class="flex items-center my-1">
                    <div>{project.customer.email}</div>
                  </div>
                  <div class="flex items-center my-1">
                    <div>{project.customer.phone}</div>
                  </div>
                  <div class="flex items-center my-1">
                    <div></div>
                  </div>
                </div>
              </div>
              {/* <!-- Skills --> */}
              <div class="py-3 sm:order-none order-2">
                <h2 class="text-lg font-poppins font-bold text-top-color">
                  Partner
                </h2>
                <div class="border-2 w-20 border-top-color my-2"></div>
                <div>
                  <div class="flex items-center my-1">
                    <div>{project.user.name}</div>
                  </div>
                  <div class="flex items-center my-1">
                    <div>{project.user.email}</div>
                  </div>
                  <div class="flex items-center my-1">
                    <div>{project.user.phone}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-col sm:w-2/3 order-last sm:order-none sm:-mt-10">
              <div class="py-3">
                <h2 class="text-lg font-poppins font-bold text-top-color">
                  Mô tả
                </h2>
                <div class="border-2 w-20 border-top-color my-2"></div>
                <p>{project.description}</p>
              </div>

              <div class="py-3">
                <h2 class="text-lg font-poppins font-bold text-top-color">
                  Chi phí
                </h2>
                <div class="border-2 w-20 border-top-color my-2"></div>
                <div class="flex flex-col">
                  <div class="flex flex-row">
                    <p class="pr-5">Dự kiến:</p>
                    <p class="">{project.expectedRevenue}</p>
                  </div>
                  <div class="flex flex-row">
                    <p class="pr-5">Thực lãnh:</p>
                    <p class="">{project.actualRevenue}</p>
                  </div>
                </div>
              </div>
              <div class="py-3">
                <h2 class="text-lg font-poppins font-bold text-top-color">
                  Ngày nhận thông tin dự án
                </h2>
                <div class="border-2 w-20 border-top-color my-2"></div>
                <p>{format(new Date(project.createdAt), "dd/MM/yyyy")}</p>
              </div>
              <div class="py-3">
                <h2 class="text-lg font-poppins font-bold text-top-color">
                  Tiến độ dự án
                </h2>
                <div class="border-2 w-20 border-top-color my-2"></div>
                <div class="flex flex-row">
                  <p class="pr-5">
                    {format(new Date(project.createdAt), "dd/MM/yyyy")}
                  </p>
                  <p class="">Đã liên hệ với khách hàng</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
