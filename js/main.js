// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Create overlay element
const overlay = document.createElement('div');
overlay.className = 'menu-overlay';
document.body.appendChild(overlay);

// Function to close mobile menu
const closeMobileMenu = () => {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
};

// Toggle mobile menu
menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Toggle body scroll
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close menu when clicking overlay
overlay.addEventListener('click', closeMobileMenu);

// Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Close menu on window resize (if switching to desktop view)
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Handle escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Smooth Scroll
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

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Skill Cards Animation
document.querySelectorAll('.skill-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Form Validation (if contact form exists)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // Basic form validation
        const email = contactForm.querySelector('input[type="email"]');
        const message = contactForm.querySelector('textarea');
        
        if (!email.value || !message.value) {
            e.preventDefault();
            alert('Please fill in all required fields');
            return;
        }
    });
}

// Dynamic copyright year
const copyrightYear = document.querySelector('.footer-content p');
if (copyrightYear) {
    copyrightYear.textContent = copyrightYear.textContent.replace('2024', new Date().getFullYear());
}

// Page load animation
window.addEventListener('load', () => {
    document.body.classList.add('page-loaded');
});

// Scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
document.body.appendChild(scrollTopBtn);

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

// Check authentication for projects page
if (window.location.pathname.includes('projects.html')) {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
        window.location.href = 'login.html';
    }
}

// Resume Page Enhancements
const initResumePage = () => {
    if (!document.querySelector('.resume-page')) return;

    // Skill Progress Animation
    const skills = document.querySelectorAll('.skill-progress');
    const animateSkill = (skill) => {
        const progress = skill.querySelector('.progress-bar');
        const targetWidth = progress.getAttribute('data-progress');
        const counter = skill.querySelector('.progress-counter');
        let width = 0;
        
        const animate = () => {
            if (width < targetWidth) {
                width++;
                progress.style.width = `${width}%`;
                counter.textContent = `${width}%`;
                requestAnimationFrame(animate);
            }
        };
        animate();
    };

    // Intersection Observer for Skills
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkill(entry.target);
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skills.forEach(skill => skillObserver.observe(skill));

    // Interactive Timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => timelineObserver.observe(item));

    // Dynamic Age Calculation
    const ageElement = document.querySelector('.age-number');
    if (ageElement) {
        const birthDate = new Date(ageElement.getAttribute('data-birthdate'));
        const age = Math.floor((new Date() - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
        ageElement.textContent = age;
    }

    // Experience Years Counter
    const experienceElement = document.querySelector('.experience-years');
    if (experienceElement) {
        const targetYears = parseInt(experienceElement.getAttribute('data-years'));
        let currentYear = 0;
        
        const animateExperience = () => {
            if (currentYear <= targetYears) {
                experienceElement.textContent = currentYear.toFixed(1);
                currentYear += 0.1;
                setTimeout(animateExperience, 50);
            } else {
                experienceElement.textContent = targetYears;
            }
        };
        animateExperience();
    }

    // Particle Background Effect
    const createParticleBackground = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const header = document.querySelector('.resume-header');
        
        if (!header) return;
        
        header.appendChild(canvas);
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '0';
        
        const resizeCanvas = () => {
            canvas.width = header.offsetWidth;
            canvas.height = header.offsetHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const particles = [];
        const particleCount = 50;

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animate);
        };

        animate();
    };

    createParticleBackground();

    // Interactive Project Cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const createRipple = (e) => {
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            card.appendChild(ripple);

            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;

            const x = e.clientX - rect.left - size/2;
            const y = e.clientY - rect.top - size/2;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        };

        card.addEventListener('click', createRipple);
    });

    // Smooth Section Navigation
    const navLinks = document.querySelectorAll('.resume-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Scroll Spy for Navigation
    const sections = document.querySelectorAll('.resume-section');
    const scrollSpy = () => {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', scrollSpy);

    // Dynamic Contact Form
    const contactForm = document.querySelector('.resume-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="loading-spinner"></span> Sending...';

            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));

            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            submitBtn.classList.add('success');

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('success');
                contactForm.reset();
            }, 3000);
        });

        // Real-time form validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            const createErrorElement = () => {
                const error = document.createElement('div');
                error.className = 'error-message';
                input.parentNode.appendChild(error);
                return error;
            };

            const errorElement = createErrorElement();

            input.addEventListener('input', () => {
                if (input.validity.valid) {
                    errorElement.textContent = '';
                    input.classList.remove('invalid');
                } else {
                    input.classList.add('invalid');
                    if (input.validity.valueMissing) {
                        errorElement.textContent = 'This field is required';
                    } else if (input.validity.typeMismatch) {
                        errorElement.textContent = 'Please enter a valid format';
                    } else if (input.validity.tooShort) {
                        errorElement.textContent = `Please enter at least ${input.minLength} characters`;
                    }
                }
            });
        });
    }

    // Print Resume Feature
    const printBtn = document.querySelector('.print-resume');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            // Add print-specific styles
            const style = document.createElement('style');
            style.textContent = `
                @media print {
                    .no-print { display: none !important; }
                    .resume-page { padding: 0; }
                    .resume-header { background: none !important; }
                    .timeline-item { break-inside: avoid; }
                }
            `;
            document.head.appendChild(style);
            
            window.print();
        });
    }

    // Download Resume as PDF
    const downloadBtn = document.querySelector('.download-resume');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            downloadBtn.classList.add('loading');
            
            // Simulate PDF generation delay
            setTimeout(() => {
                const link = document.createElement('a');
                link.href = downloadBtn.getAttribute('data-pdf-url');
                link.download = 'resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                downloadBtn.classList.remove('loading');
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'download-success';
                successMsg.textContent = 'Download started!';
                downloadBtn.parentNode.appendChild(successMsg);
                
                setTimeout(() => successMsg.remove(), 3000);
            }, 1500);
        });
    }

    // Skill Tags Cloud
    const createSkillCloud = () => {
        const skillsContainer = document.querySelector('.skills-cloud');
        if (!skillsContainer) return;

        const skills = skillsContainer.querySelectorAll('.skill-tag');
        skills.forEach((skill, index) => {
            const delay = index * 100;
            skill.style.animationDelay = `${delay}ms`;
            
            skill.addEventListener('mouseover', () => {
                skill.style.transform = 'scale(1.1) rotate(3deg)';
                skill.style.zIndex = '1';
            });
            
            skill.addEventListener('mouseout', () => {
                skill.style.transform = 'scale(1) rotate(0deg)';
                skill.style.zIndex = '0';
            });
        });
    };

    createSkillCloud();

    // Lazy Loading for Project Images
    const lazyLoadImages = () => {
        const images = document.querySelectorAll('.project-image[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    };

    lazyLoadImages();
};

// Initialize resume features when DOM is loaded
document.addEventListener('DOMContentLoaded', initResumePage);

// Modern Website Enhancements
const initModernFeatures = () => {
    // Smooth Page Transitions
    const pageTransition = () => {
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        document.body.appendChild(overlay);

        return {
            show: () => {
                overlay.classList.add('active');
                return new Promise(resolve => setTimeout(resolve, 500));
            },
            hide: () => {
                overlay.classList.remove('active');
                return new Promise(resolve => setTimeout(resolve, 500));
            }
        };
    };

    const transition = pageTransition();

    // Handle internal navigation
    document.querySelectorAll('a[href^="/"]').forEach(link => {
        link.addEventListener('click', async (e) => {
            if (link.target === '_blank') return;
            e.preventDefault();
            await transition.show();
            window.location.href = link.href;
        });
    });

    // Parallax Scroll Effect
    const parallaxElements = document.querySelectorAll('.parallax');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });

    // Magnetic Elements
    const magneticElements = document.querySelectorAll('.magnetic');
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0px, 0px)';
        });
    });

    // Smooth Scroll with Lerp
    const lerpValue = 0.1;
    let current = window.pageYOffset;
    let target = current;
    let isScrolling = false;

    const smoothScroll = () => {
        current = lerp(current, target, lerpValue);
        document.documentElement.style.setProperty('--scroll', current);
        
        const diff = Math.abs(target - current);
        if (diff < 0.01) {
            isScrolling = false;
            return;
        }
        
        requestAnimationFrame(smoothScroll);
    };

    const lerp = (start, end, factor) => start * (1 - factor) + end * factor;

    window.addEventListener('scroll', () => {
        target = window.pageYOffset;
        if (!isScrolling) {
            isScrolling = true;
            smoothScroll();
        }
    });

    // Text Scramble Effect
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }
        
        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise(resolve => this.resolve = resolve);
            this.queue = [];
            
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }
        
        update() {
            let output = '';
            let complete = 0;
            
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += char;
                } else {
                    output += from;
                }
            }
            
            this.el.innerText = output;
            
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
        
        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }

    // Apply scramble effect to headings
    document.querySelectorAll('.scramble-text').forEach(el => {
        const fx = new TextScramble(el);
        const originalText = el.textContent;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    fx.setText(originalText);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(el);
    });

    // Tilt Effect
    const tiltElements = document.querySelectorAll('.tilt');
    tiltElements.forEach(element => {
        let rect = element.getBoundingClientRect();
        
        element.addEventListener('mousemove', (e) => {
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            
            const dx = x - xc;
            const dy = y - yc;
            
            const tiltX = dy / yc;
            const tiltY = -(dx / xc);
            
            element.style.transform = `perspective(1000px) rotateX(${tiltX * 10}deg) rotateY(${tiltY * 10}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
        
        window.addEventListener('resize', () => {
            rect = element.getBoundingClientRect();
        });
    });

    // Cursor Effect
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    let cursorVisible = true;
    let cursorEnlarged = false;

    document.addEventListener('mousemove', (e) => {
        if (cursorVisible) {
            cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            cursorDot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        }
    });

    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
        cursorDot.classList.add('click');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
        cursorDot.classList.remove('click');
    });

    document.querySelectorAll('a, button, .clickable').forEach(el => {
        el.addEventListener('mouseover', () => {
            cursor.classList.add('hover');
            cursorDot.classList.add('hover');
        });
        
        el.addEventListener('mouseout', () => {
            cursor.classList.remove('hover');
            cursorDot.classList.remove('hover');
        });
    });

    // Reveal on Scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
};

// Initialize all modern features
document.addEventListener('DOMContentLoaded', initModernFeatures); 