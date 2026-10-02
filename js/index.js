// start Theme toggle
var bodyElement = document.body;
var htmlElement = document.documentElement;
var themeToggleBtn = document.getElementById("theme-toggle-button");
var savedTheme = localStorage.getItem("theme");
if (savedTheme == "dark") {
  htmlElement.classList.add("dark");
} else {
  htmlElement.classList.remove("dark");
}
themeToggleBtn.addEventListener("click", function () {
  htmlElement.classList.toggle("dark");
  if (htmlElement.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "");
  }
});
// end Theme toggle

// start settings
var settingsToggle = document.getElementById("settings-toggle");
var settingsSidebar = document.getElementById("settings-sidebar");
var closeSettingsBtn = document.getElementById("close-settings");
var themeColorsGrid = document.getElementById("theme-colors-grid");
var fontOptions = document.querySelectorAll(".font-option");
var resetSettings = document.getElementById("reset-settings");

settingsToggle.addEventListener("click", function () {
  settingsSidebar.classList.toggle(`translate-x-full`);
  if (settingsSidebar.classList.contains("translate-x-full")) {
    settingsToggle.style.right = 0 + "px";
  } else {
    settingsToggle.style.right = 320 + "px";
  }
});

closeSettingsBtn.addEventListener("click", function () {
  settingsSidebar.classList.add(`translate-x-full`);
  settingsToggle.style.right = 0 + "px";
});

// control color theme***************************
var themes = [
  {
    name: "Purple Blue",
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent: "#a855f7",
  },
  {
    name: "Pink Orange",
    primary: "#ec4899",
    secondary: "#f97316",
    accent: "#fb923c",
  },
  {
    name: "Green Emerald",
    primary: "#10b981",
    secondary: "#059669",
    accent: "#34d399",
  },
  {
    name: "Blue Cyan",
    primary: "#3b82f6",
    secondary: "#06b6d4",
    accent: "#22d3ee",
  },
  {
    name: "Red Rose",
    primary: "#ef4444",
    secondary: "#f43f5e",
    accent: "#fb7185",
  },
  {
    name: "Amber Orange",
    primary: "#f59e0b",
    secondary: "#ea580c",
    accent: "#fbbf24",
  },
];

if (
  localStorage.getItem("saved-primary") &&
  localStorage.getItem("saved-secondary")
) {
  htmlElement.style.setProperty(
    "--color-primary",
    localStorage.getItem("saved-primary"),
  );
  htmlElement.style.setProperty(
    "--color-secondary",
    localStorage.getItem("saved-secondary"),
  );
  htmlElement.style.setProperty(
    "--color-accent",
    localStorage.getItem("saved-accent"),
  );
}
for (let i = 0; i < themes.length; i++) {
  let colorBtn = document.createElement("button");
  colorBtn.className =
    "w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm";
  colorBtn.style.background = `linear-gradient(135deg, ${themes[i].primary}, ${themes[i].secondary})`;
  colorBtn.setAttribute("title", themes[i].name);
  colorBtn.setAttribute("data-primary", themes[i].primary);
  colorBtn.setAttribute("data-secondary", themes[i].secondary);
  colorBtn.setAttribute("data-accent", themes[i].accent);
  if (themes[i].primary == localStorage.getItem("saved-primary")) {
    colorBtn.classList.add(
      "ring-offset-2",
      "ring-primary",
      "ring-2",
      "ring-offset-white",
    );
  }
  colorBtn.addEventListener("click", function () {
    htmlElement.style.setProperty("--color-primary", `${themes[i].primary}`);
    htmlElement.style.setProperty(
      "--color-secondary",
      `${themes[i].secondary}`,
    );
    htmlElement.style.setProperty("--color-accent", `${themes[i].accent}`);

    let allBtns = themeColorsGrid.querySelectorAll("button");
    for (let i = 0; i < allBtns.length; i++) {
      allBtns[i].classList.remove(
        "ring-offset-2",
        "ring-primary",
        "ring-2",
        "ring-offset-white",
      );
    }
    colorBtn.classList.add(
      "ring-offset-2",
      "ring-primary",
      "ring-2",
      "ring-offset-white",
    );
    localStorage.setItem("saved-primary", `${themes[i].primary}`);
    localStorage.setItem("saved-secondary", `${themes[i].secondary}`);
    localStorage.setItem("saved-accent", `${themes[i].accent}`);
  });
  themeColorsGrid.appendChild(colorBtn);
}
// control font *****************
for (let i = 0; i < fontOptions.length; i++) {
  let selectedFont = fontOptions[i].getAttribute("data-font");
  if (selectedFont == localStorage.getItem("saved-font")) {
    bodyElement.classList.remove(
      "font-tajawal",
      "font-cairo",
      "font-alexandria",
    );
    bodyElement.classList.add(`font-${selectedFont}`);
    fontOptions[i].classList.add(
      "active",
      "border-primary",
      "bg-slate-50",
      "dark:bg-slate-800",
    );
  }
  fontOptions[i].addEventListener("click", function () {
    bodyElement.classList.remove(
      "font-tajawal",
      "font-cairo",
      "font-alexandria",
    );
    bodyElement.classList.add(`font-${selectedFont}`);
    for (let j = 0; j < fontOptions.length; j++) {
      if (fontOptions[j].getAttribute("data-font") == selectedFont) {
        fontOptions[j].classList.add(
          "active",
          "border-primary",
          "bg-slate-50",
          "dark:bg-slate-800",
        );
      } else {
        fontOptions[j].classList.remove(
          "active",
          "border-primary",
          "bg-slate-50",
          "dark:bg-slate-800",
        );
      }
    }
    localStorage.setItem("saved-font", selectedFont);
  });
}
//reset settings *****************
resetSettings.addEventListener("click", function () {
  let defaultFont = "tajawal";
  bodyElement.classList.remove("font-cairo", "font-alexandria");
  bodyElement.classList.add(`font-${defaultFont}`);
  localStorage.setItem("saved-font", defaultFont);
  for (let i = 0; i < fontOptions.length; i++) {
    if (fontOptions[i].getAttribute("data-font") == defaultFont) {
      fontOptions[i].classList.add(
        "active",
        "border-primary",
        "bg-slate-50",
        "dark:bg-slate-800",
      );
    } else {
      fontOptions[i].classList.remove(
        "active",
        "border-primary",
        "bg-slate-50",
        "dark:bg-slate-800",
      );
    }
  }
  htmlElement.style.setProperty("--color-primary", `${themes[0].primary}`);
  htmlElement.style.setProperty("--color-secondary", `${themes[0].secondary}`);
  htmlElement.style.setProperty("--color-accent", `${themes[0].accent}`);
  localStorage.setItem("saved-primary", `${themes[0].primary}`);
  localStorage.setItem("saved-secondary", `${themes[0].secondary}`);
  localStorage.setItem("saved-accent", `${themes[0].accent}`);
});
// End settings
// Start Portofolio
var allPortofolioBtns = document.querySelectorAll(".portfolio-filter");
var portfolioItems = document.querySelectorAll(".portfolio-item");

for (let i = 0; i < allPortofolioBtns.length; i++) {
  let selectedBtn = allPortofolioBtns[i];
  selectedBtn.addEventListener("click", function () {
    for (let k = 0; k < allPortofolioBtns.length; k++) {
      allPortofolioBtns[k].classList.remove(
        "active",
        "bg-linear-to-r",
        "from-primary",
        "to-secondary",
        "text-white",
      );
      allPortofolioBtns[k].classList.add(
        "border",
        "border-slate-300",
        "dark:border-slate-700",
      );
    }
    this.classList.add(
      "active",
      "bg-linear-to-r",
      "from-primary",
      "to-secondary",
      "text-white",
    );
    this.classList.remove(
      "border",
      "border-slate-300",
      "dark:border-slate-700",
    );
    for (let j = 0; j < portfolioItems.length; j++) {
      let selectedItem = portfolioItems[j];
      if (
        selectedBtn.getAttribute("data-filter") == "all" ||
        selectedBtn.getAttribute("data-filter") ==
          selectedItem.getAttribute("data-category")
      ) {
        selectedItem.style.display = "block";
        setTimeout(function () {
          selectedItem.classList.remove("opacity-0", "scale-95");
          selectedItem.classList.add("opacity-100", "scale-100");
        }, 10);
      } else {
        selectedItem.classList.remove("opacity-100", "scale-100");
        selectedItem.classList.add("opacity-0", "scale-95");

        setTimeout(function () {
          selectedItem.style.display = "none";
        }, 300);
      }
    }
  });
}

//ُend portofolio*********************************************
// Start coursel section
var testimonialsCarousel = document.getElementById("testimonials-carousel");
var testimonialCards = document.querySelectorAll(".testimonial-card");
var carouselIndicators = document.querySelectorAll(".carousel-indicator");
var nextTestimonial = document.getElementById("next-testimonial");
var prevTestimonial = document.getElementById("prev-testimonial");
let currentIndx = 0;
let totalCardsCount = testimonialCards.length;
carouselIndicators[0].classList.add("active", "bg-accent", "scale-125");

function getVisibleCards() {
  if (window.innerWidth < 640) {
    return 1;
  } else if (window.innerWidth < 1024) {
    return 2;
  } else {
    return 3;
  }
}
let visibleCards = getVisibleCards();
let maxSteps = totalCardsCount - visibleCards;
function updateSlider() {
  visibleCards = getVisibleCards();
  maxSteps = totalCardsCount - visibleCards;
  if (currentIndx > maxSteps) {
    currentIndx = maxSteps;
  }
  if (currentIndx < 0) {
    currentIndx = 0;
  }
  let sliderMovePercent = 100 / visibleCards;
  testimonialsCarousel.style.transform = `translateX(${currentIndx * sliderMovePercent}%)`;
  for (let i = 0; i < carouselIndicators.length; i++) {
    carouselIndicators[i].classList.add("bg-slate-400", "dark:bg-slate-600");
    carouselIndicators[i].classList.remove("active", "bg-accent", "scale-125");
  }
  if (carouselIndicators[currentIndx]) {
    carouselIndicators[currentIndx].classList.remove(
      "bg-slate-400",
      "dark:bg-slate-600",
    );
    carouselIndicators[currentIndx].classList.add(
      "active",
      "bg-accent",
      "scale-125",
    );
  }
}

nextTestimonial.addEventListener("click", function () {
  if (currentIndx < maxSteps) {
    currentIndx++;
  } else {
    currentIndx = 0;
  }
  updateSlider();
});
prevTestimonial.addEventListener("click", function () {
  if (currentIndx > 0) {
    currentIndx--;
  } else {
    currentIndx = maxSteps;
  }
  updateSlider();
});
function getSlidStep() {
  let slideWidth = window.innerWidth;
  if (slideWidth < 640) {
    return 100;
  } else if (slideWidth < 1024) {
    return 50;
  } else {
    return 33.3;
  }
}
let SlidStepPercent = getSlidStep();
window.addEventListener("resize", function () {
  SlidStepPercent = getSlidStep();
});
nextTestimonial.addEventListener("click", function () {
  currentIndx++;
  if (currentIndx > 3) {
    currentIndx = 0;
  }
  testimonialsCarousel.style.transform = `translateX(${currentIndx * SlidStepPercent}%)`;
});
prevTestimonial.addEventListener("click", function () {
  currentIndx--;
  if (currentIndx < 0) {
    currentIndx = 3;
  }
  testimonialsCarousel.style.transform = `translateX(${currentIndx * SlidStepPercent}%)`;
});

for (let i = 0; i < carouselIndicators.length; i++) {
  let carouselIndicator = carouselIndicators[i];
  carouselIndicator.addEventListener("click", function () {
    currentIndx = i;
    updateSlider();
  });
}
window.addEventListener("resize", updateSlider);
updateSlider();

// End coursel section

// start form
function setupDropdowns() {
  let dropdownBoxes = document.getElementsByClassName("custom-select");
  let totalBoxes = dropdownBoxes.length;

  for (let i = 0; i < totalBoxes; i++) {
    let currentBox = dropdownBoxes[i];
    let textSpan = currentBox.querySelector(".selected-text");
    let arrowIcon = currentBox.querySelector(".fa-chevron-down");
    let listMenu = currentBox.nextElementSibling;
    let listItems = listMenu.getElementsByClassName("custom-option");

    currentBox.addEventListener("click", function (evt) {
      evt.stopPropagation();

      let allMenus = document.getElementsByClassName("custom-options");
      for (let m = 0; m < allMenus.length; m++) {
        let isSameMenu = allMenus[m] === listMenu;
        if (isSameMenu === false) {
          allMenus[m].classList.add("hidden");
          allMenus[m].previousElementSibling.querySelector(
            ".fa-chevron-down",
          ).style.transform = "rotate(0deg)";
        }
      }

      let isMenuHidden = listMenu.classList.contains("hidden");
      if (isMenuHidden === true) {
        listMenu.classList.remove("hidden");
        arrowIcon.style.transform = "rotate(180deg)";
      } else {
        listMenu.classList.add("hidden");
        arrowIcon.style.transform = "rotate(0deg)";
      }
    });

    for (let j = 0; j < listItems.length; j++) {
      let item = listItems[j];
      item.addEventListener("click", function (evt) {
        evt.stopPropagation();

        textSpan.innerText = item.getAttribute("data-value");
        textSpan.className = "selected-text text-slate-800 dark:text-white";

        for (let k = 0; k < listItems.length; k++) {
          listItems[k].classList.remove("bg-primary/10");
        }
        item.classList.add("bg-primary/10");

        listMenu.classList.add("hidden");
        arrowIcon.style.transform = "rotate(0deg)";
      });
    }
  }

  document.addEventListener("click", function () {
    let allMenus = document.getElementsByClassName("custom-options");
    for (let x = 0; x < allMenus.length; x++) {
      allMenus[x].classList.add("hidden");
      allMenus[x].previousElementSibling.querySelector(
        ".fa-chevron-down",
      ).style.transform = "rotate(0deg)";
    }
  });
}

function setupContactValidation() {
  let contactForm = document.querySelector("form");

  let isFormMissing = contactForm === null;
  if (isFormMissing === true) {
    return;
  }

  contactForm.setAttribute("novalidate", "true");

  let formFields = contactForm.querySelectorAll("input, textarea");
  let fieldIdentifiers = ["fld-name", "fld-mail", "fld-phone", "fld-msg"];

  for (let i = 0; i < formFields.length; i++) {
    let currentField = formFields[i];
    if (i < fieldIdentifiers.length) {
      currentField.id = fieldIdentifiers[i];
      let labelNode = currentField.previousElementSibling;
      let isLabelMissing = labelNode === null;

      if (isLabelMissing === false) {
        let isLabel = labelNode.tagName.toLowerCase() === "label";
        if (isLabel === true) {
          labelNode.setAttribute("for", currentField.id);
        }
      }
    }
  }

  function clearOldErrors() {
    let errorTxts = contactForm.getElementsByClassName("error-message");
    while (errorTxts.length > 0) {
      errorTxts[0].parentNode.removeChild(errorTxts[0]);
    }

    let errorBorders = contactForm.getElementsByClassName("border-red-500");
    while (errorBorders.length > 0) {
      errorBorders[0].classList.remove("border-red-500");
    }
  }

  function printError(inputField, txt) {
    let warning = document.createElement("p");
    warning.className = "error-message text-red-500 text-sm mt-2 font-semibold";
    warning.innerText = txt;

    let isDropdown = inputField.classList.contains("custom-select-wrapper");
    if (isDropdown === true) {
      inputField.appendChild(warning);
    } else {
      inputField.classList.add("border-red-500");
      inputField.parentNode.appendChild(warning);
    }
  }

  contactForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    clearOldErrors();

    let isFormValid = true;

    let fName = contactForm.querySelector('input[type="text"]');
    let fMail = contactForm.querySelector('input[type="email"]');
    let fPhone = contactForm.querySelector('input[type="tel"]');
    let fMsg = contactForm.querySelector("textarea");
    let dropType = contactForm.querySelector(
      '.custom-select[data-name="project-type"] .selected-text',
    );

    let isNameEmpty = fName.value.trim() === "";
    if (isNameEmpty === true) {
      printError(fName, "الاسم الكامل مطلوب للإرسال");
      isFormValid = false;
    }

    let mailValue = fMail.value.trim();
    let mailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isMailEmpty = mailValue === "";

    if (isMailEmpty === true) {
      printError(fMail, "البريد الإلكتروني لا يمكن أن يكون فارغاً");
      isFormValid = false;
    } else {
      let isMailValid = mailPattern.test(mailValue);
      if (isMailValid === false) {
        printError(fMail, "يرجى كتابة بريد إلكتروني بصيغة صحيحة");
        isFormValid = false;
      }
    }

    let phoneValue = fPhone.value.trim();
    let phonePattern =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    let isPhoneEmpty = phoneValue === "";

    if (isPhoneEmpty === false) {
      let isPhoneValid = phonePattern.test(phoneValue.replace(/\s/g, ""));
      if (isPhoneValid === false) {
        printError(fPhone, "الرقم المدخل غير صالح");
        isFormValid = false;
      }
    }

    let isDropTypeMissing = dropType === null;
    if (isDropTypeMissing === false) {
      let isNotChosen = dropType.innerText.trim() === "اختر نوع المشروع";
      if (isNotChosen === true) {
        let wrapperNode = dropType.closest(".custom-select-wrapper");
        wrapperNode
          .querySelector(".custom-select")
          .classList.add("border-red-500");
        printError(wrapperNode, "حدد نوع مشروعك من القائمة");
        isFormValid = false;
      }
    }
    let msgValue = fMsg.value.trim();
    let isMsgEmpty = msgValue === "";

    if (isMsgEmpty === true) {
      printError(fMsg, "لا تنسَ كتابة تفاصيل مشروعك");
      isFormValid = false;
    } else {
      let isMsgTooShort = msgValue.length < 10;
      if (isMsgTooShort === true) {
        printError(fMsg, "تفاصيل المشروع قصيرة جداً (أقل من 10 أحرف)");
        isFormValid = false;
      }
    }
    if (isFormValid === true) {
      triggerSuccessPopup();
      contactForm.reset();

      let allSelectedLabels =
        contactForm.getElementsByClassName("selected-text");
      for (let c = 0; c < allSelectedLabels.length; c++) {
        allSelectedLabels[c].className =
          "selected-text text-slate-500 dark:text-slate-400";
      }

      let typeLabel = contactForm.querySelector(
        '.custom-select[data-name="project-type"] .selected-text',
      );
      let budgetLabel = contactForm.querySelector(
        '.custom-select[data-name="budget"] .selected-text',
      );

      let isTypeLabelMissing = typeLabel === null;
      if (isTypeLabelMissing === false) {
        typeLabel.innerText = "اختر نوع المشروع";
      }

      let isBudgetLabelMissing = budgetLabel === null;
      if (isBudgetLabelMissing === false) {
        budgetLabel.innerText = "اختر الميزانية";
      }
    }
  });
  function triggerSuccessPopup() {
    let successMessage = document.createElement("div");
    successMessage.className =
      "fixed inset-0 flex items-center justify-center z-50 bg-slate-950/80 backdrop-blur-sm";
    successMessage.innerHTML = `
            <div class="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-2xl text-center max-w-sm mx-4 transform transition-all">
                <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                    <i class="fa-solid fa-check"></i>
                </div>
                <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-2">تم الإرسال بنجاح!</h3>
                <p class="text-slate-600 dark:text-slate-300 mb-6">شكراً لتواصلك معنا، سنقوم بالرد عليك في أقرب وقت.</p>
                <button class="bg-primary hover:opacity-90 text-white font-medium py-2 px-6 rounded-lg w-full transition-colors close-modal-btn">حسناً</button>
            </div>
        `;

    document.body.appendChild(successMessage);

    successMessage
      .querySelector(".close-modal-btn")
      .addEventListener("click", function () {
        successMessage.remove();
      });
  }
}

setupDropdowns();
setupContactValidation();

//scroll to top

function scrollToTop() {
    let scrollBtn = document.getElementById("scroll-to-top");
    if (scrollBtn == false){
        return;
    } 

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
        scrollBtn.classList.remove("opacity-0", "invisible");
        scrollBtn.classList.add("opacity-100", "visible");
        } else {
        scrollBtn.classList.remove("opacity-100", "visible");
        scrollBtn.classList.add("opacity-0", "invisible");
        }
    });

    scrollBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
    }
scrollToTop();

// //spy links
function linksSpy() {
    let sections = document.querySelectorAll("section[id]");
    let navItems = document.querySelectorAll('.nav-links a[href^="#"]');

    function setSectionActive() {
        let currentSection = "";
        for (let i = 0; i < sections.length; i++) {
        let sectionTop = sections[i].offsetTop;
        if (window.scrollY >= sectionTop - 100) {
            currentSection = sections[i].getAttribute("id");
        }
        }
        for (let j = 0; j < navItems.length; j++) {
        navItems[j].classList.remove("active");
        if (navItems[j].getAttribute("href") === `#${currentSection}`) {
            navItems[j].classList.add("active");
        }
        }
    }

    window.addEventListener("scroll", setSectionActive);
    setSectionActive();
    }
linksSpy();
