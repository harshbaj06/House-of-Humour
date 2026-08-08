const WHATSAPP_NUMBER = "919230374701";
const WHATSAPP_DISPLAY = "+91 92303 74701";
const PHONE_NUMBER     = "+919230374701";

document.getElementById('waNumberLabel').textContent = WHATSAPP_DISPLAY;

let submission = null;

document.getElementById('hohForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name      = document.getElementById('name').value.trim();
  const phone     = document.getElementById('phone').value.trim();
  const state     = document.getElementById('state').value.trim();
  const city      = document.getElementById('city').value.trim();
  const social    = document.getElementById('social').value.trim();
  const videoLink = document.getElementById('videoLink').value.trim();
  const notes     = document.getElementById('notes').value.trim();
  const err       = document.getElementById('errmsg');

  if (!name || !phone || !state) {
    err.style.display = 'block';
    return;
  }
  err.style.display = 'none';

  submission = { name, phone, state, city, social, videoLink, notes };

  const btn     = document.getElementById('sendBtn');
  const spinner = document.getElementById('spinner');
  const label   = document.getElementById('sendBtnLabel');
  btn.disabled = true;
  spinner.style.display = 'inline-block';
  label.textContent = 'Formatting Dossier…';

  let msg = `*HOUSE OF HUMOUR — AUDITION DOSSIER*\n`;
  msg += `*East Zone Stand-Up Comedy Talent Hunt*\n`;
  msg += `─────────────────────────\n\n`;
  msg += `🎤 *PERFORMER PROFILE*\n`;
  msg += `• *Name:* ${name}\n`;
  msg += `• *WhatsApp:* ${phone}\n`;
  msg += `• *State:* ${state}\n`;
  if (city)   msg += `• *City:* ${city}\n`;
  if (social) msg += `• *Socials:* ${social}\n`;

  if (videoLink) {
    msg += `\n🔗 *PERFORMANCE CLIP LINK*\n${videoLink}\n`;
  }

  if (notes) {
    msg += `\n📝 *STAGE NOTES & BIO*\n${notes}\n`;
  }

  msg += `\n─────────────────────────\n`;
  msg += `🎬 *Attaching audition video clip below.*`;

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

  setTimeout(function() {
    document.getElementById('hohForm').style.display = 'none';
    document.getElementById('dot1').classList.remove('active');
    document.getElementById('dot2').classList.add('active');
    document.getElementById('step2').style.display = 'flex';

    // Update live preview card
    document.getElementById('prevName').textContent = name;
    document.getElementById('prevState').textContent = city ? `${state} (${city})` : state;

    const waBtn = document.getElementById('waBtn');
    waBtn.href = waUrl;

    const fallback = document.getElementById('fallback');
    document.getElementById('fallbackLink').href = waUrl;
    fallback.style.display = 'block';

    const callBtn = document.getElementById('callBtn');
    if (callBtn) callBtn.href = 'tel:' + PHONE_NUMBER;

    window.location.href = waUrl;

    setTimeout(function() {
      window.location.href = 'tel:' + PHONE_NUMBER;
    }, 2200);
  }, 900);
});
