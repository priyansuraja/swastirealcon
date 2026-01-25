/* ================= NAVBAR / HAMBURGER MENU ================= */

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const dropdown = document.querySelector('.dropdown');
const dropbtn = document.querySelector('.dropbtn');
const header = document.querySelector('.navbar');

// Hamburger click - slide mobile menu
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // mobile menu slide
    hamburger.classList.toggle('toggle'); // animate hamburger
});

// Dropdown toggle for mobile
dropbtn.addEventListener('click', (e) => {
    e.preventDefault(); // prevent page jump
    dropdown.classList.toggle('active');
});

// Close mobile menu when any link clicked
document.querySelectorAll('.nav-links a').forEach(item => {
    item.addEventListener('click', () => {
        if(navLinks.classList.contains('active')){
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
            dropdown.classList.remove('active'); // close dropdown too
        }
    });
});

// Header scroll effect
document.addEventListener('scroll', () => {
    if(window.scrollY > 250){
        header.style.backgroundColor = '#29323c';
    } else {
        header.style.backgroundColor = 'rgba(0,0,0,0.8)';
    }
});

/* ================= CHATBOT ================= */
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

/* ================= PROPERTY FILTER ================= */
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

/* ================= PROPERTY LEAD ================= */
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

/* ================= EMI CALCULATOR ================= */
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
