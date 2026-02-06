// Forum JavaScript

const bannedWords = ['küfür', 'siktir', 'amk', 'orospu', 'piç', 'argo', 'ırkçı', 'nazi', 'faşist', 'terörist'];

function checkBannedWords(text) {
    const lowerText = text.toLowerCase();
    return bannedWords.some(word => lowerText.includes(word));
}

document.addEventListener('DOMContentLoaded', function() {
    loadTopics();
    loadCommunities();
    
    // Arama
    const topicSearch = document.getElementById('topic-search');
    if (topicSearch) {
        topicSearch.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            filterTopics(query);
        });
    }
    
    // Theme toggle
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggleBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
        
        themeToggleBtn.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        });
    }
    
    const createCommunityBtn = document.getElementById('create-community-btn');
    if (createCommunityBtn) {
        createCommunityBtn.addEventListener('click', function() {
            const communityName = prompt('Topluluk adı:');
            if (communityName && communityName.trim()) {
                addCommunity(communityName.trim());
                loadCommunities();
            }
        });
    }
    const privacyLink = document.getElementById('privacy-policy-link');
    if (privacyLink) {
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('privacy-modal').style.display = 'block';
        });
    }
    
    const termsLink = document.getElementById('terms-link');
    if (termsLink) {
        termsLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('terms-modal').style.display = 'block';
        });
    }
    
    const rulesLink = document.getElementById('forum-rules-link');
    if (rulesLink) {
        rulesLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('rules-modal').style.display = 'block';
        });
    }
    
    const dmBtn = document.getElementById('dm-btn');
    if (dmBtn) {
        dmBtn.addEventListener('click', function() {
            loadDMs();
            document.getElementById('dm-modal').style.display = 'block';
        });
    }
    
    const sendDmBtn = document.getElementById('send-dm-btn');
    if (sendDmBtn) {
        sendDmBtn.addEventListener('click', function() {
            const recipient = document.getElementById('dm-recipient').value;
            const content = document.getElementById('dm-content').value;
            if (!recipient || !content) return;
            
            sendDM(recipient, content);
            document.getElementById('dm-recipient').value = '';
            document.getElementById('dm-content').value = '';
            loadDMs();
        });
    }
    
    document.getElementById('close-dm-modal').addEventListener('click', function() {
        document.getElementById('dm-modal').style.display = 'none';
    });
    
    const newTopicBtn = document.getElementById('new-topic-btn');
    if (newTopicBtn) {
        newTopicBtn.addEventListener('click', function() {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser) {
                alert('Konu açmak için giriş yapmalısınız.');
                window.location.href = 'giris.html';
                return;
            }
            document.getElementById('new-topic-modal').style.display = 'block';
        });
    }
    
    const newTopicForm = document.getElementById('new-topic-form');
    if (newTopicForm) {
        newTopicForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const title = document.getElementById('topic-title').value;
            const category = document.getElementById('topic-category').value;
            const content = document.getElementById('topic-content').value;
            const imageFile = document.getElementById('topic-image').files[0];
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            
            // Rate limiting: Son 1 dakikada en fazla 3 konu
            const lastTopicTime = localStorage.getItem(`lastTopic_${currentUser.email}`);
            const now = Date.now();
            if (lastTopicTime && now - lastTopicTime < 60000) { // 1 dakika
                const topicCount = parseInt(localStorage.getItem(`topicCount_${currentUser.email}`) || 0);
                if (topicCount >= 3) {
                    alert('Çok fazla konu açtınız. Biraz bekleyin.');
                    return;
                }
                localStorage.setItem(`topicCount_${currentUser.email}`, topicCount + 1);
            } else {
                localStorage.setItem(`topicCount_${currentUser.email}`, 1);
            }
            localStorage.setItem(`lastTopic_${currentUser.email}`, now);
            
            if (checkBannedWords(title) || checkBannedWords(content)) {
                alert('Yasaklı kelime kullandınız. Hesabınız yasaklandı.');
                // Hesabı sil
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const updatedUsers = users.filter(user => user.email !== currentUser.email);
                localStorage.setItem('users', JSON.stringify(updatedUsers));
                localStorage.removeItem('currentUser');
                window.location.href = 'giris.html';
                return;
            }
            
            let imageData = null;
            if (imageFile) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    imageData = e.target.result;
                    saveTopicWithImage(title, category, content, imageData, currentUser);
                };
                reader.readAsDataURL(imageFile);
            } else {
                saveTopicWithImage(title, category, content, null, currentUser);
            }
        });
    }
    
    const cancelTopicBtn = document.getElementById('cancel-topic-btn');
    if (cancelTopicBtn) {
        cancelTopicBtn.addEventListener('click', function() {
            document.getElementById('new-topic-modal').style.display = 'none';
            document.getElementById('new-topic-form').reset();
        });
    }
});

function saveTopicWithImage(title, category, content, imageData, currentUser) {
    const topic = {
        id: Date.now(),
        title,
        category,
        content,
        image: imageData,
        author: currentUser.username || currentUser.name,
        date: new Date().toLocaleString(),
        replies: [],
        likes: 0,
        dislikes: 0
    };
    
    saveTopic(topic);
    loadTopics();
    document.getElementById('new-topic-modal').style.display = 'none';
    document.getElementById('new-topic-form').reset();
}

function filterTopics(query) {
    const topics = JSON.parse(localStorage.getItem('topics')) || [];
    const filteredTopics = topics.filter(topic => 
        topic.title.toLowerCase().includes(query) || 
        topic.content.toLowerCase().includes(query)
    );
    displayTopics(filteredTopics);
}

function displayTopics(topics) {
    const topicsList = document.getElementById('topics-list');
    topicsList.innerHTML = '';
    
    if (topics.length === 0) {
        topicsList.innerHTML = '<p>Konu bulunamadı.</p>';
        return;
    }
    
    topics.forEach(topic => {
        const topicElement = document.createElement('div');
        topicElement.className = 'topic-item';
        const imageHtml = topic.image ? `<img src="${topic.image}" alt="Konu görseli" style="max-width: 100%; height: auto; margin: 1rem 0;">` : '';
        topicElement.innerHTML = `
            <h3>${topic.title} <small>(${topic.category})</small></h3>
            <p>${topic.content}</p>
            ${imageHtml}
            <small>Yazar: ${topic.author} | Tarih: ${topic.date} | Beğeni: ${topic.likes || 0} | Beğenmeme: ${topic.dislikes || 0}</small>
            <div class="topic-actions">
                <button class="like-btn" data-topic-id="${topic.id}">👍 ${topic.likes || 0}</button>
                <button class="dislike-btn" data-topic-id="${topic.id}">👎 ${topic.dislikes || 0}</button>
            </div>
            <div class="replies" id="replies-${topic.id}">
                ${topic.replies.map(reply => `<div class="reply"><strong>${reply.author}:</strong> ${reply.content} <small>${reply.date}</small></div>`).join('')}
            </div>
            <button class="reply-btn" data-topic-id="${topic.id}">Yanıt Ver</button>
            <div class="reply-form" id="reply-form-${topic.id}" style="display: none;">
                <textarea placeholder="Yanıtınızı yazın..." rows="3"></textarea>
                <button class="submit-reply-btn" data-topic-id="${topic.id}">Gönder</button>
                <button class="cancel-reply-btn" data-topic-id="${topic.id}">İptal</button>
            </div>
        `;
        topicsList.appendChild(topicElement);
    });
    
    // Reply buttons (yeniden bağla)
    attachReplyEvents();
}

function loadTopics() {
    const topics = JSON.parse(localStorage.getItem('topics')) || [];
    displayTopics(topics);
    
    attachReplyEvents();
}

function attachReplyEvents() {
    // Reply buttons
    document.querySelectorAll('.reply-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const topicId = this.getAttribute('data-topic-id');
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser) {
                alert('Yanıt vermek için giriş yapmalısınız.');
                window.location.href = 'giris.html';
                return;
            }
            document.getElementById(`reply-form-${topicId}`).style.display = 'block';
        });
    });
    
    // Like buttons
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const topicId = this.getAttribute('data-topic-id');
            updateVote(topicId, 'like');
        });
    });
    
    // Dislike buttons
    document.querySelectorAll('.dislike-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const topicId = this.getAttribute('data-topic-id');
            updateVote(topicId, 'dislike');
        });
    });
    
    // Submit reply
    document.querySelectorAll('.submit-reply-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const topicId = this.getAttribute('data-topic-id');
            const textarea = this.previousElementSibling;
            const content = textarea.value;
            if (!content.trim()) return;
            
            if (checkBannedWords(content)) {
                alert('Yasaklı kelime kullandınız. Hesabınız yasaklandı.');
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const updatedUsers = users.filter(user => user.email !== currentUser.email);
                localStorage.setItem('users', JSON.stringify(updatedUsers));
                localStorage.removeItem('currentUser');
                window.location.href = 'giris.html';
                return;
            }
            
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            
            // Rate limiting: Son 1 dakikada en fazla 5 reply
            const lastReplyTime = localStorage.getItem(`lastReply_${currentUser.email}`);
            const now = Date.now();
            if (lastReplyTime && now - lastReplyTime < 60000) { // 1 dakika
                const replyCount = parseInt(localStorage.getItem(`replyCount_${currentUser.email}`) || 0);
                if (replyCount >= 5) {
                    alert('Çok fazla yanıt gönderdiniz. Biraz bekleyin.');
                    return;
                }
                localStorage.setItem(`replyCount_${currentUser.email}`, replyCount + 1);
            } else {
                localStorage.setItem(`replyCount_${currentUser.email}`, 1);
            }
            localStorage.setItem(`lastReply_${currentUser.email}`, now);
            
            const reply = {
                author: currentUser.username || currentUser.name,
                content,
                date: new Date().toLocaleString()
            };
            
            addReply(topicId, reply);
            // Puan ver
            awardPoints(currentUser.email, 5);
            // Bildirim gönder
            sendNotification(topic.author, `Konunuz "${topic.title}" yeni bir yanıt aldı.`);
            loadTopics();
        });
    });
    
    // Cancel reply
    document.querySelectorAll('.cancel-reply-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const topicId = this.getAttribute('data-topic-id');
            document.getElementById(`reply-form-${topicId}`).style.display = 'none';
            this.previousElementSibling.previousElementSibling.value = '';
        });
    });
}

function sendNotification(toUser, message) {
    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    notifications.push({
        to: toUser,
        message,
        date: new Date().toLocaleString(),
        read: false
    });
    localStorage.setItem('notifications', JSON.stringify(notifications));
}

function loadDMs() {
    const dms = JSON.parse(localStorage.getItem('dms')) || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userDMs = dms.filter(dm => dm.to === (currentUser.username || currentUser.name) || dm.from === (currentUser.username || currentUser.name));
    const dmList = document.getElementById('dm-list');
    dmList.innerHTML = userDMs.map(dm => `<div><strong>${dm.from} -> ${dm.to}:</strong> ${dm.content} <small>${dm.date}</small></div>`).join('');
}

function addCommunity(name) {
    const communities = JSON.parse(localStorage.getItem('communities')) || [];
    if (!communities.find(c => c.name === name)) {
        communities.push({ name, members: 1 });
        localStorage.setItem('communities', JSON.stringify(communities));
    }
}

function loadCommunities() {
    const communities = JSON.parse(localStorage.getItem('communities')) || [
        { name: 'Genel', members: 0 },
        { name: 'Kodlama', members: 0 },
        { name: 'Elektronik', members: 0 },
        { name: 'Proje Paylaşımları', members: 0 }
    ];
    const list = document.getElementById('communities-list');
    list.innerHTML = '';
    communities.forEach(community => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#" data-community="${community.name}">${community.name} (${community.members} üye)</a>`;
        list.appendChild(li);
    });
    localStorage.setItem('communities', JSON.stringify(communities));
}