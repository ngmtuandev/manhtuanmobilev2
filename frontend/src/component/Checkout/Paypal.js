import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useEffect } from "react";
import fetchCreateOrder from "../../api/apiOrder/fetchCreateOrder";

const style = { layout: "vertical" };

// function createOrder({ data, actions }) {
//   // replace this url with your server

// }
// function onApprove(data) {
//   // replace this url with your server
//   return fetch(
//     "https://react-paypal-js-storybook.fly.dev/api/paypal/capture-order",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         orderID: data.orderID,
//       }),
//     }
//   )
//     .then((response) => response.json())
//     .then((orderData) => {
//       // Your code here after capture the order
//     });
// }

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ currency, showSpinner, amount, total, products }) => {
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style, currency, amount]}
        fundingSource={undefined}
        createOrder={(data, actions) =>
          actions.order
            .create({
              purchase_units: [
                { amount: { currency_code: currency, value: amount } },
              ],
            })
            .then((orderId) => orderId)
        }
        onApprove={(data, actions) =>
          actions.order.capture().then(async (rs) => {
            if (rs.status === "COMPLETED") {
              if (products && total) {
                const rs = await fetchCreateOrder({
                  products: products,
                  total: total,
                });
                console.log("rs order success : ", rs);
              }
            } else {
              console.log("err completed order");
            }
          })
        }
      />
    </>
  );
};

export default function Paypal({ amount, total, products }) {
  return (
    <div style={{ maxWidth: "350px", maxHeight: "100px" }}>
      <PayPalScriptProvider
        options={{ clientId: "test", components: "buttons", currency: "USD" }}
      >
        <ButtonWrapper
          total={total}
          products={products}
          currency={"USD"}
          amount={amount}
          showSpinner={false}
        />
      </PayPalScriptProvider>
    </div>
  );
}
