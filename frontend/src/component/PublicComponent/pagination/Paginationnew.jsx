const Paginationnew = ({ page, total, onPage }) => {
  const totalPage = [];

  for (let i = 1; i <= total; i++) {
    totalPage.push(i);
  }

  return (
    <div className="flex pb-11 mt-5">
      {totalPage.map((el) => (
        <div
          onClick={() => onPage(el)}
          className={`mx-4 w-8 h-8 text-gray-900 text-[18px] cursor-pointer rounded-xl ${
            page === el ? "bg-gray-300" : "bg-gray-500"
          } justify-center items-center text-center`}
          key={el}
        >
          {el}
        </div>
      ))}
    </div>
  );
};

export default Paginationnew;
