// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const themeToggle = document.getElementById('theme-toggle');
const projectImages = document.querySelectorAll('.project-image img');

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Function to update SVG colors based on theme
    const updateSVGColors = (isDark) => {
        projectImages.forEach(img => {
            if (img.src.endsWith('.svg')) {
                fetch(img.src)
                    .then(response => response.text())
                    .then(svgContent => {
                        const parser = new DOMParser();
                        const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
                        const rect = svgDoc.querySelector('rect');
                        
                        if (isDark) {
                            // Darken the background colors in dark mode
                            const currentFill = rect.getAttribute('fill');
                            const darkerFill = adjustColorBrightness(currentFill, -20);
                            rect.setAttribute('fill', darkerFill);
                        }
                        
                        // Update the image source with the modified SVG
                        const serializer = new XMLSerializer();
                        const modifiedSVG = serializer.serializeToString(svgDoc);
                        const encodedSVG = encodeURIComponent(modifiedSVG);
                        img.src = `data:image/svg+xml,${encodedSVG}`;
                    })
                    .catch(error => console.error('Error updating SVG:', error));
            }
        });
    };

    // Helper function to adjust color brightness
    const adjustColorBrightness = (hex, percent) => {
        // Convert hex to RGB
        let r = parseInt(hex.substring(1,3), 16);
        let g = parseInt(hex.substring(3,5), 16);
        let b = parseInt(hex.substring(5,7), 16);

        // Adjust brightness
        r = Math.max(0, Math.min(255, r + (r * percent/100)));
        g = Math.max(0, Math.min(255, g + (g * percent/100)));
        b = Math.max(0, Math.min(255, b + (b * percent/100)));

        // Convert back to hex
        return '#' + 
            Math.round(r).toString(16).padStart(2, '0') +
            Math.round(g).toString(16).padStart(2, '0') +
            Math.round(b).toString(16).padStart(2, '0');
    };

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'data-theme') {
                const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                updateSVGColors(isDark);
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });

    // Initial theme check
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    updateSVGColors(isDark);

    // Add click event listeners to all filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            // Get the filter value from the clicked button
            const filterValue = button.getAttribute('data-filter');

            // Filter the projects with animation
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.add('fade-in');
                    }, 10);
                } else {
                    if (card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.classList.add('fade-in');
                        }, 10);
                    } else {
                        card.classList.remove('fade-in');
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });

    // Add animation class to all cards initially
    projectCards.forEach(card => {
        card.classList.add('fade-in');
    });
});

// Project Card Hover Effects
projectCards.forEach(card => {
    const overlay = card.querySelector('.project-overlay');
    
    card.addEventListener('mouseenter', () => {
        overlay.style.opacity = '1';
    });
    
    card.addEventListener('mouseleave', () => {
        overlay.style.opacity = '0';
    });
});

// Intersection Observer for Project Cards
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('fade-in');
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }, index * 100);
            projectObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    projectObserver.observe(card);
});

// GitHub Activity Calendar (Placeholder)
// You can integrate with GitHub's API or use a library like GitHub Calendar
const githubCalendar = document.querySelector('.github-calendar');
if (githubCalendar) {
    // Placeholder for GitHub activity visualization
    // You would typically use a library like github-calendar.js here
    console.log('GitHub calendar placeholder');
}

// GitHub Stats Animation
const statCards = document.querySelectorAll('.stat-card');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('scale-in');
            }, index * 200);
            statsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

statCards.forEach(card => {
    statsObserver.observe(card);
});

// Project Image Loading Animation
projectImages.forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('fade-in');
    });
}); 