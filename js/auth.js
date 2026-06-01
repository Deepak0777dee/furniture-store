/* =============================================
   AUTH.JS — Client-side auth with localStorage
   STACKLY HOME Furniture Store
   ============================================= */

const AUTH_KEY = 'sh_user';

function authLogin(name, email, role, password) {
  const user = { name, email, role, password, loggedIn: true, ts: Date.now() };
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  return user;
}

function authSignup(name, email, role, password) {
  const user = { name, email, role, password, loggedIn: false, ts: Date.now() };
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  return user;
}

function authGetUser() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    const user = JSON.parse(raw);
    return user && user.loggedIn ? user : null;
  } catch { return null; }
}

function authIsLoggedIn() { return !!authGetUser(); }

function authLogout() {
  localStorage.removeItem(AUTH_KEY);
  window.location.href = 'index.html';
}

/* --------------------------------------------------
   NAVBAR SYNC — Updates login button or user chip
   -------------------------------------------------- */
function authSyncNavbar() {
  const user = authGetUser();
  const loginBtns = document.querySelectorAll('.nav-login-btn-wrap');

  loginBtns.forEach(wrap => {
    if (user) {
      wrap.innerHTML = `
        <div class="nav-user-chip" id="nav-user-chip">
          <div class="nav-user-avatar">${user.name ? user.name[0].toUpperCase() : 'U'}</div>
          <span class="nav-user-name">${user.name ? user.name.split(' ')[0] : user.email.split('@')[0]}</span>
          <div class="nav-user-dropdown" id="nav-user-dropdown">
            <a href="dashboard.html" id="nav-dash-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              Dashboard
            </a>
            <a href="dashboard.html#orders" id="nav-orders-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              My Orders
            </a>
            <a href="dashboard.html#saved" id="nav-saved-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
              Saved Items
            </a>
            <button onclick="authLogout()" id="nav-logout-btn" class="nav-logout-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Logout
            </button>
          </div>
        </div>`;
      const chip = wrap.querySelector('#nav-user-chip');
      chip.addEventListener('click', e => {
        e.stopPropagation();
        const dd = wrap.querySelector('#nav-user-dropdown');
        dd.classList.toggle('open');
      });
      document.addEventListener('click', () => {
        const dd = wrap.querySelector('#nav-user-dropdown');
        if (dd) dd.classList.remove('open');
      });
    } else {
      wrap.innerHTML = `<a href="login.html" class="nav-login-btn" id="nav-login-link">Login</a>`;
    }
  });

  // Mobile menu sync
  const mobileLoginWraps = document.querySelectorAll('.mobile-login-wrap');
  mobileLoginWraps.forEach(wrap => {
    if (user) {
      wrap.innerHTML = `
        <div class="mobile-user-info">
          <div class="mobile-user-avatar">${user.name ? user.name[0].toUpperCase() : 'U'}</div>
          <div>
            <strong>${user.name || user.email}</strong>
            <span class="role-badge">${user.role}</span>
          </div>
        </div>
        <a href="dashboard.html" style="display:block;padding:0.85rem 0;border-bottom:1px solid rgba(201,169,110,0.1);color:var(--text-secondary);font-size:0.9rem;">Dashboard</a>
        <a href="dashboard.html#orders" style="display:block;padding:0.85rem 0;border-bottom:1px solid rgba(201,169,110,0.1);color:var(--text-secondary);font-size:0.9rem;">My Orders</a>
        <button onclick="authLogout()" style="width:100%;text-align:left;background:none;cursor:pointer;padding:0.85rem 0;color:#ef4444;font-weight:600;font-size:0.9rem;border:none;">Logout</button>`;
    } else {
      wrap.innerHTML = `<a href="login.html" style="display:block;padding:0.9rem;background:linear-gradient(135deg,#C9A96E,#DFC08D);color:#0F0E0A;text-align:center;border-radius:50px;font-weight:700;font-size:0.9rem;margin:0.5rem 0;">Login</a>`;
    }
  });
}

document.addEventListener('DOMContentLoaded', authSyncNavbar);
