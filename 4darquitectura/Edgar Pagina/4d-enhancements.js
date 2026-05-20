(() => {
  const modal = document.getElementById('projectsModal');
  const modalGrid = document.getElementById('modalGrid');
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  let modalRendered = false;

  const projectImages = [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&q=80',
    'https://images.unsplash.com/photo-1600607687644-c94bf4f58e2c?w=600&q=80'
  ];

  function renderModalImages() {
    if (!modalGrid || modalRendered) return;

    const fragment = document.createDocumentFragment();

    projectImages.forEach((src) => {
      const image = document.createElement('img');
      image.src = src;
      image.alt = 'Proyecto 4D Arquitectura + Dise\u00f1o';
      image.loading = 'lazy';
      image.decoding = 'async';
      image.width = 600;
      image.height = 400;
      fragment.appendChild(image);
    });

    modalGrid.replaceChildren(fragment);
    modalRendered = true;
  }

  function openModal() {
    if (!modal) return;
    renderModalImages();
    modal.style.display = 'block';
  }

  function closeModal() {
    if (modal) modal.style.display = 'none';
  }

  function initModal() {
    if (!modal) return;

    document.addEventListener('click', (event) => {
      const openTrigger = event.target.closest('[data-open-modal], #openProjectsBtn');

      if (openTrigger) {
        event.preventDefault();
        openModal();
        return;
      }

      if (event.target.closest('.close-btn') || event.target === modal) {
        closeModal();
      }
    });
  }

  function initContactForm() {
    if (!contactForm || !formStatus) return;

    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const name = String(formData.get('name') || '').trim();
      const email = String(formData.get('email') || '').trim();
      const phone = String(formData.get('phone') || '').trim();
      const message = String(formData.get('message') || '').trim();

      if (!name || !email || !message) {
        formStatus.textContent = 'Completa nombre, correo y mensaje para continuar.';
        formStatus.className = 'form-status error';
        return;
      }

      const whatsappNumber = '529991275460';
      const whatsappMessage = [
        'Hola, quiero cotizar un proyecto con 4D Arquitectura + Dise\u00f1o.',
        '',
        `Nombre: ${name}`,
        `Correo: ${email}`,
        `Tel\u00e9fono: ${phone || 'No proporcionado'}`,
        'Proyecto:',
        message
      ].join('\n');

      formStatus.textContent = 'Abriendo WhatsApp con tu mensaje listo para enviar...';
      formStatus.className = 'form-status success';

      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
        '_blank',
        'noopener'
      );

      contactForm.reset();
    });
  }

  initModal();
  initContactForm();
})();
