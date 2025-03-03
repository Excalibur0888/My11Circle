document.addEventListener('DOMContentLoaded', function() {
    // Features tabs functionality
    const featureTabs = document.querySelectorAll('.feature-tab');
    const featurePanels = document.querySelectorAll('.feature-panel');

    if (featureTabs.length > 0 && featurePanels.length > 0) {
        function switchTab(targetId) {
            // Remove active class from all tabs and panels
            featureTabs.forEach(tab => tab.classList.remove('active'));
            featurePanels.forEach(panel => {
                panel.classList.remove('active');
                panel.style.display = 'none';
            });

            // Add active class to clicked tab and its panel
            const targetTab = document.querySelector(`[data-feature="${targetId}"]`);
            const targetPanel = document.getElementById(targetId);

            if (targetTab && targetPanel) {
                targetTab.classList.add('active');
                targetPanel.style.display = 'grid';
                // Trigger reflow
                targetPanel.offsetHeight;
                targetPanel.classList.add('active');
            }
        }

        featureTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.getAttribute('data-feature');
                switchTab(targetId);
            });
        });

        // Initialize first tab
        const firstTab = featureTabs[0];
        if (firstTab) {
            const firstTabId = firstTab.getAttribute('data-feature');
            switchTab(firstTabId);
        }
    }

    // Mobile menu functionality
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            burgerMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !burgerMenu.contains(e.target)) {
                burgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });

        // Close menu when clicking on links
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                burgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            window.location.href = 'thanks.html';
        });
    }

    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section[id]');
    if (sections.length > 0) {
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                
                if (navLink) {
                    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                        navLink.classList.add('active');
                    } else {
                        navLink.classList.remove('active');
                    }
                }
            });
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-panel, .community-feature, .content-block, .download-content');
    animatedElements.forEach(el => observer.observe(el));

    // Testimonials Slider
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');

    if (slides.length > 0 && dots.length > 0) {
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach(slide => {
                slide.classList.remove('active');
                slide.style.opacity = '0';
            });
            dots.forEach(dot => dot.classList.remove('active'));

            slides[index].classList.add('active');
            slides[index].style.opacity = '1';
            dots[index].classList.add('active');

            // Update buttons state
            if (prevBtn && nextBtn) {
                prevBtn.disabled = index === 0;
                nextBtn.disabled = index === slides.length - 1;
            }
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        // Initialize slider
        showSlide(0);

        // Event listeners
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', prevSlide);
            nextBtn.addEventListener('click', nextSlide);
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
    }

    // Achievement number animations
    const achievementNumbers = document.querySelectorAll('.achievement-number');
    if (achievementNumbers.length > 0) {
        const achievementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const count = parseInt(target.getAttribute('data-count'));
                    if (count) {
                        let current = 0;
                        const duration = 2000; // 2 seconds
                        const increment = count / (duration / 16); // 60fps
                        
                        const updateCount = () => {
                            current += increment;
                            if (current < count) {
                                target.textContent = Math.round(current) + (target.textContent.includes('M') ? 'M+' : '+');
                                requestAnimationFrame(updateCount);
                            } else {
                                target.textContent = count + (target.textContent.includes('M') ? 'M+' : '+');
                            }
                        };
                        
                        requestAnimationFrame(updateCount);
                    }
                    achievementObserver.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        achievementNumbers.forEach(number => {
            achievementObserver.observe(number);
        });
    }

    // Team member hover effects
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            member.style.transform = 'translateY(-10px)';
        });
        
        member.addEventListener('mouseleave', () => {
            member.style.transform = 'translateY(0)';
        });
    });

    // Milestone hover effects
    const milestones = document.querySelectorAll('.milestone');
    milestones.forEach(milestone => {
        milestone.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });

        milestone.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        });
    });

    // Accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-item');
    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            
            if (header && content) {
                header.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    // Close all accordions
                    accordionItems.forEach(accItem => {
                        accItem.classList.remove('active');
                        const accContent = accItem.querySelector('.accordion-content');
                        if (accContent) {
                            accContent.style.maxHeight = null;
                        }
                    });
                    
                    // Open clicked accordion if it wasn't active
                    if (!isActive) {
                        item.classList.add('active');
                        content.style.maxHeight = content.scrollHeight + 'px';
                    }
                });
            }
        });
    }

    // Age Verification
    const ageVerificationPopup = document.getElementById('ageVerificationPopup');
    const confirmAgeBtn = document.getElementById('confirmAge');
    const rejectAgeBtn = document.getElementById('rejectAge');

    if (ageVerificationPopup && confirmAgeBtn && rejectAgeBtn) {
        // Check if age has been verified
        const isAgeVerified = () => {
            return localStorage.getItem('ageVerified') === 'true';
        };

        // Show age verification popup
        const showAgeVerification = () => {
            ageVerificationPopup.style.display = 'flex';
            // Trigger reflow
            ageVerificationPopup.offsetHeight;
            ageVerificationPopup.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        // Hide age verification popup
        const hideAgeVerification = () => {
            ageVerificationPopup.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                ageVerificationPopup.style.display = 'none';
            }, 300);
        };

        // Handle age confirmation
        const handleAgeConfirmation = () => {
            localStorage.setItem('ageVerified', 'true');
            hideAgeVerification();
        };

        // Handle age rejection
        const handleAgeRejection = () => {
            localStorage.setItem('ageVerified', 'false');
            window.location.href = 'https://www.google.com';
        };

        // Add event listeners
        confirmAgeBtn.addEventListener('click', handleAgeConfirmation);
        rejectAgeBtn.addEventListener('click', handleAgeRejection);

        // Check age verification on page load
        if (!isAgeVerified()) {
            showAgeVerification();
        }
    }
}); 