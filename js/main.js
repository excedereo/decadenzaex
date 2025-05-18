// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
  // Запуск анимаций
  document.querySelectorAll('.gold-overlay').forEach(overlay => {
    overlay.style.animationPlayState = 'running';
  });

  // Установка начального фона
  const firstLayer = document.getElementById('bg-layer-1');
  firstLayer.style.backgroundImage =
    AppData.contentData.decadenza.bgGradient;
  firstLayer.classList.add('active');

  // Показ начального контента
  UI.showContent('decadenza');

  // Предзагрузка логотипов
  Object.values(AppData.contentData).forEach(item => {
    const img = new Image();
    img.src = item.logo;
  });
});