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
const cartItems = document.querySelectorAll('input[data-line-item]')
const lineNumbers = [];
cartItems.forEach((element, index) => {	
	let lineStr = element.dataset.lineItem
	let line = parseInt(lineStr)
	lineNumbers[index] = line
	console.log(line);
	console.log(lineNumbers);
});

getItems.addEventListener('click', function(){
	console.log('getting cart items');
	fetch('/?view=cart-drawer')
		.then(response => { 
			return response.text() 
		})
		.then(data => {
			console.log(data);
			ajaxCartContainer.innerHTML = data
			
		})
})
// addItem.addEventListener('click', function(){
// 	console.log('adding 1 item');

// 	let formData = {
// 		'updates': [{
// 		 'id': 36110175633573,
// 		 'quantity': 2
// 		 }]
// 	 };	


// 	fetch('/?view=cart-drawer')
// 		.then(response => { 
// 			return response.text() 
// 		})
// 		.then(data => {
// 			console.log(data);
// 			ajaxCartContainer.innerHTML = data
			
// 		})
// })
addItem.forEach(item => {
	item.addEventListener('click', function(event){
		console.log(getLineCartItem(event))
		console.log(getLineCartItemQty(event))
		let cartLineItem = getLineCartItem(event)
		let cartLineItemQty = getLineCartItemQty(event)

		updateQuantity(cartLineItem, ++cartLineItemQty)
		
		
	})	
});

function getLineCartItem(event) {
	return parseInt(event.target.previousElementSibling.dataset.lineItem);
}
function getLineCartItemQty(event) {
	return parseInt(event.target.previousElementSibling.value);
}

function updateQuantity(line, qty) {
	fetch('/cart/change.js', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			line: line,
			quantity: qty
		})
	}).then(function (response) {
		console.log('iniciando');
		return response.json();
	}).then(function (data) {
		// fire javascript event on window
		setTimeout(() => {
			console.log(data);
			fetch('/?view=cart-drawer')
		.then(response => { 
			return response.text() 
		})
		.then(data => {
			console.log(data);
			ajaxCartContainer.innerHTML = data
			
		})

		}, 500)
	})["catch"](function (error) {
		console.error('Error:', error);
	});
}

