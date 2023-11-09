import React, { memo, useEffect, useState } from "react";
import fetchApiUsers from "../../api/fetchApiAdmin/getAllUser";
import { formatDateTime } from "../../untils/fnSuppport";
const ManageUser = () => {
  const [allUser, setAllUser] = useState([]);
  const fetchUsers = async () => {
    const rs = await fetchApiUsers();
    if (rs) {
      setAllUser(rs?.users);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  console.log("allUser", allUser);
  return (
    <div className="px-[16px] mt-4">
      <div className="mb-3">
        <span>Danh sách tài khoản</span>
      </div>
      <div className="mb-4">
        <input
          onChange={(e) => {
            console.log(e.target.value);
            if (e.target.value !== "") {
              setAllUser(
                allUser.filter((item) => item?.email.includes(e.target.value))
              );
            } else {
              fetchUsers();
            }
            console.log(allUser);
          }}
          className="outline-none rounded-2xl w-[300px] h-[30px] "
          placeholder="Tìm kiếm người dùng"
        ></input>
      </div>
      <div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  #
                </th>
                <th scope="col" class="px-6 py-3">
                  Địa chỉ email
                </th>
                <th scope="col" class="px-6 py-3">
                  Tên tài khoản
                </th>
                <th scope="col" class="px-6 py-3">
                  Số điện thoại
                </th>
                <th scope="col" class="px-6 py-3">
                  Trạng thái tài khoản
                </th>
                <th scope="col" class="px-6 py-3">
                  Ngày tạo
                </th>
                <th scope="col" class="px-6 py-3">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {allUser &&
                allUser?.map((el, index) => {
                  return (
                    <tr
                      class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                      key={index}
                    >
                      <td>{index + 1}</td>
                      <td>{el?.email}</td>
                      <td>
                        {el?.firstName} {el?.lastName}
                      </td>
                      <td>{el?.phone}</td>
                      <td>{!el?.isBlocked ? "Hoạt động" : "Đã khóa"}</td>
                      <td>{formatDateTime(el?.createdAt)}</td>
                      <td className="flex gap-3">
                        <div>Xóa</div>
                        <div>Chỉnh sửa</div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default memo(ManageUser);
