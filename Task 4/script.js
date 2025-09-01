// Sample blog data
const blogPosts = [
    {
        id: 1,
        title: "Getting Started with React Hooks",
        description: "Learn how to use React Hooks to manage state and side effects in your functional components. This comprehensive guide covers useState, useEffect, and custom hooks.",
        category: "tech",
        date: "2024-01-15",
        readTime: "5 min read",
        image: null
    },
    {
        id: 2,
        title: "My Journey Through Southeast Asia",
        description: "Discover the hidden gems of Southeast Asia through my 3-month backpacking adventure. From bustling markets in Bangkok to serene beaches in Bali.",
        category: "travel",
        date: "2024-01-10",
        readTime: "8 min read",
        image: null
    },
    {
        id: 3,
        title: "The Perfect Homemade Pizza Recipe",
        description: "Master the art of pizza making with this foolproof recipe. From the perfect dough to the ideal sauce, learn how to create restaurant-quality pizza at home.",
        category: "food",
        date: "2024-01-08",
        readTime: "6 min read",
        image: null
    },
    {
        id: 4,
        title: "Building Responsive Web Layouts with CSS Grid",
        description: "CSS Grid revolutionizes how we create layouts. Learn the fundamentals and advanced techniques to build responsive, flexible web designs.",
        category: "tech",
        date: "2024-01-05",
        readTime: "7 min read",
        image: null
    },
    {
        id: 5,
        title: "Minimalist Living: Less is More",
        description: "Embrace the minimalist lifestyle and discover how reducing clutter can lead to increased happiness, productivity, and peace of mind.",
        category: "lifestyle",
        date: "2024-01-03",
        readTime: "4 min read",
        image: null
    },
    {
        id: 6,
        title: "Exploring the Streets of Tokyo",
        description: "A culinary and cultural adventure through Tokyo's diverse neighborhoods. From traditional temples to modern skyscrapers, experience Japan's capital city.",
        category: "travel",
        date: "2024-01-01",
        readTime: "9 min read",
        image: null
    },
    {
        id: 7,
        title: "JavaScript ES6+ Features You Should Know",
        description: "Stay up-to-date with modern JavaScript features including arrow functions, destructuring, async/await, and more advanced ES6+ concepts.",
        category: "tech",
        date: "2023-12-28",
        readTime: "6 min read",
        image: null
    },
    {
        id: 8,
        title: "Healthy Meal Prep for Busy Professionals",
        description: "Save time and eat healthier with these meal prep strategies. Includes recipes, storage tips, and weekly planning guides for busy lifestyles.",
        category: "food",
        date: "2023-12-25",
        readTime: "5 min read",
        image: null
    },
    {
        id: 9,
        title: "Digital Detox: Reclaiming Your Time",
        description: "Learn practical strategies to reduce screen time and create a healthier relationship with technology. Tips for mindful living in the digital age.",
        category: "lifestyle",
        date: "2023-12-22",
        readTime: "7 min read",
        image: null
    },
    {
        id: 10,
        title: "The Art of French Pastry Making",
        description: "Dive into the world of French pastries with step-by-step guides for croissants, macarons, and éclairs. Master the techniques of professional bakers.",
        category: "food",
        date: "2023-12-20",
        readTime: "10 min read",
        image: null
    },
    {
        id: 11,
        title: "Building a Personal Brand Online",
        description: "Establish your digital presence and build a strong personal brand. Learn about content strategy, social media, and networking in the digital age.",
        category: "lifestyle",
        date: "2023-12-18",
        readTime: "8 min read",
        image: null
    },
    {
        id: 12,
        title: "Hidden Gems of European Cities",
        description: "Discover lesser-known attractions and local favorites in Europe's most popular cities. Your guide to authentic European experiences.",
        category: "travel",
        date: "2023-12-15",
        readTime: "12 min read",
        image: null
    }
];

// Global variables
let currentPage = 1;
let postsPerPage = 6;
let filteredPosts = [...blogPosts];
let currentCategory = 'all';
let currentSearchTerm = '';

// DOM elements
const blogGrid = document.getElementById('blogGrid');
const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');
const categoryFilter = document.getElementById('categoryFilter');
const pagination = document.getElementById('pagination');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const paginationInfo = document.getElementById('paginationInfo');
const noResults = document.getElementById('noResults');

// Initialize the blog
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    renderBlogPosts();
    updatePagination();
});

function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    });
    
    searchClear.addEventListener('click', clearSearch);
    
    // Category filter
    categoryFilter.addEventListener('change', handleCategoryFilter);
    
    // Pagination
    prevBtn.addEventListener('click', goToPreviousPage);
    nextBtn.addEventListener('click', goToNextPage);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

function handleSearch() {
    currentSearchTerm = searchInput.value.trim().toLowerCase();
    updateSearchClearButton();
    filterPosts();
    currentPage = 1;
    renderBlogPosts();
    updatePagination();
}

function clearSearch() {
    searchInput.value = '';
    currentSearchTerm = '';
    updateSearchClearButton();
    filterPosts();
    currentPage = 1;
    renderBlogPosts();
    updatePagination();
    searchInput.focus();
}

function updateSearchClearButton() {
    if (currentSearchTerm) {
        searchClear.classList.add('show');
    } else {
        searchClear.classList.remove('show');
    }
}

function handleCategoryFilter() {
    currentCategory = categoryFilter.value;
    filterPosts();
    currentPage = 1;
    renderBlogPosts();
    updatePagination();
}

function filterPosts() {
    filteredPosts = blogPosts.filter(post => {
        const matchesCategory = currentCategory === 'all' || post.category === currentCategory;
        const matchesSearch = !currentSearchTerm || 
            post.title.toLowerCase().includes(currentSearchTerm) ||
            post.description.toLowerCase().includes(currentSearchTerm);
        
        return matchesCategory && matchesSearch;
    });
}

function renderBlogPosts() {
    // Show loading state
    blogGrid.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i></div>';
    
    // Simulate loading delay for better UX
    setTimeout(() => {
        if (filteredPosts.length === 0) {
            blogGrid.innerHTML = '';
            noResults.style.display = 'block';
            pagination.style.display = 'none';
            return;
        }
        
        noResults.style.display = 'none';
        pagination.style.display = 'flex';
        
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const postsToShow = filteredPosts.slice(startIndex, endIndex);
        
        blogGrid.innerHTML = postsToShow.map(post => createBlogCard(post)).join('');
        
        // Add click event listeners to blog cards
        const blogCards = document.querySelectorAll('.blog-card');
        blogCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                const post = postsToShow[index];
                handleBlogCardClick(post);
            });
            
            // Add keyboard support
            card.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const post = postsToShow[index];
                    handleBlogCardClick(post);
                }
            });
        });
    }, 300);
}

function createBlogCard(post) {
    const formattedDate = formatDate(post.date);
    const categoryIcon = getCategoryIcon(post.category);
    
    return `
        <article class="blog-card" data-category="${post.category}" tabindex="0" role="button" aria-label="Read article: ${post.title}">
            <div class="blog-card-image">
                ${post.image ? 
                    `<img src="${post.image}" alt="${post.title}" loading="lazy">` : 
                    `<i class="fas ${categoryIcon} placeholder-icon"></i>`
                }
            </div>
            <div class="blog-card-content">
                <span class="blog-card-category">${post.category}</span>
                <h2 class="blog-card-title">${post.title}</h2>
                <p class="blog-card-description">${post.description}</p>
                <div class="blog-card-meta">
                    <span class="blog-card-date">
                        <i class="fas fa-calendar-alt"></i>
                        ${formattedDate}
                    </span>
                    <span class="blog-card-read-time">
                        <i class="fas fa-clock"></i>
                        ${post.readTime}
                    </span>
                </div>
            </div>
        </article>
    `;
}

function getCategoryIcon(category) {
    const icons = {
        tech: 'fa-code',
        travel: 'fa-plane',
        food: 'fa-utensils',
        lifestyle: 'fa-heart'
    };
    return icons[category] || 'fa-file-alt';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

function handleBlogCardClick(post) {
    // In a real application, this would navigate to the full blog post
    console.log('Opening blog post:', post.title);
    
    // For demo purposes, show an alert
    alert(`Opening "${post.title}"\n\nThis would navigate to the full blog post in a real application.`);
}

function updatePagination() {
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    
    // Update pagination info
    if (totalPages === 0) {
        paginationInfo.textContent = 'No pages';
    } else {
        paginationInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    }
    
    // Update button states
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    
    // Hide pagination if only one page or no results
    if (totalPages <= 1) {
        pagination.style.display = 'none';
    } else {
        pagination.style.display = 'flex';
    }
}

function goToPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        renderBlogPosts();
        updatePagination();
        scrollToTop();
    }
}

function goToNextPage() {
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderBlogPosts();
        updatePagination();
        scrollToTop();
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
    
    // Escape to clear search when search input is focused
    if (e.key === 'Escape' && document.activeElement === searchInput) {
        clearSearch();
    }
    
    // Arrow keys for pagination (when not focused on input elements)
    if (!['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        if (e.key === 'ArrowLeft' && !prevBtn.disabled) {
            e.preventDefault();
            goToPreviousPage();
        } else if (e.key === 'ArrowRight' && !nextBtn.disabled) {
            e.preventDefault();
            goToNextPage();
        }
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced search for better performance
const debouncedSearch = debounce(handleSearch, 300);
searchInput.removeEventListener('input', handleSearch);
searchInput.addEventListener('input', debouncedSearch);

// Analytics and tracking (placeholder functions)
function trackSearch(searchTerm) {
    console.log('Search tracked:', searchTerm);
    // In a real application, this would send data to analytics service
}

function trackCategoryFilter(category) {
    console.log('Category filter tracked:', category);
    // In a real application, this would send data to analytics service
}

function trackBlogCardClick(postId, postTitle) {
    console.log('Blog card click tracked:', postId, postTitle);
    // In a real application, this would send data to analytics service
}

// Accessibility improvements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Update announcements for screen readers
const originalFilterPosts = filterPosts;
filterPosts = function() {
    originalFilterPosts();
    const resultCount = filteredPosts.length;
    const message = `${resultCount} blog post${resultCount !== 1 ? 's' : ''} found`;
    announceToScreenReader(message);
};

// Performance optimization: Intersection Observer for lazy loading
const observerOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
};

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        }
    });
}, observerOptions);

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        blogPosts,
        filterPosts,
        formatDate,
        getCategoryIcon
    };
}

