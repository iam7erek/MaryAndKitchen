/**
 * Ring the Bell: sends the order slip to /api/order without leaving the page,
 * keeps the "WhatsApp is faster" link prefilled with whatever is typed, and
 * celebrates a sent order with a little burst of sprinkles.
 */
import { whatsappLink } from '../data/site';
import { copy } from '../data/copy.en';

const form = document.querySelector<HTMLFormElement>('[data-order-form]');

if (form) {
  const status = form.querySelector<HTMLElement>('[data-status]');
  const submit = form.querySelector<HTMLButtonElement>('[type="submit"]');
  const success = document.querySelector<HTMLElement>('[data-order-success]');
  const fast = document.querySelector<HTMLAnchorElement>('[data-fast-whatsapp]');
  const date = form.querySelector<HTMLInputElement>('input[name="date"]');
  const t = form.dataset;

  // Earliest date: 12 hours from now (local), as a yyyy-mm-dd string.
  if (date) {
    const soon = new Date(Date.now() + 12 * 60 * 60 * 1000);
    const pad = (n: number) => String(n).padStart(2, '0');
    date.min = `${soon.getFullYear()}-${pad(soon.getMonth() + 1)}-${pad(soon.getDate())}`;
  }

  const values = () => Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

  // Same order, straight to WhatsApp.
  const updateFast = () => {
    if (!fast) return;
    const v = values();
    const p = copy.ringBell.prefill;
    const lines = [
      p.hello,
      v.order && `${p.order} ${v.order}`,
      v.date && `${p.date} ${v.date}`,
      v.area && `${p.area} ${v.area}`,
      v.name && `${p.name} ${v.name}`,
    ].filter(Boolean);
    fast.href = lines.length > 1 ? whatsappLink(lines.join('\n')) : whatsappLink();
  };
  form.addEventListener('input', updateFast);

  const say = (message: string) => {
    if (status) status.textContent = message;
  };

  const markInvalid = (names: string[]) => {
    form.querySelectorAll<HTMLElement>('[name]').forEach((field) => {
      field.toggleAttribute('aria-invalid', names.includes(field.getAttribute('name') ?? ''));
    });
    const first = form.querySelector<HTMLElement>('[aria-invalid]');
    first?.focus();
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      const bad = Array.from(form.elements)
        .filter((el): el is HTMLInputElement => 'validity' in el && !(el as HTMLInputElement).validity.valid)
        .map((el) => el.name);
      markInvalid(bad);
      say(t.invalid ?? '');
      return;
    }

    submit?.setAttribute('disabled', '');
    const label = submit?.textContent;
    if (submit) submit.textContent = t.sending ?? '';
    say('');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(values()),
      });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; fields?: string[] };

      if (response.ok && result.ok) {
        form.hidden = true;
        if (success) {
          success.hidden = false;
          success.focus();
          burst(success);
        }
        return;
      }
      if (result.fields) markInvalid(result.fields);
      say(result.fields ? (t.invalid ?? '') : (t.error ?? ''));
    } catch {
      say(t.error ?? '');
    } finally {
      submit?.removeAttribute('disabled');
      if (submit && label) submit.textContent = label;
    }
  });
}

/** A little burst of sprinkles from the middle of `host` (transform + opacity only). */
function burst(host: HTMLElement) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const layer = host.querySelector<HTMLElement>('[data-sprinkles]');
  const shapes = layer?.dataset.shapes?.split('|') ?? [];
  if (!layer || shapes.length === 0) return;

  for (let i = 0; i < 18; i++) {
    const bit = document.createElement('span');
    bit.className = 'sprinkle-bit';
    bit.style.backgroundImage = `url(${shapes[i % shapes.length]})`;
    layer.append(bit);
    const angle = (i / 18) * Math.PI * 2 + Math.random() * 0.4;
    const distance = 90 + Math.random() * 90;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance - 40;
    bit
      .animate(
        [
          { transform: 'translate(-50%, -50%) scale(0.2) rotate(0deg)', opacity: 1 },
          { transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1) rotate(${Math.random() * 360}deg)`, opacity: 1, offset: 0.6 },
          { transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y + 60}px)) scale(0.9) rotate(${Math.random() * 540}deg)`, opacity: 0 },
        ],
        { duration: 1400 + Math.random() * 400, easing: 'cubic-bezier(0.2, 0.9, 0.3, 1)' },
      )
      .finished.then(() => bit.remove());
  }
}
