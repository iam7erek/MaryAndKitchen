/**
 * POST /api/order: the order slip from "Ring the Bell".
 * Validates the fields, drops bots (honeypot), and emails Mary through Resend.
 * Accepts JSON (the page's script) or a normal form post (no-JS fallback,
 * answered with a redirect). Keys live in Vercel env vars, never in code.
 */
import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { RESEND_API_KEY, ORDER_FROM_EMAIL, ORDER_TO_EMAIL } from 'astro:env/server';

export const prerender = false;

interface Order {
  name: string;
  phone: string;
  order: string;
  date: string;
  area: string;
}

type Errors = Partial<Record<keyof Order, string>>;

const LIMITS: Record<keyof Order, number> = { name: 80, phone: 24, order: 1500, date: 10, area: 120 };

function clean(value: unknown, max: number): string {
  return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim().slice(0, max) : '';
}

function validate(input: Record<string, unknown>): { order: Order; errors: Errors } {
  const order: Order = {
    name: clean(input.name, LIMITS.name),
    phone: clean(input.phone, LIMITS.phone),
    order: typeof input.order === 'string' ? input.order.trim().slice(0, LIMITS.order) : '',
    date: clean(input.date, LIMITS.date),
    area: clean(input.area, LIMITS.area),
  };
  const errors: Errors = {};
  if (order.name.length < 2) errors.name = 'name';
  if (order.phone.replace(/\D/g, '').length < 7 || !/^[+\d\s()-]+$/.test(order.phone)) errors.phone = 'phone';
  if (order.order.length < 3) errors.order = 'order';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(order.date)) errors.date = 'date';
  if (order.area.length < 2) errors.area = 'area';
  return { order, errors };
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

function waLink(phone: string): string {
  const digits = phone.replace(/\D/g, '').replace(/^00/, '');
  const local = digits.startsWith('0') ? `971${digits.slice(1)}` : digits;
  return `https://wa.me/${local}`;
}

function emailBodies(o: Order) {
  const rows: [string, string][] = [
    ['Name', o.name],
    ['WhatsApp', o.phone],
    ['Needed on', o.date],
    ['Area', o.area],
  ];
  const text = [
    'New order request from the website!',
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'What they want:',
    o.order,
    '',
    `Reply on WhatsApp: ${waLink(o.phone)}`,
  ].join('\n');

  const html = `
  <div style="font-family:Nunito,Arial,sans-serif;background:#FFF5EA;padding:24px;color:#3F241E">
    <div style="max-width:520px;margin:0 auto;background:#FFFDF9;border:3px solid #3F241E;border-radius:16px;padding:24px">
      <h1 style="margin:0 0 16px;font-family:Georgia,serif;font-style:italic;color:#D9577F">New order request!</h1>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 12px 6px 0;font-weight:800;white-space:nowrap">${k}</td><td style="padding:6px 0">${escape(v)}</td></tr>`,
          )
          .join('')}
      </table>
      <p style="margin:16px 0 6px;font-weight:800">What they want:</p>
      <p style="margin:0;white-space:pre-wrap;background:#FBD5E0;border-radius:12px;padding:12px">${escape(o.order)}</p>
      <p style="margin:20px 0 0"><a href="${waLink(o.phone)}" style="display:inline-block;background:#EF7FA5;color:#3F241E;border:3px solid #3F241E;border-radius:999px;padding:10px 18px;font-weight:900;text-decoration:none">Reply on WhatsApp</a></p>
    </div>
  </div>`;
  return { text, html };
}

async function readBody(request: Request): Promise<{ data: Record<string, unknown>; isForm: boolean }> {
  const type = request.headers.get('content-type') ?? '';
  if (type.includes('application/json')) return { data: await request.json(), isForm: false };
  const form = await request.formData();
  return { data: Object.fromEntries(form.entries()), isForm: true };
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

export const POST: APIRoute = async ({ request, redirect }) => {
  let data: Record<string, unknown>;
  let isForm = false;
  try {
    ({ data, isForm } = await readBody(request));
  } catch {
    return json({ ok: false, error: 'bad_request' }, 400);
  }

  // Honeypot: real people never fill the hidden "website" field.
  if (typeof data.website === 'string' && data.website.trim() !== '') {
    return isForm ? redirect('/order-sent', 303) : json({ ok: true });
  }

  const { order, errors } = validate(data);
  if (Object.keys(errors).length > 0) {
    return isForm ? redirect('/#order', 303) : json({ ok: false, error: 'invalid', fields: Object.keys(errors) }, 422);
  }

  if (!RESEND_API_KEY || !ORDER_TO_EMAIL) {
    console.error('[order] RESEND_API_KEY or ORDER_TO_EMAIL is not set');
    return isForm ? redirect('/#order', 303) : json({ ok: false, error: 'not_configured' }, 503);
  }

  const resend = new Resend(RESEND_API_KEY);
  const { text, html } = emailBodies(order);
  const { error } = await resend.emails.send({
    from: ORDER_FROM_EMAIL || 'Mary And Kitchen <onboarding@resend.dev>',
    to: [ORDER_TO_EMAIL],
    subject: `New order request from ${order.name}`,
    text,
    html,
  });

  if (error) {
    console.error('[order] Resend error', error.name, error.message);
    return isForm ? redirect('/#order', 303) : json({ ok: false, error: 'send_failed' }, 502);
  }

  return isForm ? redirect('/order-sent', 303) : json({ ok: true });
};
