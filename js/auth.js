// Auth JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mevcut hesabı sil ve yönetici hesabı ekle
    let users = JSON.parse(localStorage.getItem('users')) || [];
    // oguzemrehank@gmail.com'u sil eğer şifresi merhaba2020 ise
    users = users.filter(user => !(user.email === 'oguzemrehank@gmail.com' && user.password === 'merhaba2020'));
    // Yokedicibler hesabını sil
    users = users.filter(user => user.username !== 'Yokedicibler');
    // Yönetici hesabı ekle eğer yoksa
    if (!users.find(user => user.email === '1')) {
        users.push({ username: 'Yönetici', email: '1', phone: '+901', password: '1', description: '', points: 0 });
    }
    localStorage.setItem('users', JSON.stringify(users));
    
    // Ülke arama özelliği
    const countrySearch = document.getElementById('country-search');
    const countryCodeSelect = document.getElementById('country-code');
    if (countrySearch && countryCodeSelect) {
        countrySearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const options = countryCodeSelect.options;
            for (let i = 0; i < options.length; i++) {
                const option = options[i];
                const text = option.text.toLowerCase();
                if (text.includes(searchTerm)) {
                    option.style.display = '';
                } else {
                    option.style.display = 'none';
                }
            }
        });
    }
    
    // Register form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        const registerTypeSelect = document.getElementById('register-type');
        const emailGroup = document.getElementById('email-group');
        const phoneGroup = document.getElementById('phone-group');
        
        registerTypeSelect.addEventListener('change', function() {
            if (this.value === 'email') {
                emailGroup.style.display = 'block';
                phoneGroup.style.display = 'none';
                document.getElementById('email').required = true;
                document.getElementById('phone').required = false;
            } else {
                emailGroup.style.display = 'none';
                phoneGroup.style.display = 'block';
                document.getElementById('email').required = false;
                document.getElementById('phone').required = true;
            }
        });
        
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const registerType = registerTypeSelect.value;
            let identifier, phone = '';
            if (registerType === 'email') {
                identifier = document.getElementById('email').value;
            } else {
                const countryCode = document.getElementById('country-code').value;
                phone = countryCode + document.getElementById('phone').value;
                identifier = phone;
            }
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const captcha = document.getElementById('captcha').checked;
            
            if (password !== confirmPassword) {
                alert('Şifreler eşleşmiyor.');
                return;
            }
            
            if (password.length < 8 && identifier !== '1') {
                alert('Şifre en az 8 karakter olmalıdır.');
                return;
            }
            
            if (!captcha) {
                alert('Lütfen "Kesinlikle robot değilim" kutusunu işaretleyin.');
                return;
            }
            
            if (registerUser(username, identifier, phone, password, registerType)) {
                alert('Kayıt başarılı! Giriş yapabilirsiniz.');
                window.location.href = 'giris.html';
            } else {
                alert('Bu e-posta veya telefon numarası zaten kayıtlı.');
            }
        });
        
        // Password toggle
        const togglePassword = document.getElementById('toggle-password');
        const passwordInput = document.getElementById('password');
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            this.textContent = type === 'password' ? '👁️' : '🙈';
        });
        
        const toggleConfirmPassword = document.getElementById('toggle-confirm-password');
        const confirmPasswordInput = document.getElementById('confirm-password');
        toggleConfirmPassword.addEventListener('click', function() {
            const type = confirmPasswordInput.type === 'password' ? 'text' : 'password';
            confirmPasswordInput.type = type;
            this.textContent = type === 'password' ? '👁️' : '🙈';
        });
    }
    
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        const loginTypeSelect = document.getElementById('login-type');
        const emailGroup = document.getElementById('email-group');
        const phoneGroup = document.getElementById('phone-group');
        
        loginTypeSelect.addEventListener('change', function() {
            if (this.value === 'email') {
                emailGroup.style.display = 'block';
                phoneGroup.style.display = 'none';
                document.getElementById('email').required = true;
                document.getElementById('phone').required = false;
            } else {
                emailGroup.style.display = 'none';
                phoneGroup.style.display = 'block';
                document.getElementById('email').required = false;
                document.getElementById('phone').required = true;
            }
        });
        
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const loginType = loginTypeSelect.value;
            let identifier, password;
            if (loginType === 'email') {
                identifier = document.getElementById('email').value;
            } else {
                const countryCode = document.getElementById('country-code').value;
                identifier = countryCode + document.getElementById('phone').value;
            }
            password = document.getElementById('password').value;
            
            if (loginUser(identifier, password, loginType)) {
                window.location.href = 'index.html';
            } else {
                alert('Geçersiz giriş bilgileri.');
            }
        });
        
        // Password toggle for login
        const togglePasswordLogin = document.getElementById('toggle-password');
        const passwordInputLogin = document.getElementById('password');
        if (togglePasswordLogin && passwordInputLogin) {
            togglePasswordLogin.addEventListener('click', function() {
                const type = passwordInputLogin.type === 'password' ? 'text' : 'password';
                passwordInputLogin.type = type;
                this.textContent = type === 'password' ? '👁️' : '🙈';
            });
        }
    }
    
    // Profile page
    if (window.location.pathname.includes('hesabim.html')) {
        loadProfile();
        
        // Profil resmi değiştirme
        const changeProfileImageBtn = document.getElementById('change-profile-image-btn');
        const profileImageInput = document.getElementById('profile-image-input');
        const profileImage = document.getElementById('profile-image');
        
        changeProfileImageBtn.addEventListener('click', function() {
            profileImageInput.click();
        });
        
        profileImageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imageData = e.target.result;
                    profileImage.src = imageData;
                    updateProfile({ profileImage: imageData });
                };
                reader.readAsDataURL(file);
            }
        });
        
        document.getElementById('delete-account-btn').addEventListener('click', function() {
            if (confirm('Hesabınızı silmek istediğinizden emin misiniz?')) {
                deleteAccount();
                window.location.href = 'index.html';
            }
        });
    }
    
    // Hesabım sayfası için düzenleme özelliği
    if (window.location.pathname.includes('hesabim.html')) {
        setupProfileEditing();
    }
});

function registerUser(username, identifier, phone, password, type = 'email') {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(user => user.email === identifier || user.phone === identifier)) {
        return false;
    }
    users.push({ username, email: type === 'email' ? identifier : '', phone: type === 'phone' ? identifier : phone, password, description: '', points: 0 });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
}

function loginUser(identifier, password, type = 'email') {
    // Yönetici hesabı kontrolü
    if ((identifier === '1' || identifier === '+901') && password === '1') {
        const adminUser = { username: 'Yönetici', email: '1', phone: '+901', password: '1', description: '' };
        localStorage.setItem('currentUser', JSON.stringify(adminUser));
        return true;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => {
        if (type === 'email') {
            return user.email === identifier && user.password === password;
        } else {
            return user.phone === identifier && user.password === password;
        }
    });
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
    }
    return false;
}

function updateProfile(updates) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.email === currentUser.email);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updates };
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
    }
}

function deleteAccount() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.filter(user => user.email !== currentUser.email);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.removeItem('currentUser');
}

function loadProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        document.getElementById('profile-username').textContent = currentUser.username || currentUser.name;
        document.getElementById('profile-email').textContent = currentUser.email;
        document.getElementById('profile-phone').textContent = currentUser.phone || 'Belirtilmemiş';
        document.getElementById('profile-points').textContent = currentUser.points || 0;
        const badges = getBadges(currentUser.points || 0);
        document.getElementById('profile-badges').textContent = badges.join(', ') || 'Henüz rozet yok';
        document.getElementById('profile-description').textContent = currentUser.description || 'Açıklama yok';
        if (currentUser.profileImage) {
            document.getElementById('profile-image').src = currentUser.profileImage;
        }
        
        // Bildirimleri yükle
        loadNotifications();
    }
}

function loadNotifications() {
    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userNotifications = notifications.filter(n => n.to === (currentUser.username || currentUser.name));
    const list = document.getElementById('notifications-list');
    list.innerHTML = userNotifications.map(n => `<div class="${n.read ? 'read' : 'unread'}">${n.message} <small>${n.date}</small></div>`).join('');
}

function getBadges(points) {
    const badges = [];
    if (points >= 100) badges.push('Uzman');
    if (points >= 50) badges.push('Aktif');
    if (points >= 10) badges.push('Yeni Başlayan');
    return badges;
}

// Profil düzenleme fonksiyonları
function setupProfileEditing() {
    const editBtn = document.getElementById('edit-profile-btn');
    const saveBtn = document.getElementById('save-profile-btn');
    const cancelBtn = document.getElementById('cancel-edit-btn');
    
    if (!editBtn) return;
    
    editBtn.addEventListener('click', function() {
        enableEditMode();
    });
    
    saveBtn.addEventListener('click', function() {
        saveProfileChanges();
    });
    
    cancelBtn.addEventListener('click', function() {
        disableEditMode();
        loadProfile(); // Orijinal verileri geri yükle
    });
}

function enableEditMode() {
    // Span'ları input'lara dönüştür
    const fields = ['username', 'phone', 'description'];
    fields.forEach(field => {
        const span = document.getElementById(`profile-${field}`);
        const value = span.textContent;
        span.innerHTML = `<input type="text" id="edit-${field}" value="${value}" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border-light); border-radius: 4px; background: var(--bg-light); color: var(--text-dark);">`;
    });
    
    // Butonları göster/gizle
    document.getElementById('edit-profile-btn').style.display = 'none';
    document.getElementById('save-profile-btn').style.display = 'inline-block';
    document.getElementById('cancel-edit-btn').style.display = 'inline-block';
}

function disableEditMode() {
    // Input'ları span'lara geri dönüştür
    const fields = ['username', 'phone', 'description'];
    fields.forEach(field => {
        const input = document.getElementById(`edit-${field}`);
        if (input) {
            const value = input.value;
            document.getElementById(`profile-${field}`).innerHTML = value;
        }
    });
    
    // Butonları göster/gizle
    document.getElementById('edit-profile-btn').style.display = 'inline-block';
    document.getElementById('save-profile-btn').style.display = 'none';
    document.getElementById('cancel-edit-btn').style.display = 'none';
}

function saveProfileChanges() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Güncellenmiş değerleri al
    const updatedUser = {
        ...currentUser,
        username: document.getElementById('edit-username').value,
        phone: document.getElementById('edit-phone').value,
        description: document.getElementById('edit-description').value
    };
    
    // Kullanıcıları güncelle
    const updatedUsers = users.map(user => 
        user.email === currentUser.email ? updatedUser : user
    );
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    disableEditMode();
    loadProfile();
    alert('Profil güncellendi!');
}