document.addEventListener("DOMContentLoaded", function () {

console.log("🔥 app.js connected successfully");

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const dropdown = document.querySelector('.dropdown');
const dropbtn = document.querySelector('.dropbtn');
const header = document.querySelector('.navbar');

// ✅ SAFE EVENT BINDING
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });
}

if (dropbtn && dropdown) {
    dropbtn.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-links a').forEach(item => {
    item.addEventListener('click', () => {
        if(navLinks && navLinks.classList.contains('active')){
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
            dropdown.classList.remove('active');
        }
    });
});

if (header) {
    document.addEventListener('scroll', () => {
        if(window.scrollY > 250){
            header.style.backgroundColor = '#29323c';
        } else {
            header.style.backgroundColor = 'rgba(0,0,0,0.8)';
        }
    });
}

}); // ✅ END

/* ================= CHATBOT ================= */
function openChat() {
    const message = encodeURIComponent(
      "Hello Swasti Realcon 👋 I am interested in your plots."
    );

    window.location.href =
      "https://wa.me/916281636780?text=" + message;
}

/* ================= PROPERTY FILTER ================= */
function filterCity(city, event) {
    const cards = document.querySelectorAll('.property-card');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => btn.classList.remove('active'));
    if(event) event.target.classList.add('active');

    cards.forEach(card => {
        if (city === 'all' || card.dataset.city === city) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

/* ================= WHATSAPP PROPERTY LEAD ================= */
function sendPropertyLead(city, area, price) {
    const message = encodeURIComponent(
      "Hello Swasti Realcon 👋\n\n" +
      "I am interested in a residential plot.\n\n" +
      "📍 City: " + city + "\n" +
      "📐 Area: " + area + "\n" +
      "💰 Price: " + price + "\n\n" +
      "Please arrange a site visit."
    );

    window.location.href =
      "https://wa.me/916281636780?text=" + message;
}

/* ================= EMI ================= */
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




