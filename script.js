document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const links = document.getElementById('links');
  const chips = document.querySelectorAll('.chip');
  const cards = document.querySelectorAll('.card');

  document.getElementById('year').textContent = new Date().getFullYear();

  // Nav becomes frosted after scrolling
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  const setMenu = open => {
    links.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => setMenu(!links.classList.contains('open')));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

  // Category filter
  chips.forEach(chip => chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const f = chip.dataset.filter;
    let i = 0;
    cards.forEach(card => {
      const show = f === 'all' || card.dataset.category === f;
      card.classList.remove('in');
      card.classList.toggle('hidden', !show);
      if (show) {
        card.style.animationDelay = (i++ * 60) + 'ms';
        void card.offsetWidth; // restart animation
        card.classList.add('in');
      }
    });
  }));
});