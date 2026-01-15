/* ================= NAVBAR / HAMBURGER MENU ================= */

const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});

document.addEventListener('scroll', () => {
	var scroll_position = window.scrollY;
	if (scroll_position > 250) {
		header.style.backgroundColor = '#29323c';
	} else {
		header.style.backgroundColor = 'transparent';
	}
});

menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		mobile_menu.classList.toggle('active');
	});
});


function closeChatbot() {
	document.getElementById("chatbotPopup").style.display = "none";
  }
  
  function openChat() {
	alert("Chat window will open here!");
	// Later you can connect WhatsApp, Tawk.to, Botpress, etc.
  }
  

function filterCity(city) {
  const cards = document.querySelectorAll('.property-card');
  const buttons = document.querySelectorAll('.filter-btn');

  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  cards.forEach(card => {
    if (city === 'all' || card.dataset.city === city) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}



  


