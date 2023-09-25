import getApiCategory from "../../api/getApi";
import { useEffect, useState } from "react";
const Navigator = () => {
  const [category, setCategory] = useState([]);
  const fetchApiDataCategory = async () => {
    const dataCategory = await getApiCategory();
    setCategory(dataCategory?.data);
  };
  useEffect(() => {
    fetchApiDataCategory();
  }, []);
  // console.log(category);
  return (
    <div className="px-[12px] flex gap-14 justify-center">
      {category?.map((item) => {
        return <div key={item._id}>{item?.title}</div>;
      })}
    </div>
  );
};

export default Navigator;
