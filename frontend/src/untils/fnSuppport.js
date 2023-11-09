import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export const handleFormatStringToSlug = (string) => {
  return string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u030-\u036f]/g, "")
    .split(" ")
    .join("-");
  // chuyển sang chữ thường -> chuyển sang chữ không dấu => cắt hết chữ ra -> nối lại bằng dấu -
};

export const renderStarProduct = (star) => {
  const stars = [];
  for (let i = 0; i < +star; i++)
    stars.push(<AiFillStar size={22} color="yellow"></AiFillStar>);
  for (let i = 5; i > +star; i--)
    stars.push(<AiOutlineStar size={22}></AiOutlineStar>);
  return stars;
};

export const formatMoney = (monney) => {
  return Number(monney?.toFixed(1)).toLocaleString();
};

export const formatPrice = (number) => {
  return Math.round(number / 1000) * 1000;
};

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const formatDateTime = (dateString) => {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const formattedDate = new Date(dateString).toLocaleDateString(
    "en-US",
    options
  );
  return formattedDate;
};
