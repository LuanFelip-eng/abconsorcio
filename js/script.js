/* =========================================================
   ABCON INVESTIMENTOS
   SCRIPT PRINCIPAL
========================================================= */


/* =========================================================
   DADOS DA SIMULAÇÃO
========================================================= */

const data = {

  types: [

    {
      id: "imovel",
      label: "Imóvel",
      icon: "⌂",
      min: 80000,
      max: 900000,
      step: 5000,
      prazos: [120, 150, 180, 200]
    },

    {
      id: "auto",
      label: "Automóvel",
      icon: "🚗",
      min: 30000,
      max: 250000,
      step: 2000,
      prazos: [48, 60, 72, 80]
    },

    {
      id: "moto",
      label: "Moto",
      icon: "🏍️",
      min: 15000,
      max: 80000,
      step: 1000,
      prazos: [36, 48, 60, 72]
    }

  ],


  steps: [

    {
      icon: "1",
      title: "Escolha seu objetivo",
      text: "Defina o bem que deseja conquistar."
    },

    {
      icon: "2",
      title: "Faça sua simulação",
      text: "Escolha o valor e o prazo ideal."
    },

    {
      icon: "3",
      title: "Analise seu plano",
      text: "Nossa equipe apresenta as melhores opções."
    },

    {
      icon: "4",
      title: "Entre para o grupo",
      text: "Formalize sua participação no consórcio."
    },

    {
      icon: "5",
      title: "Acompanhe sua cota",
      text: "Conte com acompanhamento especializado."
    },

    {
      icon: "6",
      title: "Seja contemplado",
      text: "Use seu crédito para realizar seu objetivo."
    }

  ],


  benefits: [

    {
      icon: "💰",
      title: "Sem juros bancários",
      text: "Uma alternativa planejada para conquistar seu patrimônio."
    },

    {
      icon: "📊",
      title: "Planejamento",
      text: "Escolha valores e prazos de acordo com seu planejamento."
    },

    {
      icon: "🛡️",
      title: "Segurança",
      text: "Conte com acompanhamento durante toda sua jornada."
    },

    {
      icon: "🎯",
      title: "Flexibilidade",
      text: "Opções para imóveis, automóveis e motos."
    },

    {
      icon: "🤝",
      title: "Atendimento humano",
      text: "Nossa equipe está pronta para ajudar você."
    },

    {
      icon: "🚀",
      title: "Seu objetivo mais perto",
      text: "Transforme seu planejamento em uma conquista."
    }

  ],


  testimonials: [

    {
      quote:
        "A equipe da Abcon me ajudou a encontrar um plano que realmente cabia no meu orçamento. O atendimento foi excelente.",
      name: "Carlos Almeida",
      role: "Cliente Abcon",
      avatar: "CA"
    },

    {
      quote:
        "Consegui organizar meu planejamento para comprar meu veículo sem precisar entrar em um financiamento tradicional.",
      name: "Mariana Souza",
      role: "Cliente Abcon",
      avatar: "MS"
    },

    {
      quote:
        "Desde a primeira simulação tive todo o suporte necessário. Recomendo muito o atendimento da Abcon.",
      name: "Rafael Oliveira",
      role: "Cliente Abcon",
      avatar: "RO"
    }

  ],


  faq: [

    {
      question: "O consórcio possui juros?",
      answer:
        "O consórcio não possui juros de financiamento. Existem taxas previstas no contrato, como a taxa de administração."
    },

    {
      question: "Como funciona a contemplação?",
      answer:
        "A contemplação pode acontecer por sorteio ou lance, conforme as regras e condições do grupo."
    },

    {
      question: "Posso usar o crédito para comprar qualquer imóvel?",
      answer:
        "O crédito pode ser utilizado conforme as regras da administradora e as condições previstas no contrato."
    },

    {
      question: "Posso utilizar meu veículo como lance?",
      answer:
        "Dependendo do grupo e das regras da administradora, podem existir modalidades específicas de lance."
    },

    {
      question: "É possível antecipar parcelas?",
      answer:
        "Sim. Existem situações em que o consorciado pode antecipar parcelas, conforme as condições do contrato."
    }

  ]

};


/* =========================================================
   VARIÁVEIS
========================================================= */

let currentType = data.types[0];
let selectedTerm = currentType.prazos[0];
let currentTestimonial = 0;


/* =========================================================
   FORMATAÇÃO DE MOEDA
========================================================= */

function formatMoney(value) {

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0
  }).format(value);

}


/* =========================================================
   RENDERIZAR TIPOS
========================================================= */

function renderTypes() {

  const container = document.getElementById("types");

  if (!container) return;

  container.innerHTML = "";

  data.types.forEach(type => {

    const button = document.createElement("button");

    button.type = "button";

    button.className =
      "type-btn" +
      (type.id === currentType.id ? " active" : "");

    button.innerHTML = `
      <span class="type-icon">${type.icon}</span>
      <span>${type.label}</span>
    `;

    button.addEventListener("click", () => {

      currentType = type;

      selectedTerm = type.prazos[0];

      updateRange();

      renderTypes();

      renderTerms();

      updateSimulation();

    });

    container.appendChild(button);

  });

}


/* =========================================================
   ATUALIZAR RANGE
========================================================= */

function updateRange() {

  const range = document.getElementById("valueRange");

  if (!range) return;

  range.min = currentType.min;
  range.max = currentType.max;
  range.step = currentType.step;

  let value = Number(range.value);

  if (
    value < currentType.min ||
    value > currentType.max
  ) {

    value = currentType.min;

  }

  range.value = value;

  const minDisplay =
    document.getElementById("minDisplay");

  const maxDisplay =
    document.getElementById("maxDisplay");

  const valueDisplay =
    document.getElementById("valueDisplay");

  if (minDisplay) {
    minDisplay.textContent =
      formatMoney(currentType.min);
  }

  if (maxDisplay) {
    maxDisplay.textContent =
      formatMoney(currentType.max);
  }

  if (valueDisplay) {
    valueDisplay.textContent =
      formatMoney(value);
  }

}


/* =========================================================
   RENDERIZAR PRAZOS
========================================================= */

function renderTerms() {

  const container = document.getElementById("terms");

  if (!container) return;

  container.innerHTML = "";

  currentType.prazos.forEach(term => {

    const button = document.createElement("button");

    button.type = "button";

    button.className =
      "term" +
      (term === selectedTerm ? " active" : "");

    button.textContent =
      `${term} meses`;

    button.addEventListener("click", () => {

      selectedTerm = term;

      renderTerms();

      updateSimulation();

    });

    container.appendChild(button);

  });

}


/* =========================================================
   ATUALIZAR SIMULAÇÃO
========================================================= */

function updateSimulation() {

  const range =
    document.getElementById("valueRange");

  const display =
    document.getElementById("valueDisplay");

  if (!range || !display) return;

  const value = Number(range.value);

  display.textContent =
    formatMoney(value);

}


/* =========================================================
   SIMULAÇÃO
========================================================= */

function calculateInstallment() {

  const range =
    document.getElementById("valueRange");

  if (!range) return 0;

  const value = Number(range.value);

  /*
    Estimativa simples.
    A parcela real depende das condições
    da administradora e do grupo.
  */

  let taxa = 0;

  if (currentType.id === "imovel") {
    taxa = 0.006;
  }

  if (currentType.id === "auto") {
    taxa = 0.012;
  }

  if (currentType.id === "moto") {
    taxa = 0.015;
  }

  const installment =
    (value / selectedTerm) * (1 + taxa);

  return installment;

}


/* =========================================================
   MODAL
========================================================= */

const modal =
  document.getElementById("modal");

const closeModal =
  document.getElementById("closeModal");

const modalTitle =
  document.getElementById("modalTitle");

const modalSubtitle =
  document.getElementById("modalSubtitle");

const modalBody =
  document.getElementById("modalBody");


/* =========================================================
   ABRIR MODAL
========================================================= */

function openSimulationModal() {

  if (!modal || !modalBody) return;

  const range =
    document.getElementById("valueRange");

  const value =
    range ? Number(range.value) : currentType.min;

  const installment =
    calculateInstallment();

  modalTitle.textContent =
    "Falta pouco para ver sua simulação";

  modalSubtitle.textContent =
    "Preencha seus dados para receber uma análise personalizada.";

  modalBody.innerHTML = `

    <form id="leadForm">

      <input
        id="leadName"
        type="text"
        placeholder="Nome completo"
        required
      >

      <input
        id="leadPhone"
        type="tel"
        placeholder="WhatsApp"
        required
      >

      <input
        id="leadEmail"
        type="email"
        placeholder="E-mail"
        required
      >

      <button
        class="submit"
        type="submit"
      >
        Ver minha simulação
      </button>

    </form>

  `;

  modal.classList.add("show");

  document.body.style.overflow = "hidden";


  const form =
    document.getElementById("leadForm");

  form.addEventListener("submit", event => {

    event.preventDefault();

    const name =
      document.getElementById("leadName").value.trim();

    const phone =
      document.getElementById("leadPhone").value.trim();

    const email =
      document.getElementById("leadEmail").value.trim();

    if (!name || !phone || !email) {
      return;
    }

    showSimulationResult(
      name,
      value,
      installment
    );

  });

}


/* =========================================================
   RESULTADO DA SIMULAÇÃO
========================================================= */

function showSimulationResult(
  name,
  value,
  installment
) {

  modalTitle.textContent =
    `Olá, ${name.split(" ")[0]}!`;

  modalSubtitle.textContent =
    "Confira uma estimativa do seu planejamento.";

  modalBody.innerHTML = `

    <div class="result">

      <div class="result-row">
        <span>Tipo de bem</span>
        <strong>${currentType.label}</strong>
      </div>

      <div class="result-row">
        <span>Crédito desejado</span>
        <strong>${formatMoney(value)}</strong>
      </div>

      <div class="result-row">
        <span>Prazo</span>
        <strong>${selectedTerm} meses</strong>
      </div>

      <div class="result-row">
        <span>Parcela estimada</span>
        <strong>${formatMoney(installment)}/mês</strong>
      </div>

    </div>

    <p
      style="
        margin-top:18px;
        color:#5B6B85;
        font-size:13px;
        line-height:1.6;
      "
    >
      Esta é apenas uma estimativa. Os valores
      podem variar conforme as condições do grupo,
      administradora e plano escolhido.
    </p>

    <button
      id="whatsappSimulation"
      class="submit"
      type="button"
    >
      Falar com um consultor pelo WhatsApp
    </button>

  `;


  const whatsappButton =
    document.getElementById("whatsappSimulation");

  if (whatsappButton) {

    whatsappButton.addEventListener("click", () => {

      const message =
        `Olá! Meu nome é ${name}. ` +
        `Fiz uma simulação na Abcon e gostaria ` +
        `de saber mais sobre uma carta de ${formatMoney(value)} ` +
        `para ${currentType.label}.`;

      openWhatsApp(message);

    });

  }

}


/* =========================================================
   FECHAR MODAL
========================================================= */

function closeSimulationModal() {

  if (!modal) return;

  modal.classList.remove("show");

  document.body.style.overflow = "";

}


/* =========================================================
   EVENTOS DO MODAL
========================================================= */

if (closeModal) {

  closeModal.addEventListener(
    "click",
    closeSimulationModal
  );

}


if (modal) {

  modal.addEventListener("click", event => {

    if (event.target === modal) {

      closeSimulationModal();

    }

  });

}


document.addEventListener("keydown", event => {

  if (
    event.key === "Escape" &&
    modal &&
    modal.classList.contains("show")
  ) {

    closeSimulationModal();

  }

});


/* =========================================================
   BOTÃO SIMULAR
========================================================= */

const simulateBtn =
  document.getElementById("simulateBtn");

if (simulateBtn) {

  simulateBtn.addEventListener(
    "click",
    openSimulationModal
  );

}


/* =========================================================
   RANGE
========================================================= */

const valueRange =
  document.getElementById("valueRange");

if (valueRange) {

  valueRange.addEventListener(
    "input",
    updateSimulation
  );

}


/* =========================================================
   COMO FUNCIONA
========================================================= */

function renderSteps() {

  const container =
    document.getElementById("steps");

  if (!container) return;

  container.innerHTML = "";

  data.steps.forEach(step => {

    const element =
      document.createElement("div");

    element.className =
      "step reveal";

    element.innerHTML = `

      <div class="step-icon">
        ${step.icon}
      </div>

      <b>
        ${step.title}
      </b>

      <small>
        ${step.text}
      </small>

    `;

    container.appendChild(element);

  });

}


/* =========================================================
   BENEFÍCIOS
========================================================= */

function renderBenefits() {

  const container =
    document.getElementById("benefits");

  if (!container) return;

  container.innerHTML = "";

  data.benefits.forEach(benefit => {

    const element =
      document.createElement("article");

    element.className =
      "benefit reveal";

    element.innerHTML = `

      <div class="benefit-icon">
        ${benefit.icon}
      </div>

      <h3>
        ${benefit.title}
      </h3>

      <p>
        ${benefit.text}
      </p>

    `;

    container.appendChild(element);

  });

}


/* =========================================================
   DEPOIMENTOS
========================================================= */

function renderTestimonial() {

  const container =
    document.getElementById("testimonial");

  const dots =
    document.getElementById("dots");

  if (!container || !dots) return;

  const testimonial =
    data.testimonials[currentTestimonial];

  container.innerHTML = `

    <div class="stars">
      ★★★★★
    </div>

    <blockquote>
      “${testimonial.quote}”
    </blockquote>

    <div class="person">

      <div class="avatar">
        ${testimonial.avatar}
      </div>

      <div>

        <strong>
          ${testimonial.name}
        </strong>

        <small>
          ${testimonial.role}
        </small>

      </div>

    </div>

  `;


  dots.innerHTML = "";

  data.testimonials.forEach(
    (_, index) => {

      const dot =
        document.createElement("button");

      dot.type = "button";

      dot.className =
        "dot" +
        (index === currentTestimonial
          ? " active"
          : "");

      dot.addEventListener("click", () => {

        currentTestimonial = index;

        renderTestimonial();

      });

      dots.appendChild(dot);

    }
  );

}


/* =========================================================
   FAQ
========================================================= */

function renderFAQ() {

  const container =
    document.getElementById("faq");

  if (!container) return;

  container.innerHTML = "";

  data.faq.forEach(item => {

    const element =
      document.createElement("div");

    element.className =
      "faq-item";

    element.innerHTML = `

      <button
        class="faq-q"
        type="button"
      >

        <span>
          ${item.question}
        </span>

        <span>
          +
        </span>

      </button>

      <div class="faq-a">
        ${item.answer}
      </div>

    `;


    const question =
      element.querySelector(".faq-q");

    question.addEventListener("click", () => {

      const isOpen =
        element.classList.contains("open");

      document
        .querySelectorAll(".faq-item")
        .forEach(item => {

          item.classList.remove("open");

        });


      if (!isOpen) {

        element.classList.add("open");

      }

    });


    container.appendChild(element);

  });

}


/* =========================================================
   MENU MOBILE
========================================================= */

const menuBtn =
  document.getElementById("menuBtn");

const mobileMenu =
  document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {

  menuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("open");

    const opened =
      mobileMenu.classList.contains("open");

    menuBtn.textContent =
      opened ? "✕" : "☰";

  });

}


/* =========================================================
   NAVEGAÇÃO
========================================================= */

function scrollToSection(id) {

  const section =
    document.getElementById(id);

  if (!section) return;

  section.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });


  if (mobileMenu) {

    mobileMenu.classList.remove("open");

  }

  if (menuBtn) {

    menuBtn.textContent = "☰";

  }

}


document.addEventListener("click", event => {

  const target =
    event.target.closest("[data-scroll]");

  if (!target) return;

  const id =
    target.getAttribute("data-scroll");

  scrollToSection(id);

});


/* =========================================================
   BOTÕES "FALAR COM CONSULTOR"
========================================================= */

document.addEventListener("click", event => {

  const button =
    event.target.closest(".btn-outline");

  if (!button) return;

  openWhatsApp(
    "Olá! Gostaria de falar com um consultor da Abcon Investimentos."
  );

});


/* =========================================================
   WHATSAPP
========================================================= */

const whatsappNumber =
  "558592896415";


function openWhatsApp(message = "") {

  const url =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );

}


/* =========================================================
   BOTÃO FLUTUANTE DO WHATSAPP
========================================================= */

function createWhatsAppButton() {

  if (
    document.getElementById("whatsappFloat")
  ) {
    return;
  }

  const button =
    document.createElement("a");

  button.id =
    "whatsappFloat";

  button.href =
    "https://wa.me/558592896415?text=" +
    encodeURIComponent(
      "Olá! Gostaria de saber mais sobre os consórcios da Abcon Investimentos."
    );

  button.target = "_blank";

  button.rel =
    "noopener noreferrer";

  button.setAttribute(
    "aria-label",
    "Falar com a Abcon pelo WhatsApp"
  );

  button.innerHTML = `

    <span class="whatsapp-icon">

      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
      >

        <path
          fill="currentColor"
          d="M19.11 17.21c-.27-.14-1.59-.78-1.84-.87-.25-.09-.43-.14-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.13-.42-2.15-1.33-.79-.7-1.33-1.57-1.49-1.84-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27s.98 2.63 1.11 2.81c.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.57.66.21 1.26.18 1.74.11.53-.08 1.59-.65 1.81-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32z"
        />

        <path
          fill="currentColor"
          d="M16.01 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.26.59 4.47 1.72 6.42L3.1 28.8l6.56-1.72a12.75 12.75 0 0 0 6.35 1.68h.01c7.06 0 12.79-5.73 12.79-12.8S23.08 3.2 16.01 3.2zm0 23.45h-.01c-1.98 0-3.92-.53-5.61-1.53l-.4-.24-3.89 1.02 1.04-3.79-.26-.41a10.62 10.62 0 0 1-1.63-5.7c0-5.9 4.8-10.7 10.7-10.7 2.86 0 5.55 1.11 7.57 3.14a10.62 10.62 0 0 1 3.13 7.57c0 5.91-4.8 10.7-10.69 10.7z"
        />

      </svg>

    </span>

    <span class="whatsapp-text">
      Fale conosco
    </span>

  `;

  document.body.appendChild(button);

}


/* =========================================================
   ANIMAÇÕES REVEAL
========================================================= */

function initReveal() {

  const elements =
    document.querySelectorAll(".reveal");

  if (!elements.length) return;


  if (
    !("IntersectionObserver" in window)
  ) {

    elements.forEach(element => {

      element.classList.add("in");

    });

    return;

  }


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("in");

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  elements.forEach(element => {

    observer.observe(element);

  });

}


/* =========================================================
   NAVBAR SCROLL
========================================================= */

function initNavbar() {

  const navbar =
    document.getElementById("navbar");

  if (!navbar) return;

  function updateNavbar() {

    if (window.scrollY > 30) {

      navbar.classList.add("scrolled");

    } else {

      navbar.classList.remove("scrolled");

    }

  }

  updateNavbar();

  window.addEventListener(
    "scroll",
    updateNavbar,
    {
      passive: true
    }
  );

}


/* =========================================================
   ANO AUTOMÁTICO
========================================================= */

function updateYear() {

  const year =
    document.getElementById("year");

  if (!year) return;

  year.textContent =
    new Date().getFullYear();

}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    renderTypes();

    updateRange();

    renderTerms();

    updateSimulation();

    renderSteps();

    renderBenefits();

    renderTestimonial();

    renderFAQ();

    createWhatsAppButton();

    initReveal();

    initNavbar();

    updateYear();

  }
);
