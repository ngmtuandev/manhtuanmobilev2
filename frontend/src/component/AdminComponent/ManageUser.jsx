import React, { memo, useEffect, useState } from "react";
import fetchApiUsers from "../../api/fetchApiAdmin/getAllUser";
import { formatDateTime } from "../../untils/fnSuppport";
import InputForm from "./hook-form/InputForm";
import { useForm } from "react-hook-form";
import fetchEditUsers from "../../api/fetchApiAdmin/editUser";
import swal from "sweetalert";
import fetchDeleteUsers from "../../api/fetchApiAdmin/deleteUser";

const ManageUser = () => {
  const [allUser, setAllUser] = useState([]);
  const [editUser, setEditUser] = useState("");
  const [update, setUpdate] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    isBlocked: "",
  });

  const fetchUsers = async () => {
    const rs = await fetchApiUsers();
    if (rs) {
      setAllUser(rs?.users);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [update]);
  // console.log("allUser", allUser);
  // console.log("editUser >>>", editUser);

  const handleEditUser = async () => {
    const data = getValues();
    // console.log("{ ...data, id: editUser?._id }", {
    //   ...data,
    //   id: editUser?._id,
    // });
    const rs = await fetchEditUsers({ ...data, id: editUser?._id });

    if (++rs.status === 2) {
      setEditUser("");
      swal({
        title: "Cập nhập người dùng thành công",
        icon: "success",
      });
      setUpdate(!update);
    }
  };

  const handleDeleteUser = (id) => {
    // console.log("id delete : ", id);
    swal("Bạn có chắc muốn xóa người dùng này ?").then(async () => {
      await fetchDeleteUsers(id);
      setUpdate(!update);
    });
  };

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
            // console.log(allUser);
          }}
          className="outline-none rounded-sm w-[300px] h-[30px] "
          placeholder="Tìm kiếm người dùng"
        ></input>
      </div>
      <div>
        <button onClick={handleSubmit(handleEditUser)}>Cập nhập</button>
        <form>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="text-center" scope="col" class="px-6 py-3">
                    #
                  </th>
                  <th className="text-center" scope="col" class="px-6 py-3">
                    Địa chỉ email
                  </th>
                  <th className="text-center" scope="col" class="px-6 py-3">
                    Tên tài khoản
                  </th>
                  <th className="text-center" scope="col" class="px-6 py-3">
                    Tên cuối tài khoản
                  </th>
                  <th className="text-center" scope="col" class="px-6 py-3">
                    Số điện thoại
                  </th>
                  <th className="text-center" scope="col" class="px-6 py-3">
                    Trạng thái
                  </th>
                  <th className="text-center" scope="col" class="px-6 py-3">
                    Ngày tạo
                  </th>
                  <th className="text-center" scope="col" class="px-6 py-3">
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
                        <td>
                          {el?._id === editUser?._id ? (
                            <InputForm
                              register={register}
                              errors={errors}
                              defaultValue={editUser?.email}
                              id={"email"}
                              validate={{
                                required: "Trường này không được bỏ trống",
                              }}
                            ></InputForm>
                          ) : (
                            el?.email
                          )}
                        </td>
                        <td>
                          {el?._id === editUser?._id ? (
                            <InputForm
                              register={register}
                              errors={errors}
                              defaultValue={editUser?.firstName}
                              id={"firstName"}
                              validate={{
                                required: "Trường này không được bỏ trống",
                              }}
                            ></InputForm>
                          ) : (
                            el?.firstName
                          )}
                        </td>
                        <td>
                          {el?._id === editUser?._id ? (
                            <InputForm
                              register={register}
                              errors={errors}
                              defaultValue={editUser?.lastName}
                              id={"lastName"}
                              validate={{
                                required: "Trường này không được bỏ trống",
                              }}
                            ></InputForm>
                          ) : (
                            el?.lastName
                          )}
                        </td>
                        <td>
                          {el?._id === editUser?._id ? (
                            <InputForm
                              register={register}
                              errors={errors}
                              defaultValue={editUser?.phone}
                              id={"phone"}
                              validate={{
                                required: "Trường này không được bỏ trống",
                              }}
                            ></InputForm>
                          ) : (
                            el?.phone
                          )}
                        </td>
                        <td>{!el?.isBlocked ? "Hoạt động" : "Đã khóa"}</td>
                        <td>{formatDateTime(el?.createdAt)}</td>
                        <td className="flex gap-3">
                          <div
                            className="cursor-pointer"
                            onClick={() => handleDeleteUser(el?._id)}
                          >
                            Xóa
                          </div>
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              setEditUser(el);
                            }}
                          >
                            Chỉnh sửa
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(ManageUser);
