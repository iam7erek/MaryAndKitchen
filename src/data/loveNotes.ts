/**
 * Love Notes: real messages from customers only. Never invent one.
 * To add a note, replace a placeholder below with the customer's words
 * (and their first name, or leave `from` empty if they'd rather not).
 * kind: 'bubble' looks like a WhatsApp message, 'sticky' like a fridge note.
 */
export interface LoveNote {
  text: string;
  from: string;
  kind: 'bubble' | 'sticky';
}

export const loveNotes: LoveNote[] = [
  { text: '[REAL MESSAGE]', from: '[CUSTOMER NAME]', kind: 'bubble' },
  { text: '[REAL MESSAGE]', from: '[CUSTOMER NAME]', kind: 'sticky' },
  { text: '[REAL MESSAGE]', from: '[CUSTOMER NAME]', kind: 'bubble' },
  { text: '[REAL MESSAGE]', from: '[CUSTOMER NAME]', kind: 'sticky' },
  { text: '[REAL MESSAGE]', from: '[CUSTOMER NAME]', kind: 'bubble' },
];
