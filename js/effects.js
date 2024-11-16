function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        toggleSwitch.checked = false;
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        toggleSwitch.checked = true;
    }
}

// 初始化主題
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleSwitch.checked = true;
    }
});

// 初始化函數
function initializeEffects() {
    initParallax();
    initBackToTop();
    initDarkMode();
    initPageTransitions();
    initScrollAnimation();
    initSmoothScroll();
    initNavbarScroll();
}

// 視差效果
function initParallax() {
    const parallaxHandler = () => {
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(window.pageYOffset * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    };
    
    window.addEventListener('scroll', parallaxHandler);
    window.addEventListener('resize', parallaxHandler);
}

// 返回頂部按鈕
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;

    const scrollHandler = () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    };

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', scrollHandler);
}

// 深色模式
function initDarkMode() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // 監聽系統主題變更
    window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

// 深色模式切換動畫
const toggleSwitch = document.querySelector('.switch input[type="checkbox"]');

function updateThemeIcon(theme) {
    const icons = document.querySelectorAll('.theme-switch-btn i');
    icons.forEach(icon => {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    });
}

// 頁面轉場效果
function initPageTransitions() {
    const content = document.getElementById('content');
    if (!content) return;

    content.addEventListener('animationend', () => {
        content.classList.remove('fade-in');
    });
}

// 添加滾動顯示效果
function initScrollAnimation() {
    const sections = document.querySelectorAll('.home-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// 添加平滑滾動效果
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 導航欄滾動效果
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const scrollHandler = () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', scrollHandler);
    scrollHandler(); // 初始檢查
}

// 初始化所有效果
document.addEventListener('DOMContentLoaded', initializeEffects);

// 路由切換後重新初始化效果
window.addEventListener('routeChange', () => {
    setTimeout(() => {
        document.getElementById('content').classList.add('fade-in');
        initializeEffects();
    }, 0);
});

// 無限滾動（用於新聞頁面）
let page = 1;
const loadMoreNews = async () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1000) {
        page++;
        try {
            const response = await fetch(`/api/news?page=${page}`);
            const newItems = await response.json();
            // 添加新的新聞項目到頁面
            appendNewsItems(newItems);
        } catch (error) {
            console.error('Error loading more news:', error);
        }
    }
};

if (window.location.pathname.includes('news')) {
    window.addEventListener('scroll', loadMoreNews);
}

// 監聽切換事件
toggleSwitch.addEventListener('change', toggleDarkMode); 