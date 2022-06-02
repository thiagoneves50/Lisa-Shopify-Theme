// START - Tabs Section
console.log("hello from tabs");
const titleBtns = document.querySelectorAll('.title-btn');
console.log('titleBtns:', titleBtns)
const contents = document.querySelectorAll('.content');

// Change Tabs
function changeTab(tabIndex) {
  // Remove active class
  titleBtns.forEach((titleBtn) => {
    titleBtn.className = "title-btn"
  })
  contents.forEach((content) => {
    content.className = "content"
  })

  // Add active class
  titleBtns[tabIndex].classList.add("active")
  contents[tabIndex].classList.add("active")
}

// Event listeners
titleBtns.forEach((titleBtn, index) => {
  titleBtn.addEventListener('click', () => {
    changeTab(index);
  })
})

// END - Tabs Section

// START - Slick Slider Section
$(document).ready(function () {
	$(".testimonial-slider").slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: true,
		arrows: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	});
});
// END - Slick Slider Section

// START - Ajax Cart
console.log('this is ajax cart');

const ajaxCartContainer = document.querySelector('#ajax-cart-template');
const getItems = document.querySelector('.cart-button');
const addItem = document.querySelectorAll('.cart-add-button');
const subtractItem = document.querySelectorAll('.cart-minus-button');
const cartItemsInputs = document.querySelectorAll('input[data-line-item]');
const lineNumbers = [];

// Store line_item numbers inside lineNumbers array
cartItemsInputs.forEach((element, index) => {	
	let lineStr = element.dataset.lineItem
	let line = parseInt(lineStr)
	lineNumbers[index] = line
	console.log(line);
	console.log(lineNumbers);
});

// test grabing cart html from 'layout none' cart template
getItems.addEventListener('click', function(){
	getCartItems()
})

// Get cart html from 'layout none' cart template
function getCartItems() {
	console.log('Fetching cart items');
	fetch('/?view=cart-drawer')
		.then(response => { 
			return response.text() 
		})
		.then(data => {
			console.log(data);
			ajaxCartContainer.innerHTML = data			
		})
}

// Adds cart update function to all Add buttons
addItem.forEach(item => {
	item.addEventListener('click', function(event){
		console.log(getLineCartItem(event))
		console.log(getLineCartItemQty(event))
		let cartLineItem = getLineCartItem(event)
		let cartLineItemQty = getLineCartItemQty(event)
		// Calls update function on click and adds +1 to item
		updateQuantity(cartLineItem, ++cartLineItemQty)			
	})	
});

// Adds cart update function to all Minus buttons
// ...

// Get line_item from item
function getLineCartItem(event) {
	return parseInt(event.target.previousElementSibling.dataset.lineItem);
}
// Get quantity from line_item
function getLineCartItemQty(event) {
	return parseInt(event.target.previousElementSibling.value);
}
// Updates the cart line_item
function updateQuantity(line, qty) {
	let formData = {
		line: line,
		quantity: qty
	}
	
	fetch('/cart/change.js', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(formData)
	}).then(function (response) {
		return response.json();
	}).then(function (data) {
		// get cart items and print on the screen
		getCartItems()
	})["catch"](function (error) {
		console.error('Error:', error);
	});
}

