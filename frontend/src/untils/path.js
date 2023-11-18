const path = {
  HOME: "",
  PUBLIC: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  PRODUCTS: "/products",
  BLOGS: "/blogs",
  OURSERVICES: "/our-services",
  FAQS: "/faqs",
  INTRODUCTE: "/intrordcude",
  NEWPAPER: "/newpaper",
  PRODUCTS__CATEGORY: "/products/:category",
  PRODUCT_CATEGORY__ID__NAME: "/:category/:id/:name",

  // Path Admin

  PUBLIC_ADMIN: "/public-admin",
  HOME_ADMIN: "/home-admin",
  DASBOARD_ADMIN: "/dasboard",
  MANAGE_USER_ADMIN: "/manage-user",
  CREATE_PRODUCT_ADMIN: "/create-product",
  MANAGE_PRODUCT_ADMIN: "/manage-product",
  MANAGE_ORDER: "/manage-order-admin",

  // Path Member
  PUBLIC_MEMBER: "/public-member",
  HOME_MEMBER: "/home-member",
  MANAGE_USER_MEMBER: "/manage-user",
  MANAGE_CART_MEMBER: "/manage-cart",
  MANAGE_BUY_HISTORY_MEMBER: "/manage-history-buy",
  MANAGE_WHITELIST_MEMBER: "/manage-whitelist",

  PAYMENT: "/payment",
};

export default path;
