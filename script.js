// ==========================================
// 1. โค้ด Canvas หิ่งห้อยเรืองแสง + โต้ตอบเมาส์
// ==========================================
const canvas = document.getElementById('particle-canvas');

if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const numberOfParticles = 80;

    const mouse = {
        x: null,
        y: null,
        radius: 120,
        isPressed: false
    };

    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasSize();

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    window.addEventListener('mousedown', () => { mouse.isPressed = true; });
    window.addEventListener('mouseup', () => { mouse.isPressed = false; });

    window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
        }
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
        mouse.isPressed = false;
    });

    window.addEventListener('resize', () => {
        setCanvasSize();
        init();
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 4 + 2;
            this.speedX = (Math.random() - 0.5) * 1.2;
            this.speedY = (Math.random() - 0.5) * 1.2;
            this.color = `hsl(${Math.random() * 50 + 45}, 100%, 70%)`;
            this.density = (Math.random() * 20) + 1;
        }

        update() {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;

                if (mouse.isPressed) {
                    this.x += forceDirectionX * 5;
                    this.y += forceDirectionY * 5;
                } else {
                    let force = (mouse.radius - distance) / mouse.radius;
                    let directionX = forceDirectionX * force * this.density;
                    let directionY = forceDirectionY * force * this.density;

                    this.x -= directionX;
                    this.y -= directionY;
                }
            } else {
                this.x += this.speedX;
                this.y += this.speedY;
            }

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animate);
    }

    init();
    animate();
}

// ==========================================
// 2. คลังคำแปลระบบสลับ 2 ภาษา (TH / EN) ครบทุกส่วน
// ==========================================
const translations = {
  th: {
    nav_home: "หน้าแรก",
    nav_about: "เกี่ยวกับ",
    nav_projects: "ผลงาน",
    nav_contact: "ติดต่อ",
    hero_title: "สวัสดีครับ ผมชื่อ Akkapap Suriyaprapa",
    hero_subtitle: "นักพัฒนาเว็บไซต์มือใหม่ที่กำลังเรียนรู้ทุกวัน",
    btn_projects: "ดูผลงาน",
    btn_contact: "ติดต่อผม",
    about_title: "เกี่ยวกับผม",
    about_p1: "สวัสดีครับ ผมจบการศึกษาระดับ ปริญญาตรี วิศวกรรมคอมพิวเตอร์",
    about_p2: "มีความรู้ด้าน การเขียนโค้ด, UX/UI, การสร้างเว็บไซต์ และ 3D Model",
    about_p3: "ชอบเรียนรู้สิ่งใหม่ ๆ และลงมือทำจริงเสมอครับ",
    exp_title: "ประสบการณ์ฝึกงาน:",
    exp_1: "เงินเทอร์โบ จำกัด มหาชน (5 เดือน)",
    exp_2: "Unithai Shipyard and Engineering (1 เดือน)",
    exp_3: "Agentplus.Th (9 เดือน)",
    projects_title: "ผลงาน",
    proj1_title: "เว็บไซต์แรกของผม",
    proj1_desc: "เว็บ Portfolio ที่ทำด้วย HTML และ CSS",
    proj2_title: "โปรเจกต์ที่สอง",
    proj2_desc: "กำลังวางแผนอยู่ครับ เร็ว ๆ นี้",
    proj3_title: "โปรเจกต์ที่สาม",
    proj3_desc: "รอติดตามได้เลย",
    contact_title: "ติดต่อผม",
    contact_desc: "สนใจร่วมงานหรืออยากคุยเล่น ทักมาได้เลยครับ"
  },
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_projects: "Projects",
    nav_contact: "Contact",
    hero_title: "Hello, I'm Akkapap Suriyaprapa",
    hero_subtitle: "Junior Web Developer learning every day",
    btn_projects: "View Projects",
    btn_contact: "Contact Me",
    about_title: "About Me",
    about_p1: "Hello! I graduated with a Bachelor's Degree in Computer Engineering.",
    about_p2: "Proficient in Coding, UX/UI, Web Development, and 3D Modeling.",
    about_p3: "Always eager to learn new technologies and gain hands-on experience.",
    exp_title: "Internship Experience:",
    exp_1: "Ngern Turbo Public Company Limited (5 months)",
    exp_2: "Unithai Shipyard and Engineering (1 month)",
    exp_3: "Agentplus.Th (9 months)",
    projects_title: "Projects",
    proj1_title: "My First Website",
    proj1_desc: "A Portfolio website built with HTML and CSS.",
    proj2_title: "Second Project",
    proj2_desc: "Currently planning, coming soon!",
    proj3_title: "Third Project",
    proj3_desc: "Stay tuned!",
    contact_title: "Contact Me",
    contact_desc: "Interested in working together? Feel free to reach out!"
  }
};

const langTh = document.getElementById("lang-th");
const langEn = document.getElementById("lang-en");

function changeLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      element.innerText = translations[lang][key];
    }
  });

  if (langTh && langEn) {
    langTh.classList.toggle("active", lang === "th");
    langEn.classList.toggle("active", lang === "en");
  }
}

if (langTh && langEn) {
  langTh.addEventListener("click", () => changeLanguage("th"));
  langEn.addEventListener("click", () => changeLanguage("en"));
}