const WHATSAPP_NUMBER = "919230374701";
const WHATSAPP_DISPLAY = "+91 92303 74701";
const PHONE_NUMBER     = "+919230374701";

document.getElementById('waNumberLabel').textContent = WHATSAPP_DISPLAY;

let submission = null;

document.getElementById('hohForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name   = document.getElementById('name').value.trim();
  const phone  = document.getElementById('phone').value.trim();
  const city   = document.getElementById('city').value.trim();
  const social = document.getElementById('social').value.trim();
  const title  = document.getElementById('title').value.trim();
  const notes  = document.getElementById('notes').value.trim();
  const err    = document.getElementById('errmsg');

  if (!name || !phone || !title) {
    err.style.display = 'block';
    return;
  }
  err.style.display = 'none';

  submission = { name, phone, city, social, title, notes };

  const btn     = document.getElementById('sendBtn');
  const spinner = document.getElementById('spinner');
  const label   = document.getElementById('sendBtnLabel');
  btn.disabled = true;
  spinner.style.display = 'inline-block';
  label.textContent = 'Sending details…';

  let msg = `Hi House of Humour 👋 I'm ${name}, sending my set "${title}".\n`;
  msg += `WhatsApp: ${phone}\n`;
  if (city)   msg += `City: ${city}\n`;
  if (social) msg += `Socials: ${social}\n`;
  if (notes)  msg += `Notes: ${notes}\n`;
  msg += `\n🎬 Attaching my video clip below now.`;

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

  // details are saved client-side here; swap in a real fetch() to your
  // own storage/sheet/CRM if you want them recorded before the redirect
  setTimeout(function() {
    document.getElementById('hohForm').style.display = 'none';
    document.getElementById('dot1').classList.remove('active');
    document.getElementById('dot2').classList.add('active');
    document.getElementById('step2').style.display = 'flex';

    const waBtn = document.getElementById('waBtn');
    waBtn.href = waUrl;

    const fallback = document.getElementById('fallback');
    document.getElementById('fallbackLink').href = waUrl;
    fallback.style.display = 'block';

    // Wire up the call button
    const callBtn = document.getElementById('callBtn');
    if (callBtn) callBtn.href = 'tel:' + PHONE_NUMBER;

    // best-effort auto redirect to WhatsApp; visible link is the reliable path
    window.location.href = waUrl;

    // Also attempt phone call redirect after a short delay
    setTimeout(function() {
      window.location.href = 'tel:' + PHONE_NUMBER;
    }, 1800);
  }, 900);
});
