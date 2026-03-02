import React, { useState, useEffect } from 'react';
import {
  Banner,
  useApi,
  useExtensionApi,
  useTranslate,
  reactExtension,
   useAttributes,
  useApplyAttributeChange,
  useShippingAddress,
  useApplyShippingAddressChange,
  Image,
  Text,
  Link,
  TextBlock,
  BlockStack,
  Pressable,
  InlineLayout,
  Icon,
  ChoiceList,
  Choice,
  InlineStack,
  useDeliveryGroups,
  useDeliveryGroup,
  DatePicker,
  DateField,
  Button,
  Grid,
  GridItem,
  BlockLayout,
  View,
  Heading,
  useTotalAmount,
   Style,
   TextField,
   Form,
   Checkbox,
   BlockSpacer,
   useApplyNoteChange,
   useApplyCartLinesChange,
   useCartLineTarget,
   useCartLines,
} from '@shopify/ui-extensions-react/checkout';
 
export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);
  
 


function Extension() {
  const localzipcodes = [33436, 33426, 33431, 33433, 33434, 33435, 33437, 33444, 33446, 33472, 33473, 33483, 33487, 33498, 33010, 33012, 33013, 33014, 33015, 33016, 33018, 33030, 33031, 33032, 33033, 33034, 33035, 33054, 33056, 33107, 33039, 33109, 33055, 33110, 33112, 33121, 33122, 33125, 33126, 33128, 33129, 33130, 33131, 33132, 33134, 33135, 33136, 33139, 33140, 33141, 33142, 33127, 33143, 33144, 33145, 33146, 33147, 33133, 33148, 33150, 33154, 33137, 33138, 33155, 33156, 33157, 33158, 33160, 33161, 33162, 33165, 33166, 33167, 33149, 33168, 33169, 33170, 33172, 33173, 33174, 33175, 33176, 33177, 33178, 33179, 33181, 33182, 33183, 33184, 33185, 33186, 33187, 33188, 33189, 33190, 33194, 33195, 33196, 33199, 33002, 33011, 33017, 33090, 33180, 33092, 33101, 33102, 33111, 33114, 33116, 33119, 33124, 33151, 33152, 33193, 33153, 33159, 33163, 33164, 33197, 33222, 33231, 33233, 33234, 33238, 33239, 33242, 33243, 33245, 33247, 33255, 33256, 33257, 33261, 33265, 33266, 33269, 33280, 33283, 33296, 33299, 33004, 33008, 33009, 33019, 33020, 33021, 33022, 33023, 33024, 33025, 33026, 33027, 33028, 33029, 33060, 33061, 33062, 33063, 33064, 33065, 33066, 33067, 33068, 33069, 33071, 33072, 33073, 33074, 33075, 33076, 33077, 33081, 33082, 33083, 33084, 33093, 33097, 33301, 33302, 33303, 33304, 33305, 33306, 33307, 33308, 33309, 33310, 33311, 33312, 33313, 33314, 33315, 33316, 33317, 33318, 33319, 33320, 33321, 33322, 33323, 33324, 33325, 33326, 33327, 33328, 33329, 33330, 33331, 33332, 33334, 33335, 33336, 33337, 33338, 33339, 33340, 33345, 33346, 33348, 33349, 33351, 33355, 33359, 33388, 33394, 33441, 33442, 33443, 33428, 33445, 33486, 33484, 33432, 33496, 33449, 33467, 33463, 33462, 33460, 33461, 33415, 33413, 33405, 33406, 33480, 33401, 33409, 33417, 33411, 33414, 33470, 33412, 33418, 33410, 33408, 33403, 33609, 33607, 33629, 33606, 33614, 33634, 33604, 33611, 33616, 33603, 33605, 33610, 33615, 33613, 33619, 33617, 33612, 33618, 33637, 33511, 33569, 33578, 33594, 33596, 33625, 33626, 33635, 33647, 33556, 33624, 33510, 33584, 33592];
  const [AddProtection, setAddProtection] = useState(false);
  const [isMounted, setIsMounted] = useState(true); 
  const applyCartLinesChange = useApplyCartLinesChange();
  const translate = useTranslate();
  const useraddress_val = useShippingAddress();
  const userzip_val = useraddress_val.zip;
  const { extension } = useApi();
  const applyNoteChange = useApplyNoteChange();
  const cartitemss = useCartLines();
  //console.log(cartitemss);
   let protectionPlanItemId = null;
   useEffect(() => {
    return () => {
      setIsMounted(false); // Set mount status to false when unmounting
    };
  }, []);
  
 useEffect(() => {
    if (!isMounted) return; // Check if component is mounted before setting state
    // Your logic to set state here...
   
    for (const item of cartitemss) {
      if (item.merchandise.title === 'PROTECTION PLAN') {
        protectionPlanItemId = item.id;
        setAddProtection(true);
        break;
      }
    }
  }, [isMounted, cartitemss]);

console.log(protectionPlanItemId);
 
  const handleAddToCart = async () => {
    try {
      // Define the new line item to be added to the cart
      const lineItemToAdd = {
        type: 'addCartLine',
        merchandiseId: 'gid://shopify/ProductVariant/33416548319331',
        quantity: 1, // Replace with the desired quantity
        attributes: [], // Optionally, add any attributes associated with the line item
        // Optionally, you can include sellingPlanId if the merchandise is being purchased with a selling plan
      };

      // Apply the change to add the line item to the cart
      const result = await applyCartLinesChange(lineItemToAdd);
      
      // Optionally, you can handle success or perform additional actions
      console.log('Line item added to the cart successfully:', result);

	   setAddProtection(true);
    } catch (error) {
      console.error('Error adding line item to the cart:', error);
    }
  };


const handleRemoveFromCart = async () => {
  try {
    // Define the line item to be removed from the cart
    const lineItemToRemove = {
      type: 'removeCartLine', // Ensure the correct type for removing line items
      id: protectionPlanItemId, // Replace 'your_line_item_id_here' with the actual ID of the line item
      quantity: 1, // Specify the quantity being removed, if necessary
    };

    // Apply the change to remove the line item from the cart
    const result = await applyCartLinesChange(lineItemToRemove);
   console.log('Line item removed from the cart successfully:', result);
  
    setAddProtection(false);
  } catch (error) {
    console.error('Error removing line item from the cart:', error);
  }
};
  
  


 const handleCheckboxInChange = (value) => {
      setAddProtection(value);
    if (value) {
		handleAddToCart();
		
	}else{
		 handleRemoveFromCart(); 
		
	}
	
  };


  
  if(userzip_val !== null && userzip_val !== undefined){
  if (localzipcodes.includes(parseInt(userzip_val, 10))) {
 
     //not national
    
  }else{
 console.log('National');
    return (
      <>
	  <View border="base" padding="none" background="subdued">
	  <Grid
columns={['25%', 'fill']}
>
   <View border="none" padding="base">
      <Image
          source="https://cdn.shopify.com/s/files/1/2633/6020/files/unnamed_2.png?v=1613127836"
          className="custom-image"
        />
		</View>
	   <View border="none" padding="base">
	    <Heading level={1}>Protection Plan</Heading>
       <Checkbox id="checkboxprotection" name="checkboxprotection" checked={AddProtection} onChange={(newValue) => handleCheckboxInChange(newValue)}>
        Includes shipping, insurance protection, 24 hr customer service, special package monitoring for $2.99</Checkbox>
		</View>
		</Grid> 
		</View>
      </>
    );	
	  
  }
  
  } 
 
}