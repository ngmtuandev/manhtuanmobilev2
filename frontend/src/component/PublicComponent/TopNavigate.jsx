import React from "react";

const TopNavigate = () => {
  const TopNavigate = [
    "Giới thiệu",
    "Sản phẩm đã xem",
    "Trung tâm bảo hành",
    "Tin tức",
    "Hỗ trợ",
    "Đăng nhập",
  ];
  return (
    <div className="flex flex-row justify-end gap-10 py-[10px] max-h-full">
      {TopNavigate.map((item, index) => {
        return (
          <div
            key={index}
            className="cursor-pointer hover:border-b-[1.3px]  hover:ease-in border-colorCyanDark transition 
            duration-0 hover:duration-1000"
          >
            <span>{item}</span>
          </div>
        );
      })}
    </div>
  );
};

export default TopNavigate;
