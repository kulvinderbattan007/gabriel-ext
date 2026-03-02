// @ts-check
import { DiscountApplicationStrategy } from "../generated/api";

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 * @typedef {import("../generated/api").Target} Target
 * @typedef {import("../generated/api").ProductVariant} ProductVariant
 */

/**
 * @type {FunctionRunResult}
 */
const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  const discounts = [];
  const companyType = input.cart.buyerIdentity?.purchasingCompany?.company?.companyType?.value;

  input.cart.lines.forEach(line => {
    // Check if the line is a bundle and is targetable
    // line.isBundle?.value === 'true' ||  <-- use this later to restore kit discounts
    if ((line.isBundle?.value === 'true' || line.internalOrder?.value === 'true') && line.merchandise.__typename === 'ProductVariant') {
      let discountValue = 0;
      console.log(companyType, line.internalOrder?.value)
      // Determine discount value based on company type
      if (companyType) {
        if (companyType === 'Wholesale') {
          const wholesaleDiscount = line.wholesaleDiscount?.value;
          if (wholesaleDiscount !== null && wholesaleDiscount !== undefined) {
            //if(line.internalOrder?.value === 'true') {
              //discountValue = 0;
            //} else {
              discountValue = parseFloat(wholesaleDiscount) || 0;
            //}
          }
        }
        
        if(companyType == 'Trade') {
          const tradeDiscount = line.tradeDiscount?.value;
          if (tradeDiscount !== null && tradeDiscount !== undefined) {
            discountValue = parseFloat(tradeDiscount) || 0;
          }
        }
      } else {
        const retailDiscount = line.retailDiscount?.value;
        if (retailDiscount !== null && retailDiscount !== undefined) {
          discountValue = parseFloat(retailDiscount) || 0;
        }
      }
      const variant = /** @type {ProductVariant} */ (line.merchandise);
      // Apply discount if discount value is valid
      if (discountValue !== 0) {
        discounts.push({
          targets: [{
            productVariant: {
              id: variant.id
            }
          }],
          value: {
            percentage: {
              value: discountValue
            }
          }
        });
      }
    }
  });

  if (discounts.length === 0) {
    console.error("No cart lines qualify for volume discount.");
    return EMPTY_DISCOUNT;
  }

  return {
    discounts,
    discountApplicationStrategy: DiscountApplicationStrategy.All
  };
}
