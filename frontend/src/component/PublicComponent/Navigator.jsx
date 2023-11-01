import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Navigator = () => {
  // const [category, setCategory] = useState([]);
  // const fetchApiDataCategory = async () => {
  //   const dataCategory = await getApiCategory();
  //   setCategory(dataCategory?.data);
  // };
  // useEffect(() => {
  //   fetchApiDataCategory();
  // }, []);

  const { categories, isLoading } = useSelector((state) => state.app);
  // console.log("categories from redux tookit : ", categories);

  return (
    <div className="px-[12px] flex gap-14 justify-center">
      {categories?.map((item) => {
        return (
          <div
            key={item._id}
            className="cursor-pointer hover:text-colorCyanDark"
          >
            <Link to={`/products/${item?.title}`}>{item?.title}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default Navigator;
