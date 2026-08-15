export function formatDate(dateString) {
  return new Intl.DateTimeFormat('en-ZA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${dateString}T00:00:00`));
}

export function getCertificateState(expiryDate) {
  const expiry = new Date(`${expiryDate}T23:59:59`);
  const now = new Date();
  if (now > expiry) return { status: 'Renewal required', tone: 'warn' };

  const diffDays = Math.ceil((expiry.getTime() - now.getTime()) / 86400000);
  if (diffDays <= 45) return { status: `Valid · ${diffDays} days remaining`, tone: 'attention' };
  return { status: 'Valid', tone: 'ok' };
}
