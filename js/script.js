/* =========================================================
   ABCON INVESTIMENTOS
   SCRIPT PRINCIPAL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     DADOS DA SIMULAÇÃO
  ======================================================= */

  const data = {

    types: [

      {
        id: "imovel",
        label: "Imóvel",
        icon: "House",
        min: 80000,
        max: 900000,
        step: 5000,
        prazos: [120, 150, 180, 200]
      },

      {
        id: "auto",
        label: "Automóvel",
        icon: "CarFront",
        min: 30000,
        max: 250000,
        step: 2000,
        prazos: [48, 60, 72, 80]
      },

      {
        id: "moto",
        label: "Moto",
        icon: "Bike",
        min: 15000,
        max: 80000,
        step: 1000,
        prazos: [36, 48, 60, 72]
      }

    ],


    /* =====================================================
       COMO FUNCIONA
    ===================================================== */

    steps: [

      {
        icon: "MessageCircle",
        title: "Converse",
        text: "Fale com nosso consultor"
      },

      {
        icon: "Calculator",
        title: "Simule",
        text: "Escolha seu crédito"
      },

      {
        icon: "FileText",
        title: "Escolha",
        text: "Defina seu plano"
      },

      {
        icon: "BadgeCheck",
        title: "Contrate",
        text: "Formalize seu consórcio"
      },

      {
        icon: "TrendingUp",
        title: "Acompanhe",
        text: "Acompanhe sua contemplação"
      },

      {
        icon: "KeyRound",
        title: "Conquiste",
        text: "Use seu crédito"
      }

    ],


    /* =====================================================
       BENEFÍCIOS
    ===================================================== */

    benefits: [

      {
        icon: "Percent",
        title: "Sem juros",
        text: "Planeje sua compra sem os juros tradicionais de um financiamento."
      },

      {
        icon: "Wallet",
        title: "Parcelas planejadas",
        text: "Escolha um plano que esteja de acordo com o seu orçamento."
      },

      {
        icon: "ShieldCheck",
        title: "Segurança",
        text: "Conte com acompanhamento profissional durante todo o processo."
      },

      {
        icon: "Clock3",
        title: "Flexibilidade",
        text: "Escolha diferentes prazos e valores de crédito."
      },

      {
        icon: "TrendingUp",
        title: "Planejamento",
        text: "Transforme seus objetivos em uma estratégia financeira."
      },

      {
        icon: "Headphones",
        title: "Atendimento",
        text: "Tenha suporte para entender cada etapa do seu consórcio."
      }

    ],


    /* =====================================================
       DEPOIMENTOS
    ===================================================== */

    testimonials: [

      {
        text: "A equipe da Abcon me ajudou a encontrar um plano que realmente cabia no meu orçamento. O atendimento foi excelente.",
        name: "Cliente Abcon",
        role: "Cliente"
      },

      {
        text: "Consegui organizar meu planejamento para conquistar meu veículo sem precisar entrar em um financiamento tradicional.",
        name: "Cliente Abcon",
        role: "Cliente"
      },

      {
        text: "Gostei muito da transparência durante todo o atendimento. Recomendo para quem está pensando em fazer um consórcio.",
        name: "Cliente Abcon",
        role: "Cliente"
      }

    ],


    /* =====================================================
       FAQ
    ===================================================== */

    faq: [

      {
        question: "O consórcio tem juros?",
        answer: "O consórcio não possui juros de financiamento. Existem taxas previstas no contrato, como a taxa de administração."
      },

      {
        question: "Posso escolher qualquer imóvel ou veículo?",
        answer: "Após a contemplação e respeitando as regras do seu grupo, o crédito pode ser utilizado para adquirir o bem dentro das condições estabelecidas."
      },

      {
        question: "Como funciona a contemplação?",
        answer: "A contemplação pode ocorrer por sorteio ou lance, conforme as regras e condições do grupo de consórcio."
      },

      {
        question: "Posso dar um lance?",
        answer: "Sim. O participante pode ofertar um lance conforme as regras do seu grupo. A contemplação dependerá dos critérios estabelecidos."
      },

      {
        question: "Preciso ter o dinheiro todo para comprar o bem?",
        answer: "Não. O objetivo do consórcio é justamente permitir o planejamento da aquisição por meio de parcelas mensais."
      },

      {
        question: "Posso fazer uma simulação gratuitamente?",
        answer: "Sim. A simulação é gratuita e serve para você conhecer possibilidades de valores e prazos."
      }

    ]

  };


  /* =======================================================
     ELEMENTOS
  ======================================================= */

  const typesEl = document.getElementById("types");
  const termsEl = document.getElementById("terms");

  const valueRange = document.getElementById("valueRange");
  const valueDisplay = document.getElementById("valueDisplay");

  const minDisplay = document.getElementById("minDisplay");
  const maxDisplay = document.getElementById("maxDisplay");

  const simulateBtn = document.getElementById("simulateBtn");

  const stepsEl = document.getElementById("steps");
  const benefitsEl = document.getElementById("benefits");

  const testimonialEl = document.getElementById("testimonial");
  const dotsEl = document.getElementById("dots");

  const faqEl = document.getElementById("faq");

  const modal = document.getElementById("modal");
  const closeModal = document.getElementById("closeModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalSubtitle = document.getElementById("modalSubtitle");
  const modalBody = document.getElementById("modalBody");

  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  const navbar = document.getElementById("navbar");

  const yearEl = document.getElementById("year");


  /* =======================================================
     VARIÁVEIS
  ======================================================= */

  let selectedType = data.types[0];

  let selectedTerm = selectedType.prazos[0];

  let currentTestimonial = 0;


  /* =======================================================
     FORMATAÇÃO DE MOEDA
  ======================================================= */

  function formatMoney(value) {

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0
    }).format(value);

  }


  /* =======================================================
     RENDERIZA ÍCONES LUCIDE
  ======================================================= */

  function refreshIcons() {

    if (window.lucide) {

      lucide.createIcons();

    }

  }


  /* =======================================================
     TIPOS DE CONSÓRCIO
  ======================================================= */

  function renderTypes() {

    if (!typesEl) return;

    typesEl.innerHTML = data.types.map((type) => {

      const active = type.id === selectedType.id
        ? "active"
        : "";

      return `
        <button
          class="type-btn ${active}"
          data-type="${type.id}"
          type="button"
        >

          <i
            data-lucide="${type.icon}"
            class="type-icon"
          ></i>

          <span>
            ${type.label}
          </span>

        </button>
      `;

    }).join("");


    typesEl.querySelectorAll(".type-btn").forEach(button => {

      button.addEventListener("click", () => {

        const typeId = button.dataset.type;

        const type = data.types.find(
          item => item.id === typeId
        );

        if (!type) return;

        selectedType = type;

        selectedTerm = type.prazos[0];

        updateSimulation();

      });

    });


    refreshIcons();

  }


  /* =======================================================
     PRAZOS
  ======================================================= */

  function renderTerms() {

    if (!termsEl) return;

    termsEl.innerHTML = selectedType.prazos.map(term => {

      const active = term === selectedTerm
        ? "active"
        : "";

      return `
        <button
          class="term ${active}"
          data-term="${term}"
          type="button"
        >
          ${term} meses
        </button>
      `;

    }).join("");


    termsEl.querySelectorAll(".term").forEach(button => {

      button.addEventListener("click", () => {

        selectedTerm = Number(button.dataset.term);

        renderTerms();

      });

    });

  }


  /* =======================================================
     ATUALIZA SIMULAÇÃO
  ======================================================= */

  function updateSimulation() {

    if (!valueRange) return;


    valueRange.min = selectedType.min;
    valueRange.max = selectedType.max;
    valueRange.step = selectedType.step;


    let currentValue = Number(valueRange.value);


    if (
      currentValue < selectedType.min ||
      currentValue > selectedType.max
    ) {

      currentValue = selectedType.min;

    }


    valueRange.value = currentValue;


    if (minDisplay) {

      minDisplay.textContent =
        formatMoney(selectedType.min);

    }


    if (maxDisplay) {

      maxDisplay.textContent =
        formatMoney(selectedType.max);

    }


    if (valueDisplay) {

      valueDisplay.textContent =
        formatMoney(currentValue);

    }


    renderTypes();

    renderTerms();

  }


  /* =======================================================
     RANGE
  ======================================================= */

  if (valueRange) {

    valueRange.addEventListener("input", () => {

      if (valueDisplay) {

        valueDisplay.textContent =
          formatMoney(Number(valueRange.value));

      }

    });

  }


  /* =======================================================
     COMO FUNCIONA
  ======================================================= */

  function renderSteps() {

    if (!stepsEl) return;

    stepsEl.innerHTML = data.steps.map((step, index) => {

      return `
        <div class="step reveal">

          <div class="step-icon">

            <i
              data-lucide="${step.icon}"
            ></i>

          </div>

          <b>
            ${index + 1}. ${step.title}
          </b>

          <small>
            ${step.text}
          </small>

        </div>
      `;

    }).join("");


    refreshIcons();

  }


  /* =======================================================
     BENEFÍCIOS
  ======================================================= */

  function renderBenefits() {

    if (!benefitsEl) return;

    benefitsEl.innerHTML = data.benefits.map(benefit => {

      return `
        <article class="benefit reveal">

          <div class="benefit-icon">

            <i
              data-lucide="${benefit.icon}"
            ></i>

          </div>

          <h3>
            ${benefit.title}
          </h3>

          <p>
            ${benefit.text}
          </p>

        </article>
      `;

    }).join("");


    refreshIcons();

  }


  /* =======================================================
     DEPOIMENTOS
  ======================================================= */

  function renderTestimonial() {

    if (!testimonialEl) return;


    const testimonial =
      data.testimonials[currentTestimonial];


    testimonialEl.innerHTML = `

      <div class="stars">
        ★ ★ ★ ★ ★
      </div>

      <blockquote>
        "${testimonial.text}"
      </blockquote>

      <div class="person">

        <div class="avatar">

          <i data-lucide="UserRound"></i>

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


    renderDots();

    refreshIcons();

  }


  function renderDots() {

    if (!dotsEl) return;


    dotsEl.innerHTML =
      data.testimonials.map((_, index) => {

        const active =
          index === currentTestimonial
            ? "active"
            : "";

        return `
          <button
            class="dot ${active}"
            data-index="${index}"
            type="button"
            aria-label="Depoimento ${index + 1}"
          ></button>
        `;

      }).join("");


    dotsEl.querySelectorAll(".dot").forEach(dot => {

      dot.addEventListener("click", () => {

        currentTestimonial =
          Number(dot.dataset.index);

        renderTestimonial();

      });

    });

  }


  /* =======================================================
     FAQ
  ======================================================= */

  function renderFaq() {

    if (!faqEl) return;


    faqEl.innerHTML =
      data.faq.map((item, index) => {

        return `
          <div class="faq-item">

            <button
              class="faq-q"
              type="button"
            >

              <span>
                ${item.question}
              </span>

              <i
                data-lucide="ChevronDown"
              ></i>

            </button>

            <div class="faq-a">
              ${item.answer}
            </div>

          </div>
        `;

      }).join("");


    faqEl.querySelectorAll(".faq-q").forEach(button => {

      button.addEventListener("click", () => {

        const item =
          button.closest(".faq-item");

        const wasOpen =
          item.classList.contains("open");


        faqEl
          .querySelectorAll(".faq-item")
          .forEach(other => {

            other.classList.remove("open");

          });


        if (!wasOpen) {

          item.classList.add("open");

        }

      });

    });


    refreshIcons();

  }


  /* =======================================================
     SCROLL NAV
  ======================================================= */

  document
    .querySelectorAll("[data-scroll]")
    .forEach(button => {

      button.addEventListener("click", () => {

        const targetId =
          button.dataset.scroll;

        const target =
          document.getElementById(targetId);

        if (!target) return;


        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });


        if (mobileMenu) {

          mobileMenu.classList.remove("open");

        }

      });

    });


  /* =======================================================
     BOTÃO FALAR COM CONSULTOR
  ======================================================= */

  document
    .querySelectorAll(".btn-outline")
    .forEach(button => {

      button.addEventListener("click", () => {

        window.open(
          "https://wa.me/558592896415?text=Olá!%20Gostaria%20de%20falar%20com%20um%20consultor%20da%20Abcon%20Investimentos.",
          "_blank"
        );

      });

    });


  /* =======================================================
     BOTÃO SIMULAR
  ======================================================= */

  if (simulateBtn) {

    simulateBtn.addEventListener("click", () => {

      openSimulationModal();

    });

  }


  /* =======================================================
     MODAL DE SIMULAÇÃO
  ======================================================= */

  function openSimulationModal() {

    if (!modal || !modalBody) return;


    const value =
      Number(valueRange.value);


    modalTitle.textContent =
      "Falta pouco para ver sua simulação";


    modalSubtitle.textContent =
      "Preencha seus dados para receber uma estimativa personalizada.";


    modalBody.innerHTML = `

      <form id="leadForm">

        <input
          type="text"
          id="leadName"
          placeholder="Nome completo"
          autocomplete="name"
          required
        >

        <input
          type="tel"
          id="leadPhone"
          placeholder="WhatsApp"
          autocomplete="tel"
          required
        >

        <input
          type="email"
          id="leadEmail"
          placeholder="E-mail"
          autocomplete="email"
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


    const phone =
      document.getElementById("leadPhone");


    if (phone) {

      phone.addEventListener("input", () => {

        let value =
          phone.value.replace(/\D/g, "");

        value =
          value.substring(0, 11);


        if (value.length <= 10) {

          phone.value =
            value.replace(
              /^(\d{2})(\d{4})(\d{0,4}).*/,
              "($1) $2-$3"
            );

        } else {

          phone.value =
            value.replace(
              /^(\d{2})(\d{5})(\d{0,4}).*/,
              "($1) $2-$3"
            );

        }

      });

    }


    if (form) {

      form.addEventListener("submit", event => {

        event.preventDefault();


        const name =
          document.getElementById("leadName").value.trim();

        const phoneValue =
          document.getElementById("leadPhone").value.trim();

        const email =
          document.getElementById("leadEmail").value.trim();


        if (!name || !phoneValue || !email) {

          return;

        }


        showSimulationResult(
          name,
          phoneValue,
          email,
          value
        );

      });

    }

  }


  /* =======================================================
     RESULTADO DA SIMULAÇÃO
  ======================================================= */

  function showSimulationResult(
    name,
    phone,
    email,
    value
  ) {

    if (!modalBody) return;


    /*
      ESTIMATIVA SIMPLIFICADA

      Não representa uma proposta oficial.
      Serve apenas como estimativa visual.
    */

    let estimatedRate = 0;


    if (selectedType.id === "imovel") {

      estimatedRate = 0.0065;

    }

    else if (selectedType.id === "auto") {

      estimatedRate = 0.0085;

    }

    else {

      estimatedRate = 0.0105;

    }


    const estimatedInstallment =
      (value / selectedTerm) *
      (1 + estimatedRate * 10);


    modalTitle.textContent =
      "Sua simulação está pronta!";


    modalSubtitle.textContent =
      `Olá, ${name}. Confira uma estimativa do seu plano.`;


    modalBody.innerHTML = `

      <div class="result">

        <div class="result-row">

          <span>
            Tipo de bem
          </span>

          <strong>
            ${selectedType.label}
          </strong>

        </div>


        <div class="result-row">

          <span>
            Crédito desejado
          </span>

          <strong>
            ${formatMoney(value)}
          </strong>

        </div>


        <div class="result-row">

          <span>
            Prazo
          </span>

          <strong>
            ${selectedTerm} meses
          </strong>

        </div>


        <div class="result-row">

          <span>
            Parcela estimada
          </span>

          <strong>
            ${formatMoney(Math.round(estimatedInstallment))}
          </strong>

        </div>

      </div>


      <button
        class="submit"
        id="whatsappResult"
        type="button"
      >
        Falar com um consultor
      </button>

      <p
        style="
          margin-top:15px;
          font-size:12px;
          color:#8B96AC;
          line-height:1.6;
          text-align:center;
        "
      >
        Esta é apenas uma estimativa.
        Os valores finais dependem das condições
        do grupo e da administradora.
      </p>

    `;


    const whatsappButton =
      document.getElementById("whatsappResult");


    if (whatsappButton) {

      whatsappButton.addEventListener("click", () => {

        const message =
          `Olá! Sou ${name}. Fiz uma simulação no site da Abcon Investimentos. ` +
          `Tenho interesse em ${selectedType.label}, ` +
          `crédito de ${formatMoney(value)} ` +
          `em ${selectedTerm} meses.`;

        const url =
          "https://wa.me/558592896415?text=" +
          encodeURIComponent(message);


        window.open(url, "_blank");

      });

    }

  }


  /* =======================================================
     FECHAR MODAL
  ======================================================= */

  if (closeModal) {

    closeModal.addEventListener("click", () => {

      closeSimulationModal();

    });

  }


  function closeSimulationModal() {

    if (!modal) return;

    modal.classList.remove("show");

    document.body.style.overflow = "";

  }


  if (modal) {

    modal.addEventListener("click", event => {

      if (event.target === modal) {

        closeSimulationModal();

      }

    });

  }


  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

      closeSimulationModal();

    }

  });


  /* =======================================================
     MENU MOBILE
  ======================================================= */

  if (menuBtn && mobileMenu) {

    menuBtn.addEventListener("click", () => {

      mobileMenu.classList.toggle("open");

    });

  }


  /* =======================================================
     NAVBAR AO ROLAR
  ======================================================= */

  function handleNavbar() {

    if (!navbar) return;


    if (window.scrollY > 40) {

      navbar.classList.add("scrolled");

    } else {

      navbar.classList.remove("scrolled");

    }

  }


  window.addEventListener(
    "scroll",
    handleNavbar
  );


  handleNavbar();


  /* =======================================================
     ANIMAÇÃO REVEAL
  ======================================================= */

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("in");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  function observeReveals() {

    document
      .querySelectorAll(".reveal")
      .forEach(element => {

        observer.observe(element);

      });

  }


  /* =======================================================
     ANO DO FOOTER
  ======================================================= */

  if (yearEl) {

    yearEl.textContent =
      new Date().getFullYear();

  }


  /* =======================================================
     INICIALIZAÇÃO
  ======================================================= */

  renderTypes();

  renderTerms();

  renderSteps();

  renderBenefits();

  renderTestimonial();

  renderFaq();

  updateSimulation();

  observeReveals();

  refreshIcons();

});
