const PaginationNewVersion = ({ page, total, onPage }) => {
  const totalPage = [];

  for (let i = 1; i <= total; i++) {
    totalPage.push(i);
  }

  return (
    <div className="flex h-[50px] items-center gap-4 pb-11 mt-5">
      {totalPage.map((el) => (
        <div
          onClick={() => onPage(el)}
          className={` w-8 h-8  text-[18px] flex font-semibold cursor-pointer rounded-xl ${
            page === el
              ? "bg-colorCyanMain text-gray-50"
              : "bg-gray-300 text-black"
          } justify-center items-center text-center`}
          key={el}
        >
          {el}
        </div>
      ))}
    </div>
  );
};

export default PaginationNewVersion;
