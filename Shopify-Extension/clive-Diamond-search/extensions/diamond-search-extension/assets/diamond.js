var domain = "https://247diamondselector.jewellerybuyer.uk";
var mainpath = domain + '/shopify/app/diamond_selector_CTDMS';
$('.custom-description').show();
$('variant-radios.no-js-hidden').hide();
$('.product-form__input.product-form__quantity').hide(); 
$('.product__description.rte').hide();   
$('share-button.share-button').hide();
const cartBubble = `<div class="cart-count-bubble"><span aria-hidden="true">1</span></div>`
function GetFullDetails(Diamondid, saleprice, SPECIALPRICE , gethandle = '') {
console.log('ddddd');
show_animation();
$('.custom-left-show').hide();
$('#list-detail').hide();
$('.custom-right').hide();
$('.templateProduct .mar_bottom').css('margin-bottom', '0');
$('.cardfoliyo_addcart').show();
$('.custom-hide').show();
$('.custom-right').hide();
$('.custom-left').show();  
$('.content-overlay').css('position', 'relative');
$('.content-overlay').css('left', '0');
$('.content-overlay').css('top', '0');
$('.content-overlay').addClass('col-lg-12 col-sm-12');
//$('.product-information .custom-hide').show();
var url = window.location.pathname;
var current_page = url.substr(url.lastIndexOf('/') + 1);
var location_url = window.location;
var url = new URL(location_url);
var handle = gethandle;
var search_type = 'diamondid';
var product_id = meta.product.id;
var post_url = mainpath + '/ShopifyFront/GetProductFullDetails';
var product_price = $('#budget').attr('data-default');//$('.detail-price .price').text();
var shopurl = Shopify.shop;
var product_price = product_price.replace(/[\$Â£â‚¬]/g, '').replace(/,/g, '');
var saleprice = saleprice.replace(/[\$Â£â‚¬]/g, '');
var SPECIALPRICE = SPECIALPRICE.replace(/[\$Â£â‚¬]/g, '');

$.ajax({
url: post_url,
type: "POST",
data: {'search_type': search_type, 'diamondid': Diamondid, 'product_price': product_price, 'saleprice': saleprice, 'SPECIALPRICE': SPECIALPRICE, 'product_id': product_id,'handle':handle,'shopurl':shopurl},
success: function (response) {
hide_animation();
$('.custom-right').hide();
$('.custom-left-show').hide();
$('#show_cardfoliyo_list').html(response);
 // $('p#price_container').hide();
$('#Fastcardfoliyo').hide();
$('#Detailcardfoliyo').hide();
$('.help_btn').hide();
$('#list-detail').hide();	
/* Added for default theme */
$('.product__media-wrapper').show();
$('.product-single__media-group').show();
$('.product-single__title').show();
$('.product-form').hide();
$('.social-sharing').hide();
$('.product-template__container .product-single .grid__item.medium-up--two-fifths').css('width', '50%');
/* End for default theme */
//$('#my-diamond-data-modal').modal({show:false});		
$('#my-diamond-data-modal .close').click();			
$('#my-diamond-data-modal .modal-title').show();
var checkHeight = function () {
var w = document.body.clientWidth;
if (w < 768) {
$('.custom-left-show').hide();
$('.custom-left').show();
} else {
$('.custom-left-show').hide();
$('.custom-left').show();
}
}
checkHeight();
$(window).bind('resize orientationchange', checkHeight);
}
});
}
jQuery(document).ready(function(){
console.log('welcome');

/********get diamond detail*******************************/
function show_animation()
{
$('#saving_container').css('display', 'block');
$('#saving').css('opacity', '.8');
}
function hide_animation()
{
$('#saving_container').fadeOut();
}
/*****************end diamond detail **************/
}); 
(function() {
var elementhandle = document.getElementById("fastrings");
var shopurl = Shopify.shop;
var current_pagetype = meta.page.pageType;
var url = window.location.pathname;
var current_page = url.substr(url.lastIndexOf('/') + 1);
var location_url = window.location;
var url = new URL(location_url);
// Get the element by data-type attribute
var addToCartFormElement = document.querySelector('[data-type="add-to-cart-form"]');
var diamond_type = document.getElementById('diamond_type');
var buttonringsearch = document.getElementById('ring_product_search');
var buttoncheckBudget = document.getElementById('ring_product_checkBudget');
var buttonlivechatwidget = document.getElementById('livechatwidget');
//   Check if the element exists
if (addToCartFormElement) {
// Hide the element
addToCartFormElement.style.display = 'none';
console.log('Element found and hidden:', addToCartFormElement);
} else {
console.log('Element not found');
}
function numberWithCommas(number) {
var parts = number.toString().split(".");
parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
return parts.join(".");
}
// Function to show upsell list
if (current_pagetype == 'product') {
var product_id = meta.product.id;
diamond_type.addEventListener('click', function (event) {
if (event.target.type === 'radio' && event.target.name === 'diamond_type') {
var selectedValue = event.target.value;
console.log("Selected Value:", selectedValue);
}
});
/* Fast Search */
buttonringsearch.addEventListener('click', function (event) {
 
var errorDiamondElement = document.getElementById("error-diamond");   
var shap = $('#dshape').val();
var stones = $('#stones').val();
var check_price = $('.ring_price_add').text();
var maxprice = check_price.replace(/[\$Â£â‚¬]/g, '').replace(/,/g, '');
var user_price = $('#budget').val();
var product_price = $('#budget').attr('data-default');
var sku = $('span.sku').text();
var selectedValue = document.querySelector('input[name="diamond_type"]:checked');
var budgetValue = document.getElementById('budget').value; 
var search_type = 'fast';  
var handle = elementhandle.getAttribute("data-url");
if (selectedValue) {
if (user_price != '') {
if (parseFloat(user_price) >= parseFloat(maxprice)) {
console.log(errorDiamondElement);
 var post_url = mainpath + '/ShopifyFront/GetFastProductDetails';
//var post_url = 'https://247diamondselector.jewellerybuyer.uk/shopify/app/diamond_selector_CTDMS/ShopifyFront/GetFastProductDetails';
$.ajax({
url: post_url,
type: "POST",
data: {'shap': shap, 'product_id': product_id, 'stones': stones,'ratio':selectedValue.value, 'user_price': user_price, 'product_price': product_price, 'type_choosen': selectedValue.value, 'search_type': search_type,'handle':handle,'shopurl':shopurl},
success: function (response) {
console.log('veenit' ,response);
$('.custom-left-show').show();
$('.custom-hide').hide();
$('.custom-right').hide();
$('.custom-left').hide();
$('.product .price').hide();
$('.product__text.subtitle').hide();
$('.product__tax').hide();
$('.product-form__input.product-form__quantity').hide();
$('.product__description.rte').hide();
$('variant-radios.no-js-hidden').hide();  
$('share-button.share-button').hide();  
$('#getdiamond_type').hide();
$('.product__info-wrapper').css({
'padding-left': '0rem',
'max-width': '100%'
});
$('.product__media-wrapper').hide();
$('.custom-description').hide();
$('.specification-table').hide();
$('variant-radios.no-js-hidden').hide();
$('.product-form__input.product-form__quantity').hide();
$('.product__description.rte').hide();
$('share-button.share-button').hide();
//$('p#price_container').hide();  
  
$('#show_cardfoliyo_list').html(response);
}
});
} else {
errorDiamondElement.text('Minimum budget should be' + check_price);
}
} else {
errorDiamondElement.text('Please enter you budget and proceed, minimum budget should be ' + check_price);
}
} else {
console.log("No option selected");
}
});
/* Detailed Search */
buttoncheckBudget.addEventListener('click', function (event){ 
  // event.preventdefault();
  event.stopPropagation();
  
  var shop_url = Shopify.shop;
  // alert("jkk");
//   console.log("shop url "+shop_url)
// console.log('ffff');
var errorDiamondElement = document.getElementById("error-diamond");   
var shap = $('#dshape').val();
var stones = $('#stones').val();
var check_price = $('.ring_price_add').text();
var maxprice = check_price.replace(/[\$Â£â‚¬]/g, '').replace(/,/g, '');
var user_price = $('#budget').val();
var product_price = $('#budget').attr('data-default');
var sku = $('span.sku').text();
var selectedValue = document.querySelector('input[name="diamond_type"]:checked');
var budgetValue = document.getElementById('budget').value; 
var search_type = 'detail';
var handle = elementhandle.getAttribute("data-url");

// console.log("shap:", shap);
// console.log("user_price:", user_price);
// console.log("stones:", stones);
// console.log("check_price:", check_price);
// console.log("maxprice:", maxprice);
// console.log("user_price:", user_price);
// console.log("product_price:", product_price);
// console.log("sku:", sku);
// console.log("selectedValue:", selectedValue);
// console.log("budgetValue:", budgetValue);
// console.log("search_type:", search_type);
// console.log("handle:", handle);
    // return; // Stops execution here
if (user_price != '') {
if (parseFloat(user_price) >= parseFloat(maxprice)) {
  // console.log('test hellow');return;
$('#error-diamond').text('');
 window.location.href = '/a/productdetails?shape=' + shap + '&stones=' + stones + '&ratio='+selectedValue.value+' &user_price=' + user_price + '&product_id=' + product_id + '&type_choosen=' + selectedValue.value + '&product_price=' + product_price + '&search_type=' + search_type + '&handle=' + handle+ '&shopurl=' + shopurl + '&page=1';
// Enabled on 18-01-2022
return;
 var post_url = 'https://247diamondselector.jewellerybuyer.uk/diamond_selector_CTDMS/ShopifyFront/GetProductDetails?shape=' + shap + '&stones=' + stones + '&user_price=' + user_price + '&product_id=' + product_id + '&type_choosen=' + selectedValue.value + '&product_price=' + product_price + '&search_type=' + search_type + '&handle=' + handle+ '&shopurl=' + shopurl + '&page=1&theme=default'+ '&ratio='+selectedValue.value;
console.log("before ajax");
$.ajax({
url: post_url, // Endpoint URL you've defined in routes
method: 'GET',
  // dataType: 'json',
// data: {'shop': shop_url},
  data: {
    'shape': shap,
    'stones': stones,
    'ratio':  selectedValue.value,
    'user_price': user_price,
    'product_id': product_id,
    'type_choosen': selectedValue.value,
    'product_price': product_price,
    'search_type': search_type,
    'handle': handle,
    'shopurl': shop_url,
    'page': 1
  },
success: function(response){
if (response !== null) {
console.log(response);
console.log("response");
return false;
// Product crate product here
var accesskoken = response; 
//var productData = {product: {title: product_title,body_html: diamond_description,vendor: 'Your Vendor',product_type: 'Your Product Type',tags: 'Diamond, Diamond_hideen, tag3',variants: [{option1:'Default Title',price: diamond_PRICE,sku: 'your-sku',barcode: 'your-barcode',inventory_quantity: 1}], images: [{src: product_image,}],metafields:[{key:"wheel_structurs1tes",value:"6",type:"single_line_text_field",namespace:"custom"}]},};
var productData = {product: {
    shape: shap,
    stones: stones,
    ratio:  selectedValue.value,
    user_price: user_price,
    product_id: product_id,
    type_choosen: selectedValue.value,
    product_price: product_price,
    search_type: search_type,
    handle: handle,
    shopurl: shopurl,
    page: 1
}
};
// Make the API request
$.ajax({
url: 'https://247diamondselector.jewellerybuyer.uk/addproduct',
type: 'GET',
data: {'shop': shop_url, 'dataproduct': productData},
success: function(response) {
console.log('Product created successfully:', response);
// Assuming response contains relevant product information
var productId = response.product.variants[0].id;
var productTitle = response.product.title;  // You can retrieve other relevant data
console.log('Product id:', productId);
// setTimeout(function(){  }, 2000);
$.ajax({
type: 'POST',
url: '/cart/add',
data:{
quantity:1,
id: productId,
properties: {"certificate":diamond_CERTIFICATE,"shape": diamond_SHAPE,"weight":diamond_WEIGHT,"colour": diamond_COLOR,"clarity": diamond_CLARITY,"symmetry": diamond_SYMMETRY}},
dataType: 'json',
success: function(cartResponse) { 
console.log('Product added to cart:', cartResponse);
// window.location.href = '/cart'; 
  fetch('/cart.js')
        .then(response => response.json())
        .then(data => {
            // Update the cart count displayed on the page          
			// $('#cart-icon-bubble span.visually-hidden').text(data.item_count);
			// $('.cart-count-bubble span').text(data.item_count);
            console.log(data.item_count); // Log the updated item count
			
			if($('.cart-count-bubble').length > 0) {
                    	$('.cart-count-bubble span').text(data.item_count)
                    } else {
                        $('#cart-icon-bubble').append(cartBubble);
                    }
			
			
			
			
			
        });
},
error: function(xhr, status, error) {
console.error('Error adding product to cart:', status, error);
}
});                  

},
error: function(error) {
console.error('Error creating product:', error);
},
});
} else {
// Handle the case where the response is null
console.log('The response is null.');
}
},
error: function(xhr, status, error) {
console.log(error); 
}
});


  
} else {
$('#error-diamond').text('Minimum budget should be' + check_price);
}
} 
else {
$('#error-diamond').text('Please enter you budget and proceed, minimum budget should be ' + check_price);
}   
});  
/********************add to cart****************************/
$(document).one('click', '.cardfoliyo_addcart', function () {
var shopurl = Shopify.shop;
var diamond_ID = $('#diamond_ID').val();
var diamond_SKU = $('#diamond_SKU').val();
var diamond_PRICE = $('#diamond_PRICE').val().replace(/,/g, '');
var diamond_CERTIFICATE = $('#diamond_CERTIFICATE').val();
var diamond_SHAPE = $('#diamond_SHAPE').val();
var diamond_WEIGHT = $('#diamond_WEIGHT').val();
var diamond_COLOR = $('#diamond_COLOR').val();
var diamond_CLARITY = $('#diamond_CLARITY').val();
var diamond_MEASUREMENT = $('#diamond_MEASUREMENT').val();
var diamond_SYMMETRY = $('#diamond_SYMMETRY').val();
var diamond_description = $('#diamond_description').val();

var product_title = $('#product_title').val();
var product_sku = $('#product_sku').val();
var product_image = $('#product_image').val();
var product_handle = $('#product_handle').val();        
var image = mainpath +'/assets/ring.png';
console.log('store url',shopurl);
console.log('diamond id', diamond_ID);
console.log('sku', diamond_SKU);
console.log('diamond_PRICE', diamond_PRICE);
console.log('diamond_CERTIFICATE',diamond_CERTIFICATE);
console.log('SHAPE',diamond_SHAPE);
console.log('WEIGHT',diamond_WEIGHT);
console.log('COLOR',diamond_COLOR);
console.log('CLARITY',diamond_CLARITY);
console.log('MEASUREMENT',diamond_MEASUREMENT);
console.log('SYMMETRY',diamond_SYMMETRY);
console.log('description',diamond_description);
console.log('title',product_title);
console.log('sku',product_sku);
console.log('image',product_image);
console.log('title',product_handle);
console.log('sku',image);
/********************************************/ 
$.ajax({
url: 'https://247diamondselector.jewellerybuyer.uk/fetchshop', // Endpoint URL you've defined in routes
method: 'GET',
data: {'shop': shopurl},
success: function(response){
if (response !== null) {

// Product crate product here
var accesskoken = response; 
//var productData = {product: {title: product_title,body_html: diamond_description,vendor: 'Your Vendor',product_type: 'Your Product Type',tags: 'Diamond, Diamond_hideen, tag3',variants: [{option1:'Default Title',price: diamond_PRICE,sku: 'your-sku',barcode: 'your-barcode',inventory_quantity: 1}], images: [{src: product_image,}],metafields:[{key:"wheel_structurs1tes",value:"6",type:"single_line_text_field",namespace:"custom"}]},};
var productData = {product: {
title: product_title + '-' + diamond_ID,
body_html: diamond_description,
vendor: 'Your Vendor',
product_type: 'Your Product Type',
tags: 'Diamond, Diamond_hideen, tag3',
variants: [{option1:'Default Title',price: diamond_PRICE,sku: 'your-sku',barcode: 'your-barcode',inventory_quantity: 1}],
images: [{src: product_image,}],
metafields:[
{key:"certificate",value:diamond_CERTIFICATE,type:"single_line_text_field",namespace:"diamond"},
{key:"shape",value:diamond_SHAPE,type:"single_line_text_field",namespace:"diamond"},
{key:"minimum_total_stone_weight",value:diamond_WEIGHT,type:"single_line_text_field",namespace:"diamond"},
{key:"colour",value:diamond_COLOR,type:"single_line_text_field",namespace:"diamond"},
{key:"clarity",value:diamond_CLARITY,type:"single_line_text_field",namespace:"diamond"},
{key:"symmetry",value:diamond_SYMMETRY,type:"single_line_text_field",namespace:"diamond"}
//{key:"carat",value:diamond_carat,type:"single_line_text_field",namespace:"diamond"},
//{key:"cut",value:diamond_cut,type:"single_line_text_field",namespace:"diamond"},
//{key:"polish",value:diamond_polish,type:"single_line_text_field",namespace:"diamond"},
//{key:"metal",value:diamond_metal,type:"single_line_text_field",namespace:"diamond"},  
//{key:"stones",value:diamond_stones,type:"single_line_text_field",namespace:"diamond"},     
//{key:"principle_stone_shape",value:diamond_principle_stone_shape,type:"single_line_text_field",namespace:"diamond"},     
//{key:"small_diamonds",value:diamond_small_diamonds,type:"single_line_text_field",namespace:"diamond"},
//{key:"qty_of_small_diamonds",value:diamond_small_diamonds,type:"single_line_text_field",namespace:"diamond"},  
//{key:"main_stone",value:diamond_main_stone,type:"single_line_text_field",namespace:"diamond"}
]},};
// Make the API request
$.ajax({
url: 'https://247diamondselector.jewellerybuyer.uk/addproduct',
type: 'GET',
data: {'shop': shopurl, 'dataproduct': productData},
success: function(response) {
console.log('Product created successfully:', response);
// Assuming response contains relevant product information
var productId = response.product.variants[0].id;
var productTitle = response.product.title;  // You can retrieve other relevant data
console.log('Product id:', productId);
// setTimeout(function(){  }, 2000);
$.ajax({
type: 'POST',
url: '/cart/add',
data:{
quantity:1,
id: productId,
properties: {"certificate":diamond_CERTIFICATE,"shape": diamond_SHAPE,"weight":diamond_WEIGHT,"colour": diamond_COLOR,"clarity": diamond_CLARITY,"symmetry": diamond_SYMMETRY}},
dataType: 'json',
success: function(cartResponse) { 
console.log('Product added to cart:', cartResponse);
// window.location.href = '/cart'; 
  fetch('/cart.js')
        .then(response => response.json())
        .then(data => {
            // Update the cart count displayed on the page          
			// $('#cart-icon-bubble span.visually-hidden').text(data.item_count);
			// $('.cart-count-bubble span').text(data.item_count);
            console.log(data.item_count); // Log the updated item count
			
			if($('.cart-count-bubble').length > 0) {
                    	$('.cart-count-bubble span').text(data.item_count)
                    } else {
                        $('#cart-icon-bubble').append(cartBubble);
                    }
			
			
			
			
			
        });
},
error: function(xhr, status, error) {
console.error('Error adding product to cart:', status, error);
}
});                  

},
error: function(error) {
console.error('Error creating product:', error);
},
});
} else {
// Handle the case where the response is null
console.log('The response is null.');
}
},
error: function(xhr, status, error) {
console.log(error); 
}
});
});
/****************end add to cart******************************/

/* Expert Help */
buttonlivechatwidget.addEventListener('click', function (event) {
console.log("Selected buttonringsearch:", product_id);
});    
}
/*Default price get api*/
var shap = document.getElementById('dshape').value;
var product_price = document.getElementById('budget').getAttribute('data-default');
setTimeout(function () {    
if (shap && shap.length > 0) {
var post_url = mainpath + '/ShopifyFront/GetPriceDiamond';
console.log(post_url);
var minpricedimond = product_price.replace(/[\$Â£â‚¬]/g, '').replace(/,/g, '');
$.ajax({
url: post_url,
type: "POST",
data: {'shap': shap,'shopurl':shopurl},
success: function (response) {
var MinimumPrice = numberWithCommas(parseFloat(minpricedimond) + parseFloat(response));
if (response == '') {
$('.ring_price_add').text(product_price);
} else {
$('.ring_price_add').text('£' + MinimumPrice);
}
}
});
}
}, 100);

})();