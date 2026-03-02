import React, { useEffect, useState } from "react";
import {
	 useApi,
  useExtensionApi,
  reactExtension,
  useBuyerJourneyIntercept,
  useAttributes,
  Banner,
  useShippingAddress,
  useApplyShippingAddressChange,
  useDeliveryGroups,
  useDeliveryGroup,
  useApplyAttributeChange,
} from "@shopify/ui-extensions-react/checkout";

export default reactExtension("purchase.checkout.shipping-option-list.render-after", () => <App />);

function App() {
	
  const localzipcodes = [33436,33426,33431,33433,33434,33435,33437,33444,33446,33472,33473,33483,33487,33498,33010,33012,33013,33014,33015,33016,33018,33030,33031,33032,33033,33034,33035,33054,33056,33107,33039,33109,33055,33110,33112,33121,33122,33125,33126,33128,33129,33130,33131,33132,33134,33135,33136,33139,33140,33141,33142,33127,33143,33144,33145,33146,33147,33133,33148,33150,33154,33137,33138,33155,33156,33157,33158,33160,33161,33162,33165,33166,33167,33149,33168,33169,33170,33172,33173,33174,33175,33176,33177,33178,33179,33181,33182,33183,33184,33185,33186,33187,33188,33189,33190,33194,33195,33196,33199,33002,33011,33017,33090,33180,33092,33101,33102,33111,33114,33116,33119,33124,33151,33152,33193,33153,33159,33163,33164,33197,33222,33231,33233,33234,33238,33239,33242,33243,33245,33247,33255,33256,33257,33261,33265,33266,33269,33280,33283,33296,33299,33004,33008,33009,33019,33020,33021,33022,33023,33024,33025,33026,33027,33028,33029,33060,33061,33062,33063,33064,33065,33066,33067,33068,33069,33071,33072,33073,33074,33075,33076,33077,33081,33082,33083,33084,33093,33097,33301,33302,33303,33304,33305,33306,33307,33308,33309,33310,33311,33312,33313,33314,33315,33316,33317,33318,33319,33320,33321,33322,33323,33324,33325,33326,33327,33328,33329,33330,33331,33332,33334,33335,33336,33337,33338,33339,33340,33345,33346,33348,33349,33351,33355,33359,33388,33394,33441,33442,33443,33428,33445,33486,33484,33432,33496,33449,33467,33463,33462,33460,33461,33415,33413,33405,33406,33480,33401,33409,33417,33411,33414,33470,33412,33418,33410,33408,33403,33609,33607,33629,33606,33614,33634,33604,33611,33616,33603,33605,33610,33615,33613,33619,33617,33612,33618,33637,33511,33569,33578,33594,33596,33625,33626,33635,33647,33556,33624,33510,33584,33592];
  const useraddress_val = useShippingAddress();
  const userzip_val = useraddress_val.zip;
   const deliveryGroupses = useApi();
  const applyAttributeChange = useApplyAttributeChange();
  	const deliveryGroups = useDeliveryGroups();

  const firstDeliveryGroup = useDeliveryGroup(
    deliveryGroups[0],
  );
  
 // console.log('d deliverryyy => ',deliveryGroups);
  //console.log('f firstt chk  => ',firstDeliveryGroup);
  
  if(userzip_val !== null && userzip_val !== undefined){
  if (localzipcodes.includes(parseInt(userzip_val, 10))) {
	 
  const [showError, setShowError] = useState(false);
  const myAttributes = useAttributes();
  //console.log(myAttributes);
  
  
  const updateCartAttributesRemove = async () => {
    try {
      let attributes = {
        'Order Type': '',
        'Delivery Location': '',
        'Order Delivery Date': '',
        'Order Timeframes': '',
      };

      // Map the attributes to the format expected by applyAttributeChange
      const attributeChangePromises = Object.entries(attributes).map(([key, value]) => ({
        type: 'updateAttribute',
        key,
        value,
      }));

      // Apply attribute changes to the cart
      const results = await Promise.all(attributeChangePromises.map(change => applyAttributeChange(change)));
      console.log('Attribute update results:', results);
    } catch (error) {
      console.error('Attribute update error:', error);
    }
  };
  
  
  useEffect(() => {
    // Extract order delivery date from attributes
    const orderDeliveryDate = myAttributes.find(
      (attr) => attr.key === "Order Delivery Date"
    )?.value;

     const orderTypeAttr = myAttributes.find(
    (attr) => attr.key === "Order Type"
  );
  
  if (orderTypeAttr && orderTypeAttr.value === 'Schedule') {
    // Check if the order delivery date is in the past
     if (orderDeliveryDate) {
	  console.log(orderDeliveryDate);
      const currentDate = new Date();
      const deliveryDate = new Date(orderDeliveryDate);
       const minDeliveryDate = new Date(currentDate);
  minDeliveryDate.setDate(currentDate.getDate() - 1);
   const dayOfMonth = minDeliveryDate.getDate();
    const mineOfMonth = minDeliveryDate.getMonth();
	const mineOfyer = minDeliveryDate.getFullYear();
      // Extract year, month, and day parts of the dates
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const currentDay = currentDate.getDate();
      const deliveryYear = deliveryDate.getFullYear();
      const deliveryMonth = deliveryDate.getMonth();
      const deliveryDay = deliveryDate.getDate();
    //console.log(deliveryDay);
  const selectedDeliveryOption = firstDeliveryGroup?.selectedDeliveryOption;
  
     if (selectedDeliveryOption !== undefined) {
    if (selectedDeliveryOption.title === "FREE Scheduled Delivery/Store Pickup (Inside our Delivery Area)") {
      // Compare only the year, month, and day parts
      if ( 
        deliveryYear < mineOfyer ||
        (deliveryYear === mineOfyer &&
          (deliveryMonth < mineOfMonth ||
            (deliveryMonth === mineOfMonth && deliveryDay <= dayOfMonth)))
      ) {
       setShowError(true);  
      } else {
        setShowError(false);
      }
	  
	    } else {
     setShowError(false);  
	// console.log('12111');
	 updateCartAttributesRemove();
    }
	
	}
	  
	  
    }
  } else if (orderTypeAttr && orderTypeAttr.value === 'Store Pickup') {
    // Check if the order delivery date is in the past
     if (orderDeliveryDate) {
	  console.log(orderDeliveryDate);
      const currentDate = new Date();
      const deliveryDate = new Date(orderDeliveryDate);
      const minDeliveryDate = new Date(currentDate);
  minDeliveryDate.setDate(currentDate.getDate() - 1);
   const dayOfMonth = minDeliveryDate.getDate();
   const mineOfMonth = minDeliveryDate.getMonth();
	const mineOfyer = minDeliveryDate.getFullYear();
      // Extract year, month, and day parts of the dates
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const currentDay = currentDate.getDate();
      const deliveryYear = deliveryDate.getFullYear();
      const deliveryMonth = deliveryDate.getMonth();
      const deliveryDay = deliveryDate.getDate();
   // console.log(deliveryDay);
  const selectedDeliveryOption = firstDeliveryGroup?.selectedDeliveryOption;
  
     if (selectedDeliveryOption !== undefined) {
    if (selectedDeliveryOption.title === "FREE Scheduled Delivery/Store Pickup (Inside our Delivery Area)") {
      // Compare only the year, month, and day parts
      if ( 
        deliveryYear < mineOfyer ||
        (deliveryYear === mineOfyer &&
          (deliveryMonth < mineOfMonth ||
            (deliveryMonth === mineOfMonth && deliveryDay < dayOfMonth)))
      ) {
       setShowError(true);  
      } else {
        setShowError(false);
      }
	  
	    } else {
     setShowError(false);  
	// console.log('12111');
	 updateCartAttributesRemove();
    }
	
	}
	  
	  
    }
  } else if (!orderTypeAttr || orderTypeAttr.value === '') {
	   //console.log('Order type');
	   const selectedDeliveryOption = firstDeliveryGroup?.selectedDeliveryOption;
     if (selectedDeliveryOption !== undefined) {
    if (selectedDeliveryOption.title === "FREE Scheduled Delivery/Store Pickup (Inside our Delivery Area)") {
      // Compare only the year, month, and day parts
       setShowError(true);  
	 // console.log('PriyaGodara');
	    } else {
			if(showError != false){
     setShowError(false);  
	 //console.log('12111');
	 updateCartAttributesRemove();
			}
    }
	
	}
  }
  }, [firstDeliveryGroup]);
  
  

  // Use the `buyerJourney` intercept to conditionally block checkout progress
  useBuyerJourneyIntercept(({ canBlockProgress }) => {
    if (canBlockProgress && showError) {
      return {
        behavior: "block",
        reason: "Please choose a future delivery date.",
        perform: (result) => {
          if (result.behavior === "block") {
            setShowError(true);
          }
        },
      };
    }

    return {
      behavior: showError ? "block" : "allow",
      reason: showError ? "Please choose a future delivery date." : "",
    };
  });
  
  

  return (
    <>
      {showError && (
        <Banner
          status="critical"
          title="Please choose a future delivery date."
        />
      )}
      {/* Render other components of your extension */}
    </>
  );
  
  }else{
	
   

	useEffect(() => {
  const updateCartAttributesNational = async () => {
    try {
      let attributes = {
        'Order Type': '',
        'Delivery Location': '',
        'Order Delivery Date': '',
        'Order Timeframes': '',
      };

      // Map the attributes to the format expected by applyAttributeChange
      const attributeChangePromises = Object.entries(attributes).map(([key, value]) => ({
        type: 'updateAttribute',
        key,
        value,
      }));

      // Apply attribute changes to the cart
      const results = await Promise.all(attributeChangePromises.map(change => applyAttributeChange(change)));
      console.log('Attribute update results:', results);
    } catch (error) {
      console.error('Attribute update error:', error);
    }
  };

  // Call the update function
  updateCartAttributesNational();
}, []); // Empty dependency array ensures this effect runs only once

	
	  
  }
  
}
  
  
}
