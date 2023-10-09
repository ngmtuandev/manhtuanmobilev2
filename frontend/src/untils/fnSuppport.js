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
  const stars = []
  for (let i=0; i<= +star; i++) stars.push(<AiFillStar color="yellow"></AiFillStar>)
  for (let i=5; i> +star; i--) stars.push(<AiOutlineStar></AiOutlineStar>)
  return stars
}

export const formatMoney = (monney) => {
  return Number(monney.toFixed(1)).toLocaleString()
}