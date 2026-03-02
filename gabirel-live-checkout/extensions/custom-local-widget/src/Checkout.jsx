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
  useSettings,
} from '@shopify/ui-extensions-react/checkout';
 
export default reactExtension(
  'purchase.checkout.shipping-option-list.render-after',
  () => <Extension />,
);

 


function Extension() {
  const localzipcodes = [33436, 33426, 33431, 33433, 33434, 33435, 33437, 33444, 33446, 33472, 33473, 33483, 33487, 33498, 33010, 33012, 33013, 33014, 33015, 33016, 33018, 33030, 33031, 33032, 33033, 33034, 33035, 33054, 33056, 33107, 33039, 33109, 33055, 33110, 33112, 33121, 33122, 33125, 33126, 33128, 33129, 33130, 33131, 33132, 33134, 33135, 33136, 33139, 33140, 33141, 33142, 33127, 33143, 33144, 33145, 33146, 33147, 33133, 33148, 33150, 33154, 33137, 33138, 33155, 33156, 33157, 33158, 33160, 33161, 33162, 33165, 33166, 33167, 33149, 33168, 33169, 33170, 33172, 33173, 33174, 33175, 33176, 33177, 33178, 33179, 33181, 33182, 33183, 33184, 33185, 33186, 33187, 33188, 33189, 33190, 33194, 33195, 33196, 33199, 33002, 33011, 33017, 33090, 33180, 33092, 33101, 33102, 33111, 33114, 33116, 33119, 33124, 33151, 33152, 33193, 33153, 33159, 33163, 33164, 33197, 33222, 33231, 33233, 33234, 33238, 33239, 33242, 33243, 33245, 33247, 33255, 33256, 33257, 33261, 33265, 33266, 33269, 33280, 33283, 33296, 33299, 33004, 33008, 33009, 33019, 33020, 33021, 33022, 33023, 33024, 33025, 33026, 33027, 33028, 33029, 33060, 33061, 33062, 33063, 33064, 33065, 33066, 33067, 33068, 33069, 33071, 33072, 33073, 33074, 33075, 33076, 33077, 33081, 33082, 33083, 33084, 33093, 33097, 33301, 33302, 33303, 33304, 33305, 33306, 33307, 33308, 33309, 33310, 33311, 33312, 33313, 33314, 33315, 33316, 33317, 33318, 33319, 33320, 33321, 33322, 33323, 33324, 33325, 33326, 33327, 33328, 33329, 33330, 33331, 33332, 33334, 33335, 33336, 33337, 33338, 33339, 33340, 33345, 33346, 33348, 33349, 33351, 33355, 33359, 33388, 33394, 33441, 33442, 33443, 33428, 33445, 33486, 33484, 33432, 33496, 33449, 33467, 33463, 33462, 33460, 33461, 33415, 33413, 33405, 33406, 33480, 33401, 33409, 33417, 33411, 33414, 33470, 33412, 33418, 33410, 33408, 33403, 33609, 33607, 33629, 33606, 33614, 33634, 33604, 33611, 33616, 33603, 33605, 33610, 33615, 33613, 33619, 33617, 33612, 33618, 33637, 33511, 33569, 33578, 33594, 33596, 33625, 33626, 33635, 33647, 33556, 33624, 33510, 33584, 33592];
  const translate = useTranslate();
  const { extension } = useApi();
  const { deliveryGroups } = useApi();
  const { zip_codes } = useSettings();
  const zipCodeArray = zip_codes.split(',').map(zip => parseInt(zip.trim(), 10));
  
  const useraddress_val = useShippingAddress();
  const userzip_val = useraddress_val.zip;
  const [entireView, setEntireView] = useState('');
  const [entireResultView, setentireResultView] = useState('hidden');
  const [showChoiceList, setShowChoiceList] = useState(false);
  const [showStorePickupChoices, setShowStorePickupChoices] = useState(false);
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedDate, setSelectedDate] = useState(null); // Add this state variable
  const [showDateField, setShowDateField] = useState(false);
  const [showScheduledDateField, setShowScheduledDateField] = useState(false);
  const [selectedLocalDeliveryChoice, setSelectedLocalDeliveryChoice] = useState(''); 
  const [selectedScheduleDate, setSelectedScheduleDate] = useState('');
  const [selectedScheduleTimeFrame, setSelectedScheduleTimeFrame] = useState('');
  const [selectedDelivery, setDeliveryType] = useState('');
  const [customTimeFrame, setCustomTimeFrame] = useState('');
  const [disabledConfirmBtn, setDisabledConfirmBtn] = useState(true); //disabled the confirm btn until selection made
  const [errorConfirmBtn, setErrorConfirmBtn] = useState(false);
  const [deliveryCustomMethod, setdeliveryCustomMethod] = useState('');
  const [showDeliveryCustomLocation, setShowDeliveryCustomLocation] = useState(false);
  const [deliveryCustomLocation, setdeliveryCustomLocation] = useState('');
  const [showDeliveryCustomDate, setShowDeliveryCustomDate] = useState(false);
  const [deliveryCustomDate, setdeliveryCustomDate] = useState('');
  const [showDeliveryCustomTime, setShowDeliveryCustomTime] = useState(false);
  const [deliveryCustomTime, setdeliveryCustomTime] = useState('');
  //const myAttributes = useAttributes();
 // const [pastOrderDateIs, setpastOrderDateIs] = useState(false);
  const [updateExecuted, setUpdateExecuted] = useState(false);

const applyAttributeChange = useApplyAttributeChange();


 
  let selectedDeliveryOption;
 
    let viewvisibility;
	  let test;
  viewvisibility = 'hidden';
  const handleStoreSelection = (value) => {
    setSelectedStore(value);
	setShowDateField(true); // Hide the date field
	setShowScheduledDateField(false);
	//console.log(value);
  };
  
const formatDate = (inputDate) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const date = new Date(inputDate);

  const day = date.toLocaleDateString('en-US', { day: 'numeric' });
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const year = date.toLocaleDateString('en-US', { year: 'numeric' });

  return `${day}-${month}-${year}`;
};


const today = new Date();
const getUTCHours = (date) => {
  return date.getUTCHours();
};
const currentUTCHours = getUTCHours(today);

const shouldExcludeToday = (currentUTCHours) => {
  return currentUTCHours >= 0 && currentUTCHours < 4; // UTC time between 12 AM to 4 AM
};
const pastDates = [];

for (let i = 0; i <= today.getDate(); i++) {
  const pastDate = new Date(today);
  pastDate.setDate(today.getDate() - i);
   if (!(i === 0 && shouldExcludeToday(currentUTCHours))) {
  pastDates.push(pastDate.toISOString().split('T')[0]);
   }
}

const pastDates2 = [];

for (let j = 1; j <= today.getDate(); j++) {
  const pastDate2 = new Date(today);
  pastDate2.setDate(today.getDate() - j);
   if (!(j === 1 && shouldExcludeToday(currentUTCHours))) {
  pastDates2.push(pastDate2.toISOString().split('T')[0]);
   }
}
  
  
    /*if (typeof deliveryGroups != 'undefined' && typeof deliveryGroups.current != 'undefined' && deliveryGroups.current.length > 0) {
		    selectedDeliveryOption = deliveryGroups.current[0].selectedDeliveryOption.handle;
		 console.log(deliveryGroups.current[0]);
		 const afterDash = selectedDeliveryOption.split('-')[1];
		 console.log(afterDash);

    if (afterDash === 'c05d48399f64f9c2af569507a81015a6') {
			  
			   viewvisibility = '';
			   //console.log("Yes Test");
			  
		  }else{
			   viewvisibility = 'hidden';
			  //console.log("No");
	}
	
	console.log("shipping Profile Id => ", selectedDeliveryOption);
   
	}*/
	
	if (typeof deliveryGroups !== 'undefined' && typeof deliveryGroups.current !== 'undefined' && deliveryGroups.current.length > 0 && deliveryGroups.current[0].selectedDeliveryOption &&
  deliveryGroups.current[0].selectedDeliveryOption.handle) {
		 console.log(deliveryGroups.current[0]);
    const selectedDeliveryOptionHandle = deliveryGroups.current[0].selectedDeliveryOption.handle;
    // console.log(deliveryGroups.current[0].selectedDeliveryOption.handle);
	  //console.log('testPPP');
    // Iterate over deliveryOptions to find the matching option
    const matchingOption = deliveryGroups.current[0].deliveryOptions.find(option => option.handle === selectedDeliveryOptionHandle);
	console.log(matchingOption.title);

    if (matchingOption && matchingOption.title === "FREE Scheduled Delivery/Store Pickup (Inside our Delivery Area)") {
        viewvisibility = '';
        //console.log("Yes Test");
    } else {
		 //console.log("Yes hiii");
        viewvisibility = 'hidden';
		test = 'hidden';
		
    }

    //console.log("shipping Profile Id => ", selectedDeliveryOptionHandle);
}


 
    const handleTimeFrame = (value) => {
    setCustomTimeFrame(value);
	
	if(selectedScheduleDate == ''){
		setDisabledConfirmBtn(true);
		setErrorConfirmBtn(true);
	}else{
		setDisabledConfirmBtn(false);
		setErrorConfirmBtn(false);
	}
	//console.log('selected value = '+value);
	if(value == '11am_2pm'){
		setSelectedScheduleTimeFrame('11am - 2pm');
	}else if(value == '2pm_5pm'){
		setSelectedScheduleTimeFrame('2pm - 5pm');
	}else if(value == '5pm_8pm'){
		setSelectedScheduleTimeFrame('5pm - 8pm');
	}
	
	//console.log('selected value = '+value);
	
  };
  
    const handleDeliveryClick = (value) => {
    setDeliveryType(value);
	if(value == 'local_delivery'){
		setShowScheduledDateField(true);
		setDisabledConfirmBtn(true);
	setShowChoiceList(true);
	 setSelectedLocalDeliveryChoice('Schedule'); 
    setShowStorePickupChoices(false);
	setShowDateField(false); // Hide the date field
    //console.log('Local Delivery clicked');
	
		 
	}else if(value == 'stock_delivery'){
	setShowScheduledDateField(false);
	setDisabledConfirmBtn(false);
	setShowChoiceList(false);
    setShowStorePickupChoices(true);
	setShowDateField(false); // Hide the date field
  //  console.log('Store Pickup clicked');
	setSelectedLocalDeliveryChoice('');
	setSelectedDate('');
	}
	
	
	
  };

const OrderCosts = useTotalAmount();
const orderTotal = OrderCosts.amount;


const currentTime = new Date().getHours();


const shouldShowSameDayOption = () => {
  return currentTime < 16 && orderTotal >= 125;
};

const shouldShowSameDayOption4 = () => {
  return currentTime < 16 && orderTotal < 125; // Show if current time is before 4 PM
};



   const updateCartAttributesRemove = async () => {
    try {
      let attributes = {
        'Order Delivery Date': '',
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



const updateCartAttributes = async () => {
try {
let attributes = {};
//console.log('checking actual: '+showStorePickupChoices);
//console.log('checking local: '+showChoiceList);
if (showChoiceList == true) {
// For local delivery
if(selectedLocalDeliveryChoice == 'Schedule'){
setdeliveryCustomMethod('Local Delivery (Schedule)');
setShowDeliveryCustomLocation(false);
setShowDeliveryCustomDate(true);
setShowDeliveryCustomTime(true);
setdeliveryCustomLocation('Miami Dade');
 //const formattedDate = formatDate(selectedScheduleDate);
setdeliveryCustomDate(selectedScheduleDate);
setdeliveryCustomTime(selectedScheduleTimeFrame);
//console.log('test');
attributes = {
'Order Type': selectedLocalDeliveryChoice,
'Delivery Location': 'Miami Dade',
'Order Delivery Date': selectedScheduleDate,
'Order Timeframes': selectedScheduleTimeFrame,
};
}
 

}else if (showStorePickupChoices == true) {
setShowDeliveryCustomLocation(true);
setdeliveryCustomMethod('Store Pickup');
setShowDeliveryCustomDate(true);
setShowDeliveryCustomTime(false);

if(selectedStore == 'CoralWay'){ 
setdeliveryCustomLocation('2229 Coral Way. Miami, FL 33145');
}else if(selectedStore == 'SampleRD'){
setdeliveryCustomLocation('9813 W Sample Rd. Coral Springs, FL 33065');
}else if(selectedStore == 'Pinecrest'){
setdeliveryCustomLocation('12443 S Dixie Hwy, Miami, FL 33156');
}else if(selectedStore == 'Wellington'){
setdeliveryCustomLocation('13837 Wellington Trace B7, Wellington, FL 33414');
}else if(selectedStore == 'Tampa'){	
setdeliveryCustomLocation('4042 W Kennedy Blvd. Tampa, FL 33609');	
}

 //const formattedDate2 = formatDate(selectedDate);
setdeliveryCustomDate(selectedDate);
setdeliveryCustomTime('');
// For store pickup
attributes = {
'Order Type': 'Store Pickup',
'Delivery Location': selectedStore,
'Order Delivery Date': selectedDate,
'Order Timeframes': '',
};

}

const attributeUpdates = Object.entries(attributes).map(([key, value]) => ({
key,
type: 'updateAttribute',
value,
}));

const attributeChangePromises = attributeUpdates.map(change =>
applyAttributeChange(change)
);

const results = await Promise.all(attributeChangePromises);
console.log('Attribute update results:', results);
setEntireView('hidden');
setentireResultView('');
} catch (error) {
console.error('Attribute update error:', error);
setEntireView('');
setentireResultView('hidden');
}
};



if(viewvisibility == '' && entireView == 'hidden'){
	test = 'hidden';
	//console.log('viewvisibility=null, entireView=hidden, test=hidden');
	
}else if(viewvisibility == 'hidden' && entireView == ''){
	test = 'hidden';
	//console.log('viewvisibility=hidden, entireView=null, test=hidden');
}else{
	test = '';
	//console.log('test=nnull');
	//console.log('cccvv=> ', entireResultView);
	//console.log('ffgttess=> ', test);
	//console.log('cvffff=> ', viewvisibility);
}



 


  if(userzip_val !== null && userzip_val !== undefined){
  if (zipCodeArray.includes(parseInt(userzip_val, 10))) {
    //console.log('Yes, in local area!');
	  

    return (
      <>
	  	<View id="complsset_widget" visibility={viewvisibility} padding="base" border="none">
		
		
	  	<View id="complete_customWidget" visibility={test} padding="base" border="none">
		<View inlineAlignment="start" padding={["base", "none"]} border="none"><Heading level={2}>Delivery/Store Pickup Options</Heading></View>
	   <Grid
      columns={['50%', 'fill']}
      rows={[100, 'auto']}
      spacing="loose"
        >
     	 
		 <ChoiceList
        name="deliveryoptions"
        value={selectedDelivery}
        onChange={handleDeliveryClick}
      >
	  
	   <View blockAlignment="center" border="base" padding="base">
        <Choice id="local_delivery">Local Delivery (South Florida)</Choice>
		  </View>
		  
		 <View blockAlignment="center" border="base" padding="base">
		<Choice id="stock_delivery">Store Pickup (South Florida)</Choice>
		  </View>
      </ChoiceList>
		
        </Grid>

{showScheduledDateField && (
  <>
    <View border="none" padding="base">
	
     <DatePicker  
        id="datefields_Scheduledsss"
		selected={selectedScheduleDate}
        onChange={(value) => {
			setSelectedScheduleDate(value);
			setDisabledConfirmBtn(false);
		    setErrorConfirmBtn(false); 
        }}
		disabled={pastDates}
      /> 
    </View>
    <Heading size="Medium" fontWeight="bold">Select Delivery Time</Heading>
     <View border="none" padding="base">
     
	 	<ChoiceList
        name="timeframe"
        value={customTimeFrame}
        onChange={handleTimeFrame}
      >
	   <View border="base" padding="base">
        <Choice id="11am_2pm">11am - 2pm</Choice>
		  </View>
		 <View border="base" padding="base">
		<Choice id="2pm_5pm">2pm - 5pm</Choice>
		  </View>
		 <View border="base" padding="base">
		<Choice id="5pm_8pm">5pm - 8pm</Choice>
		  </View>
      </ChoiceList>
      
  
	  
    </View>
  </>
)}


        {showStorePickupChoices && (
          <InlineStack>
            <ChoiceList
			  id="store_pickupLists"
              name="choice"
              value={selectedStore}
              onChange={handleStoreSelection}
            >
              <View border="none" padding="base">
			 
	          <View border="base" padding="base">
                <Choice id="CoralWay">
				<Heading size="Medium" fontWeight="bold">2229 Coral Way. Miami, FL 33145</Heading>
				<Text size="Medium">Phone: (786) 633-6179</Text>
               <View border="none" padding="none">		
				<Link to="https://maps.app.goo.gl/Rtq7JZuYr9XWNLLd6" className="stores-link">
                 Store Hours & Directions
                 </Link>
				 </View>
				</Choice>
				</View>
				
				<View border="base" padding="base">
                <Choice id="SampleRD">
				<Heading size="Medium" fontWeight="bold">9813 W Sample Rd. Coral Springs, FL 33065</Heading>
				<Text size="Medium">Phone: (954) 752-6290</Text>
				<View border="none" padding="none">
				<Link to="https://maps.app.goo.gl/3kTYNKCXPHJA81ro6" className="stores-link">
                 Store Hours & Directions
                 </Link>
				 </View>
				</Choice>
				</View>
				
				<View border="base" padding="base">
				<Choice id="Pinecrest">
				<Heading size="Medium" fontWeight="bold">12443 S Dixie Hwy, Miami, FL 33156</Heading>
				<Text size="Medium">Phone: (305) 964-5114</Text>
				<View border="none" padding="none">
				<Link to="https://maps.app.goo.gl/R57763C6ETjrJoL77" className="stores-link">
                 Store Hours & Directions
                 </Link>
				 </View>
				</Choice>
				 </View> 
				  
				<View border="base" padding="base">
				<Choice id="Wellington">
				<Heading size="Medium" fontWeight="bold">13837 Wellington Trace B7, Wellington, FL 33414</Heading>
				<Text size="Medium">Phone: (561) 556-6393</Text>
				<View border="none" padding="none">
				<Link to="https://maps.app.goo.gl/GoFqj8UY69XciEVL8" className="stores-link">
                 Store Hours & Directions
                 </Link>
				 </View>
				</Choice>
				 </View>
				 
				 <View border="base" padding="base">
				<Choice id="Tampa">
				<Heading size="Medium" fontWeight="bold">4042 W Kennedy Blvd. Tampa, FL 33609</Heading>
				<Text size="Medium">Phone: (813) 285 7759</Text>
				<View border="none" padding="none">
				<Link to="https://maps.app.goo.gl/W47hmNR4vocmnZpa8" className="stores-link">
                 Store Hours & Directions
                 </Link>
				 </View>
				</Choice>
				 </View>
				 
				  <View border="base" padding="base">
				<Choice id="Oakland">
				<Heading size="Medium" fontWeight="bold">3553 Dixie Hwy, Oakland Park, FL 33334</Heading>
				<Text size="Medium">Phone: (877) 448 6328</Text>
				<View border="none" padding="none">
				<Link to="https://g.co/kgs/Vu9rKqa" className="stores-link">
                 Store Hours & Directions
                 </Link>
				 </View>
				</Choice>
				 </View>
	
               </View>
            </ChoiceList>
          </InlineStack>
        )} 
		
	{selectedStore && showDateField && (
	<View border="none" padding="base">
    <DatePicker  	
   id="datefields"
   selected={selectedDate} 
    onChange={(value) => {
      setSelectedDate(value);
	  setDisabledConfirmBtn(false);
    }}
	onFocus={() => setSelectedDate(null)} // Clear date field on focus
	disabled={pastDates2}
  />
   </View>
)}
       
	   <View border="none" padding="base">
      	<Button
		disabled={disabledConfirmBtn}
		id="confirm_selectiones"
      onPress={() => {
        updateCartAttributes();
          //console.log('Cart attributes updated:', attributes);
      }}
    >
      Confirm Selection
    </Button>
 </View>
	

 </View>
 
 <View border="none" id="Complete_Custom_widgetResult" visibility={entireResultView}>
 
<View inlineAlignment="start" padding={["base", "none"]} border="none">
 <Heading level={2}>Delivery Details</Heading>
 </View>

<View border="none" padding="none">
<Grid
columns={['80%', '20%']}
border="base"
>
<View border="none" padding="base">
<Text size="Medium">Delivery Method Selected: </Text> 
<Text size="Medium" fontWeight="bold">{deliveryCustomMethod}</Text> 
</View>

<View border="none" padding="base">
<Link
id="change_selectiones"
onPress={() => {
setEntireView('');
setentireResultView('hidden');
}}
>
Change
</Link>
</View>
</Grid> 
</View>

<View border="base" padding="none">
{showDeliveryCustomLocation && (
<Grid
columns={['35%', 'fill']}
>
<View border="none" padding="base">
<Text size="Medium">Store Selected</Text> 
</View>

<View blockAlignment="right" border="none" padding="base">
<Text size="Medium">{deliveryCustomLocation}</Text> 
</View>
</Grid> 
)}

{showDeliveryCustomDate && (
<Grid
columns={['70%', 'fill']}
>
<View border="none" padding="base">
<Text size="Medium">Order Delivery Date </Text> 
</View>

<View blockAlignment="right" border="none" padding="base">
<Text size="Medium">{deliveryCustomDate}</Text> 
</View>
</Grid> 
)}

{showDeliveryCustomTime && (
<Grid
columns={['70%', 'fill']}
>
<View border="none" padding="base">
<Text size="Medium">Order Timeframe </Text> 
</View>

<View blockAlignment="right" border="none" padding="base">
<Text size="Medium">{deliveryCustomTime}</Text> 
</View>
</Grid> 
)}

</View>				 
				 
</View>	


</View>	

      </>
	  
    );
  } else {
    //console.log('Not in local area!');
    return (
      <>
	   <View border="base" padding="base">
        <Text>
          Orders are processed within 6 to 24 hrs and ship Monday-Friday using the shipping method you selected. Your email confirmation will contain details about your order.
          For order status and questions, please email us at{' '}
          <Link to="mailto:orders@meatnbone.com" className="email-link">
            orders@meatnbone.com
          </Link>
          . The protection plan on your order is optional but recommended.
        </Text>
        <Image
          source="https://cdn.shopify.com/s/files/1/2633/6020/files/Shipping-Map-3_1024x1024.jpg?v=1719432948"
          className="custom-image"
        />
		</View>
      </>
    );
  }
  }
}