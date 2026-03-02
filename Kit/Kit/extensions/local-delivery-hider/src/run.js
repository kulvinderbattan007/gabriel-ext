// @ts-check

// Use JSDoc annotations for type safety
/**
* @typedef {import("../generated/api").RunInput} RunInput
* @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
* @typedef {import("../generated/api").Operation} Operation
*/

// The configured entrypoint for the 'purchase.delivery-customization.run' extension target
/**
* @param {RunInput} input
* @returns {FunctionRunResult}
*/

const NO_CHANGES = {
  operations: [],
};

export function run(input) {
  let company = input.cart.buyerIdentity?.purchasingCompany;

  const targetTitle = "Warehouse Pickup (Knoxfield, VIC)";

  if(company === null) {
    let toHide = input.cart.deliveryGroups
    .filter(group => group.deliveryAddress?.provinceCode &&
      group.deliveryAddress.provinceCode === "VIC")

    .flatMap(group => group.deliveryOptions)

    .filter(option => option.title === targetTitle)
    
    .map(option => /**@type {Operation} */({
      hide: {
        deliveryOptionHandle: option.handle,
      }
    }));

    // The @shopify/shopify_function package applies JSON.stringify() to your function result
    // and writes it to STDOUT
    return {
      operations: toHide
    }
  } else {
    return NO_CHANGES;
  }
};
