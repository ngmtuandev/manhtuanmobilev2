import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import icons from "../../untils/icons";

const {
  MdOutlineHeadphones,
  FiWatch,
  FaComputer,
  IoPhonePortraitOutline,
  AiOutlineApple,
  IoHomeOutline,
  MdComputer,
  MdAutoFixOff,
  LuMonitorSmartphone,
  RiComputerLine,
} = icons;

const iconsCategory = [
  <FiWatch size={20}></FiWatch>,
  <IoPhonePortraitOutline size={20}></IoPhonePortraitOutline>,
  <FaComputer size={20}></FaComputer>,
  <MdOutlineHeadphones size={20}></MdOutlineHeadphones>,
  <RiComputerLine size={20}></RiComputerLine>,
  <MdComputer size={20}></MdComputer>,
  <LuMonitorSmartphone size={20}></LuMonitorSmartphone>,
  <MdAutoFixOff size={20}></MdAutoFixOff>,
  <AiOutlineApple size={20}></AiOutlineApple>,
  <IoHomeOutline size={20}></IoHomeOutline>,
];
const Navigator = () => {
  const { categories, isLoading } = useSelector((state) => state.app);
  return (
    <div className="px-[12px] h-[50px] items-center flex gap-14 justify-center">
      {categories?.map((item, index) => {
        return (
          <div
            key={item._id}
            className="flex-col justify-center text-center content-center items-center cursor-pointer font-serif "
          >
            <div className="justify-center hover:text-colorCyanMain flex">
              {" "}
              {iconsCategory[index]}
            </div>
            <div className="hover:text-colorCyanMain">
              <Link to={`/products/${item?.title}`}>{item?.title}</Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Navigator;
