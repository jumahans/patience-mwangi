// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('bg-white/95', 'shadow-lg');
        header.classList.remove('bg-white/90');
    } else {
        header.classList.add('bg-white/90');
        header.classList.remove('bg-white/95', 'shadow-lg');
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn?.addEventListener('click', () => {
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
    } else {
        mobileMenu.classList.add('hidden');
    }
});

// Close mobile menu when a link is clicked
if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Smooth scroll for all navigation links
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

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animate skill bars when skills section is visible
            if (entry.target.closest('#skills')) {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes
    const animateElements = document.querySelectorAll('.scroll-animate, .fade-in, .fade-in-delay, .skill-card, .project-card, .blog-card, .testimonial-card');
    
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Initial animations for hero section
    setTimeout(() => {
        document.querySelector('.fade-in')?.classList.add('animate-in');
    }, 300);
    
    setTimeout(() => {
        document.querySelector('.fade-in-delay')?.classList.add('animate-in');
    }, 600);
});

// Animate skill progress bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width;
        }, 200);
    });
}

// Add hover effects for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add hover effects for skill cards with tooltips
document.querySelectorAll('.skill-card').forEach(card => {
    const skillName = card.getAttribute('data-skill');
    
    card.addEventListener('mouseenter', (e) => {
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.innerHTML = getSkillDescription(skillName);
        document.body.appendChild(tooltip);
        
        // Position tooltip
        const rect = card.getBoundingClientRect();
        tooltip.style.position = 'fixed';
        tooltip.style.top = (rect.top - 60) + 'px';
        tooltip.style.left = (rect.left + rect.width/2 - tooltip.offsetWidth/2) + 'px';
        tooltip.style.zIndex = '1000';
        tooltip.style.backgroundColor = '#1f2937';
        tooltip.style.color = 'white';
        tooltip.style.padding = '8px 12px';
        tooltip.style.borderRadius = '6px';
        tooltip.style.fontSize = '14px';
        tooltip.style.opacity = '0';
        tooltip.style.transition = 'opacity 0.3s';
        
        setTimeout(() => {
            tooltip.style.opacity = '1';
        }, 100);
    });
    
    card.addEventListener('mouseleave', () => {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
});

// Skill descriptions for tooltips
function getSkillDescription(skill) {
    const descriptions = {
        'Power BI': 'Advanced dashboard creation and data visualization',
        'SQL': 'Database querying and data manipulation',
        'Excel': 'Advanced formulas, pivot tables, and data analysis',
        'Data Cleaning': 'Data preprocessing and quality assurance',
        'Dashboard Development': 'Interactive business intelligence solutions'
    };
    return descriptions[skill] || 'Professional expertise in data analysis';
}

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    .fade-in, .fade-in-delay, .scroll-animate, .skill-card, .project-card, .blog-card, .testimonial-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .fade-in-delay {
        transition-delay: 0.3s;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .project-card, .blog-card, .testimonial-card {
        transition: all 0.3s ease;
    }
    
    .project-card:hover, .blog-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }
    
    .testimonial-card {
        background: white;
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        border: 1px solid #f3f4f6;
    }
    
    .testimonial-avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 1rem;
    }
    
    .project-image, .blog-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 0.75rem 0.75rem 0 0;
    }
    
    .tech-tag {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.75rem;
        font-weight: 500;
    }
    
    .social-icon {
        color: #9ca3af;
        transition: color 0.3s ease;
    }
    
    .social-icon:hover {
        color: #a855f7;
    }
    
    .cta-button:hover {
        box-shadow: 0 10px 30px rgba(168, 85, 247, 0.4);
    }
    
    @media (max-width: 768px) {
        .fade-in, .fade-in-delay, .scroll-animate {
            transform: translateY(20px);
        }
    }
`;

document.head.appendChild(style);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully!');
    
    // Add stagger animation to skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Add stagger animation to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.2}s`;
    });
});

// Project modal logic
const projectDetails = [
    {
        title: "Adult Care Facility Data Management",
        image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
        description: `Streamlined data entry, record keeping, and visit scheduling for a care facility in Washington County. Digitized handwritten records, maintained organized digital files, and implemented systems for tracking supervisory visits, admissions, and caregiver assignments.`
    },
    {
        title: "NGO Data Consolidation & Dashboard Admin",
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
        description: `Managed data consolidation, cleaning, and dashboard administration for a leading international NGO. Oversaw data entry workflows, built reporting templates, and maintained real-time dashboards to support program analysis and decision-making.`
    },
    {
        title: "Covid-19 Food Relief Program",
        image: "https://images.unsplash.com/photo-1581093588401-22b8d9333c73?auto=format&fit=crop&w=800&q=80",
        description: `Coordinated data collection, cleaning, and analysis for a large-scale food relief initiative at Karura Community Center. Designed beneficiary tracking systems, trained field teams on digital data tools, and delivered actionable insights to program leaders.`
    },
    {
        title: "Excel Template for LEFTI NGO",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
        description: `Developed a robust Excel template for an NGO to streamline data collection, record keeping, and analysis. Enabled automated WhatsApp messaging for beneficiary updates and engagement.`
    }
];

function openProjectModal(index) {
    const modal = document.getElementById('project-modal');
    const title = document.getElementById('modal-title');
    const image = document.getElementById('modal-image');
    const desc = document.getElementById('modal-description');
    const project = projectDetails[index];
    if (project) {
        title.textContent = project.title;
        image.src = project.image;
        desc.innerHTML = project.description.replace(/\n/g, '<br>');
        modal.classList.remove('hidden');
    }
}

function closeProjectModal() {
    document.getElementById('project-modal').classList.add('hidden');
}
