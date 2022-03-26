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