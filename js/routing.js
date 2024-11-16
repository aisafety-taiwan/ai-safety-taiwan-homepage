const route = (event) => {
    if (event) {
        event.preventDefault();
        const path = event.target.getAttribute('href');
        window.location.hash = path;
    }
    router.handleRoute();
};

const router = {
    init: () => {
        window.addEventListener('hashchange', router.handleRoute);
        
        if (!window.location.hash) {
            window.location.hash = 'home';
        } else {
            router.handleRoute();
        }
    },

    handleRoute: async () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        const path = window.location.hash.slice(1) || 'home';
        
        const routes = {
            'home': 'pages/home.html',
            'about': 'pages/about.html',
            'news': 'pages/news.html',
            'resources': 'pages/resources.html',
            'events': 'pages/events.html',
            'contact': 'pages/contact.html'
        };

        const content = document.getElementById('content');
        try {
            const page = await fetch(routes[path] || routes['home']);
            if (!page.ok) throw new Error('Page not found');
            const html = await page.text();
            
            if (html.trim()) {
                content.innerHTML = html;
                window.dispatchEvent(new Event('routeChange'));
                updateActiveNavItem(path);
            } else {
                throw new Error('Empty content');
            }
        } catch (error) {
            console.error('Page loading error:', error);
            content.innerHTML = `
                <div class="container mt-5">
                    <h1>Page not found</h1>
                    <p>The requested page could not be found.</p>
                    <a href="#home" onclick="route(event)" class="btn btn-primary">Return to Home</a>
                </div>
            `;
        }
    }
};

function updateActiveNavItem(path) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        const link = item.querySelector('.nav-link');
        if (link && link.getAttribute('href') === path) {
            item.classList.add('active');
        }
    });
} 