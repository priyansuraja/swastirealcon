document.addEventListener("DOMContentLoaded", function () {
  console.log("🔥 app.js connected successfully");

  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const dropdown = document.querySelector(".dropdown");
  const dropbtn = document.querySelector(".dropbtn");
  const header = document.querySelector(".navbar");
  const citySearch = document.getElementById("citySearch");
  const propertyCards = document.querySelectorAll(".property-card");
  const filterButtons = document.querySelectorAll(".filter-btn");

  let selectedProperty = {};

  // ================= NAVIGATION =================
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("toggle");
    });
  }

  if (dropbtn && dropdown) {
    dropbtn.addEventListener("click", (e) => {
      e.preventDefault();
      dropdown.classList.toggle("active");
    });
  }

  document.querySelectorAll(".nav-links a").forEach((item) => {
    item.addEventListener("click", () => {
      if (navLinks && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        hamburger?.classList.remove("toggle");
        dropdown?.classList.remove("active");
      }
    });
  });

  if (header) {
    document.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  // ================= CITY FILTER + SCROLL =================
  window.filterCity = function (city, event) {
    const cards = document.querySelectorAll(".property-card");

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    if (event && event.target) {
      event.target.classList.add("active");
    }

    cards.forEach((card) => {
      const cardCity = (card.dataset.city || "").toLowerCase();
      if (city === "all" || cardCity === city.toLowerCase()) {
        card.style.display = "block";
        card.classList.add("show-card");
      } else {
        card.style.display = "none";
        card.classList.remove("show-card");
      }
    });

    const propertiesSection = document.getElementById("properties");
    if (propertiesSection) {
      propertiesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    const cityTitle = document.getElementById("selectedCityTitle");
    if (cityTitle) {
      cityTitle.textContent =
        city === "all"
          ? "Featured Plots"
          : `Plots in ${city.charAt(0).toUpperCase() + city.slice(1)}`;
    }
  };

  // ================= CITY QUICK LINKS =================
  document.querySelectorAll("[data-city-link]").forEach((link) => {
    link.addEventListener("click", function () {
      const city = this.dataset.cityLink;
      window.filterCity(city);
    });
  });

  // ================= PROPERTY SEARCH =================
  if (citySearch) {
    citySearch.addEventListener("input", function () {
      const searchValue = this.value.toLowerCase().trim();

      propertyCards.forEach((card) => {
        const title = card.querySelector("h3")?.innerText.toLowerCase() || "";
        const city = card.dataset.city?.toLowerCase() || "";

        if (title.includes(searchValue) || city.includes(searchValue)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  }

  // ================= PROPERTY SLIDER =================
  window.changeSlide = function (button, direction) {
    const slider = button.parentElement;
    const slides = slider.querySelectorAll(".slide");

    let currentIndex = 0;

    slides.forEach((slide, index) => {
      if (slide.classList.contains("active")) {
        currentIndex = index;
      }
      slide.classList.remove("active");
    });

    let newIndex = currentIndex + direction;
    if (newIndex >= slides.length) newIndex = 0;
    if (newIndex < 0) newIndex = slides.length - 1;

    slides[newIndex].classList.add("active");
  };

  // ================= WHATSAPP MAIN CHAT =================
  window.openChat = function () {
    const message = encodeURIComponent(
      "Hello Swasti Realcon 👋 I am interested in your plots."
    );
    window.location.href = "https://wa.me/919040682791?text=" + message;
  };

  // ================= PROPERTY LEAD POPUP =================
  window.openPopup = function (city, area, price) {
    selectedProperty = { city, area, price };

    const popupProperty = document.getElementById("popupProperty");
    const enquiryPopup = document.getElementById("enquiryPopup");

    if (popupProperty) {
      popupProperty.innerText = `${city} | ${area} | ₹${price}`;
    }
    if (enquiryPopup) {
      enquiryPopup.style.display = "flex";
    }
  };

  window.closePopup = function () {
    const enquiryPopup = document.getElementById("enquiryPopup");
    if (enquiryPopup) {
      enquiryPopup.style.display = "none";
    }
  };

  window.submitLead = function () {
    const name = document.getElementById("leadName")?.value.trim();
    const phone = document.getElementById("leadPhone")?.value.trim();

    if (!name || !phone) {
      alert("Please fill all details");
      return;
    }

    const message = encodeURIComponent(
      `Hello Swasti Realcon 👋

I am interested in this property.

Name: ${name}
Phone: ${phone}
City: ${selectedProperty.city}
Area: ${selectedProperty.area}
Price: ${selectedProperty.price}

Please contact me.`
    );

    window.open(`https://wa.me/919040682791?text=${message}`, "_blank");

    closePopup();
    document.getElementById("leadName").value = "";
    document.getElementById("leadPhone").value = "";
  };

  // ================= EMI CALCULATOR =================
  window.calculateEMI = function () {
    const price = parseFloat(document.getElementById("price")?.value || 0);
    const down = parseFloat(document.getElementById("down")?.value || 0);
    const rate = parseFloat(document.getElementById("rate")?.value || 0);
    const years = parseFloat(document.getElementById("years")?.value || 0);

    if (!price || !rate || !years) {
      alert("Please fill all required fields");
      return;
    }

    const loanAmount = price - down;
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;

    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    document.getElementById("emi-result").innerText =
      "Monthly EMI: ₹ " + emi.toFixed(0);
  };

  // ================= BOOKING MODAL =================
  const openBooking = document.getElementById("openBooking");
  const bookingModal = document.getElementById("bookingModal");
  const closeBooking = document.getElementById("closeBooking");
  const visitDate = document.getElementById("visitDate");

  if (openBooking && bookingModal) {
    openBooking.addEventListener("click", function (e) {
      e.preventDefault();
      bookingModal.style.display = "flex";
    });
  }

  if (closeBooking && bookingModal) {
    closeBooking.addEventListener("click", function () {
      bookingModal.style.display = "none";
    });
  }

  window.addEventListener("click", function (e) {
    if (e.target === bookingModal) {
      bookingModal.style.display = "none";
    }
  });

  if (visitDate) {
    const today = new Date().toISOString().split("T")[0];
    visitDate.setAttribute("min", today);
  }

  window.bookVisit = function () {
    const name = document.getElementById("visitName")?.value.trim();
    const phone = document.getElementById("visitPhone")?.value.trim();
    const date = document.getElementById("visitDate")?.value;
    const time = document.getElementById("visitTime")?.value;

    if (!name || !phone || !date || !time) {
      alert("Please fill all details");
      return;
    }

    const message = encodeURIComponent(
      `Hello, I want to schedule a site visit.

Name: ${name}
Phone: ${phone}
Date: ${date}
Time: ${time}`
    );

    window.open(`https://wa.me/919040682791?text=${message}`, "_blank");
  };
});
