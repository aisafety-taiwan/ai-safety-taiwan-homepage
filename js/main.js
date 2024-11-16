document.addEventListener('DOMContentLoaded', () => {
    router.init();
    
    // 更新年份
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}); 