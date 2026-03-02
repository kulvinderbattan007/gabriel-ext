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
  input.cart.lines.forEach(line => {

    if((line.isVolume?.value === 'true' || line.internalOrder?.value === 'true') && line.merchandise.__typename === 'ProductVariant') {
      const variant = /** @type {ProductVariant} */ (line.merchandise);
      let discountValue = line.volumeDiscount?.value || 0;
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
