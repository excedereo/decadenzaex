// Работа с API
const API = {
  async getUserData(userId) {
    // Временная мок-функция
    return new Promise(resolve => {
      setTimeout(() => {
        if (AppData.mockUserData[userId]) {
          resolve(AppData.mockUserData[userId]);
        } else {
          resolve({
            displayName: `User ${userId}`,
            username: `user${userId}`,
            avatar: `https://via.placeholder.com/150?text=${userId}`
          });
        }
      }, 300);
    });

    /* Реальный запрос к Roblox API (пример):
    try {
      const response = await fetch(`https://users.roblox.com/v1/users/${userId}`);
      if (!response.ok) throw new Error('User not found');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      return {
        displayName: `User ${userId}`,
        username: `user${userId}`,
        avatar: `https://via.placeholder.com/150?text=${userId}`
      };
    }
    */
  }
};