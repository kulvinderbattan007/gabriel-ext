/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @type {FunctionRunResult}
 */

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */

export function run(input) {
  const { cart } = input;
  const bundleItems = {};
  const volumeItems = {};

  cart.lines.forEach(line => {
    const bundleId = line.bundleId;
    const volumeId = line.volumeId;

    if (bundleId && bundleId.value) {
      if (!bundleItems[bundleId.value]) {
        bundleItems[bundleId.value] = [];
      }
      bundleItems[bundleId.value].push(line);
    }

    if (volumeId && volumeId.value) {
      if (!volumeItems[volumeId.value]) {
        volumeItems[volumeId.value] = [];
      }
      volumeItems[volumeId.value].push(line);
    }
  });

  const operations = [
    ...Object.values(bundleItems).map((group) => {
      const bundleNameTitle = group[0]?.bundleName?.value ?? '';
      const retailDiscount = group[0]?.retailDiscount?.value ?? 0;
      const tradeDiscount = group[0]?.tradeDiscount?.value ?? 0;
      const wholesaleDiscount = group[0]?.wholesaleDiscount?.value ?? 0;
      const bundleProductId = group[0]?.bundleId?.value ?? 0;
      const preorderDate = group[0]?.preorderDate?.value ?? '';
      let variantId;

      let discountValue = 0;
      const companyType = input.cart.buyerIdentity?.purchasingCompany?.company?.companyType?.value;
      // Determine discount value based on company type
      if (companyType) {
        if (companyType === 'Wholesale') {
          if (wholesaleDiscount !== null && wholesaleDiscount !== undefined) {
            discountValue = parseFloat(wholesaleDiscount) || '0';
          }
        }
        
        if(companyType === 'Trade') {
          if (tradeDiscount !== null && tradeDiscount !== undefined) {
            discountValue = parseFloat(tradeDiscount) || '22';
          }
        }
      } else {
        if (retailDiscount !== null && retailDiscount !== undefined) {
          discountValue = parseFloat(retailDiscount) || '21';
        }
      }

      console.log(bundleNameTitle, companyType)

      switch (bundleNameTitle) {
        case 'Corrugated 3.5mm Aluminium Gutter Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366604595422";
          break;
        case 'Corrugated 2mm Aluminium Ember Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366604628190";
          break;
        case 'Corrugated 1.8mm Stainless Steel Ember Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366604660958";
          break;
        case 'TrimDek 3.5mm Aluminium Gutter Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366604693726";
          break;
        case 'TrimDek 2mm Aluminium Ember Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366604726494";
          break;
        case 'TrimDek 1.8mm Stainless Steel Ember Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366604759262";
          break;
        case 'KlipLok 3.5mm Aluminium Gutter Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366604792030";
          break;
        case 'KlipLok 2mm Aluminium Ember Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366604824798";
          break;
        case 'KlipLok 1.8mm Stainless Steel Ember Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366604857566";
          break;
        case 'Tile 3.5mm Aluminium Gutter Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366604890334";
          break;
        case 'Tile 2mm Aluminium Ember Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366604923102";
          break;
        case 'Tile 1.8mm Stainless Steel Ember Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366604955870";
          break;
        case 'Corrugated Box Gutter 3.5mm Aluminium Gutter Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366604988638";
          break;
        case 'Corrugated Box Gutter 2mm Aluminium Ember Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366605021406";
          break;
        case 'Corrugated Box Gutter 1.8mm Stainless Steel Ember Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366605054174";
          break;
        case 'TrimDek Box Gutter 3.5mm Aluminium Gutter Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366605086942";
          break;
        case 'TrimDek Box Gutter 2mm Aluminium Ember Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366605119710";
          break;
        case 'TrimDek Box Gutter 1.8mm Stainless Steel Ember Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366605152478";
          break;
        case 'KlipLok Box Gutter 3.5mm Aluminium Gutter Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366605185246";
          break;
        case 'KlipLok Box Gutter 2mm Aluminium Ember Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366605218014";
          break;
        case 'KlipLok Box Gutter 1.8mm Stainless Steel Ember Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366605250782";
          break;
        case 'Tile Box Gutter 3.5mm Aluminium Gutter Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366605283550";
          break;
        case 'Tile Box Gutter 2mm Aluminium Ember Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366605316318";
          break;
        case 'Tile Box Gutter 1.8mm Stainless Steel Ember Kit':
          variantId = "gid://shopify/ProductVariant/45366605349086";
          break;
        case 'Corrugated Valley 3.5mm Aluminium Gutter Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366605381854";
          break;
        case 'Corrugated Valley 2mm Aluminium Ember Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366605414622";
          break;
        case 'Corrugated Valley 1.8mm Stainless Steel Ember Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366605447390";
          break;
        case 'TrimDek Valley 3.5mm Aluminium Gutter Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366605480158";
          break;
        case 'TrimDek Valley 2mm Aluminium Ember Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366605512926";
          break;
        case 'TrimDek Valley 1.8mm Stainless Steel Ember Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366605545694";
          break;
        case 'KlipLok Valley 3.5mm Aluminium Gutter Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366605578462";
          break;
        case 'KlipLok Valley 2mm Aluminium Ember Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366605611230";
          break;
        case 'KlipLok Valley 1.8mm Stainless Steel Ember Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366605643998";
          break;
        case 'Tile Valley 3.5mm Aluminium Gutter Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366605676766";
          break;
        case 'Tile Valley 2mm Aluminium Ember Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366605709534";
          break;
        case 'Tile Valley 1.8mm Stainless Steel Ember Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366605742302";
          break;
        case 'Corrugated Roof-to-Roof 3.5mm Aluminium Gutter Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366605775070";
          break;
        case 'Corrugated Roof-to-Roof 2mm Aluminium Ember Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366605807838";
          break;
        case 'Corrugated Roof-to-Roof 1.8mm Stainless Steel Ember Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366605840606";
          break;
        case 'TrimDek Roof-to-Roof 3.5mm Aluminium Gutter Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366605873374";
          break;
        case 'TrimDek Roof-to-Roof 2mm Aluminium Ember Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366605906142";
          break;
        case 'TrimDek Roof-to-Roof 1.8mm Stainless Steel Ember Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366605938910";
          break;
        case 'KlipLok Roof-to-Roof 3.5mm Aluminium Gutter Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366605971678";
          break;
        case 'KlipLok Roof-to-Roof 2mm Aluminium Ember Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366606004446";
          break;
        case 'KlipLok Roof-to-Roof 1.8mm Stainless Steel Ember Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366606037214";
          break;
        case 'Tile Roof-to-Roof 3.5mm Aluminium Gutter Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366606069982";
          break;
        case 'Tile Roof-to-Roof 2mm Aluminium Ember Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366606102750";
          break;
        case 'Tile Roof-to-Roof 1.8mm Stainless Steel Ember Guard Kit':
          variantId = "gid://shopify/ProductVariant/45366606135518";
          break;
        case 'Corrugated Valley 3.5mm Aluminium Gutter Guard Kit (No Saddles)':
          variantId = "gid://shopify/ProductVariant/45749951824094";
          break;
        case 'Solar Mesh Kit':
          variantId = "gid://shopify/ProductVariant/45837472235742";
          break;
        default:
          variantId = null;
      }
      
      console.log(variantId)

      const attributes = [
        {
          key: '_retailDiscount',
          value: retailDiscount,
        },
        {
          key: '_tradeDiscount',
          value: tradeDiscount,
        },
        {
          key: '_wholesaleDiscount',
          value: wholesaleDiscount,
        },
        {
          key: '_isBundle',
          value: "true",
        },
        {
          key: '_bundleId',
          value: bundleProductId,
        },
        ...(preorderDate !== '' ? [{ key: 'Preorder shipping date', value: preorderDate }] : [])
      ];

      return {
        merge: {
          cartLines: group.map(line => ({
            cartLineId: line.id,
            quantity: line.quantity,
          })),
          parentVariantId: variantId,
          title: bundleNameTitle,
          attributes: attributes
        }
      };
    }),
    ...Object.values(volumeItems).map((group) => {
      const volumeDiscountValue = group[0]?.volumeDiscount?.value ?? 0;
      const volumeDiscountName = group[0]?.variantTitle?.title ?? '';
      const volumeDiscountType = group[0]?.volumeBundleName?.value ?? '';
      const volumeProductType = group[0]?.productTitle?.product.title ?? '';
      const bundleProductId = group[0]?.volumeId?.value ?? 0;
      let variantId;

      switch (volumeDiscountType) {
        case 'Pack':
          switch (volumeProductType) {
            case 'TrimDek Roof Saddles/Clips':
              variantId = "gid://shopify/ProductVariant/46109408297182";
              break;
            case 'Corrugated Roof/Custom Orb Saddles':
              variantId = "gid://shopify/ProductVariant/46109408329950";
              break;
            case 'Gutter Guard 90º Trims':
              variantId = "gid://shopify/ProductVariant/46109408362718";
              break;
            case 'Gutter Guard Flat/Open Trims':
              variantId = "gid://shopify/ProductVariant/46109408395486";
              break;
            case 'Hex-Head Tek Self-Drilling Screws':
              variantId = "gid://shopify/ProductVariant/46109408428254";
              break;
            default:
              variantId = null; // Optional: Handle unknown types
          }
          break;
      
        case 'Bundle':
          switch (volumeProductType) {
            case 'TrimDek Roof Saddles/Clips':
              variantId = "gid://shopify/ProductVariant/46109407805662";
              break;
            case 'Corrugated Roof/Custom Orb Saddles':
              variantId = "gid://shopify/ProductVariant/46109407838430";
              break;
            case 'Gutter Guard 90º Trims':
              variantId = "gid://shopify/ProductVariant/46109407871198";
              break;
            case 'Gutter Guard Flat/Open Trims':
              variantId = "gid://shopify/ProductVariant/46109407903966";
              break;
            case 'Hex-Head Tek Self-Drilling Screws':
              variantId = "gid://shopify/ProductVariant/46109407936734";
              break;
            default:
              variantId = null; // Optional: Handle unknown types
          }
          break;
      
        case 'Box':
          switch (volumeProductType) {
            case 'TrimDek Roof Saddles/Clips':
              variantId = "gid://shopify/ProductVariant/46109407117534";
              break;
            case 'Corrugated Roof/Custom Orb Saddles':
              variantId = "gid://shopify/ProductVariant/46109407150302";
              break;
            case 'Gutter Guard 90º Trims':
              variantId = "gid://shopify/ProductVariant/46109407183070";
              break;
            case 'Gutter Guard Flat/Open Trims':
              variantId = "gid://shopify/ProductVariant/46109407215838";
              break;
            case 'Hex-Head Tek Self-Drilling Screws':
              variantId = "gid://shopify/ProductVariant/46109407248606";
              break;
            default:
              variantId = null; // Optional: Handle unknown types
          }
          break;
      
        default:
          variantId = null; // Fallback if volumeDiscountType is unknown
      }

      return {
        merge: {
          cartLines: group.map(line => ({
            cartLineId: line.id,
            quantity: line.quantity,
          })),
          parentVariantId: variantId,
          title: `${volumeDiscountName} ${volumeProductType} ${volumeDiscountType}`,
          attributes: [
            {
              key: '_isVolume',
              value: 'true',
            },
            {
              key: '_volumeDiscount',
              value: volumeDiscountValue,
            },
            {
              key: '_bundleId',
              value: bundleProductId,
            }
          ],
        }
      };
    })
  ];

  return { operations };
}
