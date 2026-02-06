/* ==========================================
   KODE - Main JavaScript
   ========================================== */

// Aktif navigasyon linkini işaretle
document.addEventListener('DOMContentLoaded', function() {
    setActiveNavLink();
    setupFaqToggle();
    setupUserSystem();
    setupThemeToggle();
    setupIntroArrow();
});

// Aktif sayfa linkini vurgula
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Basit karşılaştırma - tam URL yerine dosya adı kontrol et
        if (currentPath.includes(href) || 
            (href === 'index.html' && currentPath.endsWith('/')) ||
            (href === '/' && currentPath.endsWith('/'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// SSS açılır/kapanır özelliği
function setupFaqToggle() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isOpen = faqItem.classList.contains('open');
            
            // Tüm FAQ öğelerini kapat
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('open');
            });
            
            // Tıklanan öğeyi aç (kapalıysa)
            if (!isOpen) {
                faqItem.classList.add('open');
            }
        });
    });
}

// Kullanıcı sistemi
function setupUserSystem() {
    const userMenu = document.getElementById('user-menu');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    
    if (!userMenu) return;
    
    // Giriş durumu kontrolü
    const currentUser = getCurrentUser();
    
    if (currentUser) {
        // Giriş yapmış
        const profileImage = currentUser.profileImage || 'https://instagram.fist1-1.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fist1-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=somehash&edm=someedm&ccb=7-5&oh=00_AfD-someoh&oe=someoe';
        userMenu.innerHTML = `
            <img src="${profileImage}" alt="Profil" class="profile-avatar" onclick="window.location.href='hesabim.html'">
            <span>Merhaba, ${currentUser.username || currentUser.name}</span>
            <button id="account-btn">Hesabım</button>
            <button id="logout-btn">Çıkış</button>
        `;
        
        document.getElementById('account-btn').addEventListener('click', () => {
            window.location.href = 'hesabim.html';
        });
        
        document.getElementById('logout-btn').addEventListener('click', () => {
            logout();
        });
    } else {
        // Giriş yapmamış
        loginBtn.addEventListener('click', () => {
            window.location.href = 'giris.html';
        });
        
        registerBtn.addEventListener('click', () => {
            window.location.href = 'kaydol.html';
        });
    }
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

function logout() {
    localStorage.removeItem('currentUser');
    location.reload();
}

// Tema değiştirme
function setupThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (!themeToggleBtn) return;
    
    // Kaydedilmiş temayı yükle
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggleBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    
    themeToggleBtn.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        
        // Ok'u kaldır
        hideIntroArrow();
    });
}

// Giriş oku
function setupIntroArrow() {
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) return;
    
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const bgColor = isDark ? 'rgba(40, 40, 40, 0.95)' : 'rgba(0, 102, 204, 0.9)';
    const textColor = isDark ? '#ffffff' : 'white';
    
    const arrow = document.createElement('div');
    arrow.id = 'intro-arrow';
    arrow.innerHTML = `
        <div class="arrow-container">
            <div class="arrow">⬆️</div>
            <div class="arrow-text">Karanlık mod butonu burada!</div>
            <button id="dismiss-arrow">Anladım</button>
        </div>
    `;
    arrow.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 1000;
        background: ${bgColor};
        color: ${textColor};
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        font-size: 0.9rem;
        text-align: center;
    `;
    document.body.appendChild(arrow);
    
    document.getElementById('dismiss-arrow').addEventListener('click', hideIntroArrow);
}

function hideIntroArrow() {
    const arrow = document.getElementById('intro-arrow');
    if (arrow) {
        arrow.remove();
        localStorage.setItem('hasSeenIntro', 'true');
    }
}

// Form gönderimi (uyarı göster)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Mesajınız alındı. Bu form veri saklamaz. İletişim için e-mail kullanınız.');
        contactForm.reset();
    });
}
