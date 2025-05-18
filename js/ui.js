// Управление интерфейсом
const UI = {
  async showContent(category) {
    const data = AppData.contentData[category];
    if (!data) return;

    this.updateLogo(data);
    this.updateEffects(data.hasEffects);
    await this.renderUserList(data.people);
    this.updateBackground(data.bgGradient);
  },

  updateLogo(data) {
    const logoElement = document.getElementById("logo");
    logoElement.src = data.logo;
    logoElement.alt = `${data} logo`;
  },

  updateEffects(hasEffects) {
    const logoContainer = document.getElementById("logo-container");
    const goldBg = document.querySelector('.gold-bg');

    if (hasEffects) {
      logoContainer.classList.add('decadenza-active');
      goldBg.classList.add('show-gold-borders');
    } else {
      logoContainer.classList.remove('decadenza-active');
      goldBg.classList.remove('show-gold-borders');
    }
  },

  async renderUserList(users) {
    const listContainer = document.getElementById("list-container");
    listContainer.innerHTML = '<h3 class="list-header">Участники группы</h3>';

    const userList = document.createElement('ul');
    userList.className = 'user-list';
    listContainer.appendChild(userList);

    for (const user of users) {
      const userItem = this.createUserListItem(user);
      userList.appendChild(userItem);

      try {
        const userData = await API.getUserData(user.id);
        this.updateUserListItem(userItem, userData, user.rank);
      } catch (error) {
        console.error('Ошибка загрузки:', error);
        this.showError(userItem);
      }
    }
  },

  createUserListItem(user) {
    const li = document.createElement('li');
    li.className = 'user-item';
    li.innerHTML = `
      <div class="loading-avatar">...</div>
      <div class="user-info">
        <div class="user-name loading-text">Загрузка...</div>
        <div class="user-rank">${user.rank}</div>
      </div>
    `;
    return li;
  },

  updateUserListItem(element, userData, rank) {
    element.innerHTML = `
      <img src="${userData.avatar}" class="user-avatar" alt="${userData.displayName}">
      <div class="user-info">
        <div class="user-name">${userData.displayName} <span class="user-username">@${userData.username}</span></div>
        <div class="user-rank">${rank}</div>
      </div>
    `;
  },

  updateBackground(gradient) {
    const nextLayer = AppData.currentBackgroundLayer === 1 ? 2 : 1;
    const current = document.getElementById(`bg-layer-${AppData.currentBackgroundLayer}`);
    const next = document.getElementById(`bg-layer-${nextLayer}`);

    next.style.backgroundImage = gradient;
    current.classList.remove('active');
    next.classList.add('active');

    AppData.currentBackgroundLayer = nextLayer;
  },

  showError(element) {
    const loadingText = element.querySelector('.loading-text');
    if (loadingText) {
      loadingText.textContent = 'Ошибка загрузки';
      loadingText.style.color = '#ff6b6b';
    }
  }
};