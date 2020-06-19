import _products from "./products.json";

const TIMEOUT = 2000;

export default {
  // getProducts: (timeout) =>
  //   setTimeout(
  //     () =>
  //       fetch("http://localhost:8080/api/products")
  //         .then((res) => {
  //           return res.json();
  //         })
  //         .then((json) => {
  //           console.log("Retrieved items:");
  //           console.log(json);
  //           return json;
  //         })
  //         .catch(console.log),
  //     timeout || TIMEOUT
  //   ),
  getProducts: () => {
    fetch("http://localhost:8080/api/products")
      .then((res) => {
        return res.json();
      })
      // .then((json) => {
      //   console.log("Retrieved items:");
      //   console.log(json);
      //   return json;
      // })
      .catch(console.log);
  },
  buyProducts: (payload, cb, timeout) =>
    setTimeout(() => cb(), timeout || TIMEOUT),
};
