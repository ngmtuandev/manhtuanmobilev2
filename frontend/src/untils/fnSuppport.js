export const handleFormatStringToSlug = (string) => {
  return string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u030-\u036f]/g, "")
    .split(" ")
    .join("-");
  // chuyển sang chữ thường -> chuyển sang chữ không dấu => cắt hết chữ ra -> nối lại bằng dấu -
};
