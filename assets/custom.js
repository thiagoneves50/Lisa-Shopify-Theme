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
