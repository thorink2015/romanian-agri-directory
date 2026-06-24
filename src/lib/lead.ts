// Shared trigger for the global lead / quote modal.
// Any component can call openLead() to open the modal in a given mode.

export type LeadVariant = 'match' | 'quote';

export interface LeadDetail {
  variant?: LeadVariant;
  /** Operator the quote is addressed to (quote variant) */
  operator?: { slug: string; name: string };
  /** County name to preselect in the form */
  county?: string;
  /** 'RO' | 'MD' — controls which region list / phrasing is used */
  country?: 'RO' | 'MD';
}

export const LEAD_EVENT = 'terradron:lead';

export function openLead(detail: LeadDetail = {}) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<LeadDetail>(LEAD_EVENT, { detail }));
}
