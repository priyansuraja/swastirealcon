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
	const message = encodeURIComponent(
	  "Hello Swasti Realcon 👋\n" +
	  "I am interested in your residential plots.\n" +
	  "Please share more details."
	);
  
	window.open(
	  "https://wa.me/919040682791?text=" + message,
	  "_blank"
	);
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

function sendPropertyLead(city, area, price) {
	const message = encodeURIComponent(
	  "Hello Swasti Realcon 👋\n\n" +
	  "I am interested in a residential plot.\n\n" +
	  "📍 City: " + city + "\n" +
	  "📐 Area: " + area + "\n" +
	  "💰 Price: " + price + "\n\n" +
	  "Please arrange a site visit."
	);
  
	window.open(
	  "https://wa.me/919040682791?text=" + message,
	  "_blank"
	);
  }



  function calculateEMI() {
	const price = document.getElementById("price").value;
	const down = document.getElementById("down").value;
	const rate = document.getElementById("rate").value;
	const years = document.getElementById("years").value;
  
	if (!price || !rate || !years) {
	  alert("Please fill all required fields");
	  return;
	}
  
	const loanAmount = price - (down || 0);
	const monthlyRate = rate / 12 / 100;
	const months = years * 12;
  
	const emi =
	  (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
	  (Math.pow(1 + monthlyRate, months) - 1);
  
	document.getElementById("emi-result").innerText =
	  "Monthly EMI: ₹ " + emi.toFixed(0);
  }
  
  



  

