// ==========================================
// 1. โค้ด Canvas หิ่งห้อยเรืองแสง + โต้ตอบเมาส์ (เวอร์ชันลื่นไหลไม่หยุดนิ่ง)
// ==========================================
const canvas = document.getElementById('particle-canvas');

if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const numberOfParticles = 300;

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

    // คำนวณพิกัดเมาส์ตามตำแหน่งจริงของ Canvas
    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mousedown', () => { mouse.isPressed = true; });
    window.addEventListener('mouseup', () => { mouse.isPressed = false; });

    window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.touches[0].clientX - rect.left;
            mouse.y = e.touches[0].clientY - rect.top;
        }
    });

    // รีเซ็ตเมาส์เมื่อเลื่อน Scroll หน้าจอ หรือเอาเมาส์ออกนอกจอ
    window.addEventListener('scroll', () => {
        mouse.x = null;
        mouse.y = null;
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
            // 1. ให้หิ่งห้อยขยับลอยตัวตลอดเวลาเสมอ (ไม่หยุดนิ่งเด็ดขาด)
            this.x += this.speedX;
            this.y += this.speedY;

            // 2. ตรวจสอบแรงผลักจากเมาส์เฉพาะเมื่อเมาส์อยู่บน Canvas จริงๆ
            if (mouse.x !== null && mouse.y !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.hypot(dx, dy);

                if (distance < mouse.radius) {
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;

                    if (mouse.isPressed) {
                        this.x += forceDirectionX * 4;
                        this.y += forceDirectionY * 4;
                    } else {
                        // ปรับแรงผลักให้นุ่มนวล หิ่งห้อยจะลอยหลบอย่างเป็นธรรมชาติ
                        let force = (mouse.radius - distance) / mouse.radius;
                        let directionX = forceDirectionX * force * 3;
                        let directionY = forceDirectionY * force * 3;

                        this.x -= directionX;
                        this.y -= directionY;
                    }
                }
            }

            // ชนขอบแล้วเด้งกลับเข้าจอ
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
    btn_resume: "📄 ดาวน์โหลด Resume",
    about_title: "เกี่ยวกับผม",
    about_p1: "สวัสดีครับ ผมจบการศึกษาระดับ ปริญญาตรี วิศวกรรมคอมพิวเตอร์",
    about_p2: "มีความรู้ด้าน การเขียนโค้ด, UX/UI, การสร้างเว็บไซต์ และ 3D Model",
    about_p3: "ชอบเรียนรู้สิ่งใหม่ ๆ และลงมือทำจริงเสมอครับ",
    exp_title: "ประสบการณ์ฝึกงาน:",
    exp_1: "เงินเทอร์โบ จำกัด มหาชน (5 เดือน)",
    exp_2: "Unithai Shipyard and Engineering (1 เดือน)",
    exp_3: "Agentplus.Th (9 เดือน)",
    nav_services:  "บริการ",
services_title:"บริการ",
services_sub:  "รับงานฟรีแลนซ์ ส่งงานตรงเวลา แก้ไขจนพอใจ",

srv1_title: "เว็บไซต์ Portfolio / Landing Page",
srv1_desc:  "เว็บหน้าเดียว ดูดีทั้งคอมและมือถือ พร้อมขึ้นออนไลน์ให้",
srv1_price: "เริ่มต้น 3,000 บาท",

srv2_title: "ออกแบบ UX/UI",
srv2_desc:  "ออกแบบหน้าจอเว็บ/แอป ส่งไฟล์ Figma พร้อมใช้งาน",
srv2_price: "เริ่มต้น 2,000 บาท",

srv3_title: "โมเดล 3D",
srv3_desc:  "ขึ้นโมเดลสินค้า/ตัวละคร พร้อมเรนเดอร์ภาพนิ่ง",
srv3_price: "เริ่มต้น 1,500 บาท",

services_cta: "สนใจจ้างงาน หรือปรึกษาก่อนได้ครับ",
btn_line:     "💬 ทักไลน์คุยงาน",
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
    btn_resume: "📄 Download Resume",
    about_title: "About Me",
    about_p1: "Hello! I graduated with a Bachelor's Degree in Computer Engineering.",
    about_p2: "Proficient in Coding, UX/UI, Web Development, and 3D Modeling.",
    about_p3: "Always eager to learn new technologies and gain hands-on experience.",
    exp_title: "Internship Experience:",
    exp_1: "Ngern Turbo Public Company Limited (5 months)",
    exp_2: "Unithai Shipyard and Engineering (1 month)",
    exp_3: "Agentplus.Th (9 months)",
    nav_services:  "Services",
services_title:"Services",
services_sub:  "Freelance work · Delivered on time · Revisions until you're happy",

srv1_title: "Portfolio / Landing Page Website",
srv1_desc:  "A clean one-page site that looks great on desktop and mobile, deployed online for you.",
srv1_price: "From 3,000 THB (~$85)",

srv2_title: "UX/UI Design",
srv2_desc:  "Web and app screen design, delivered as a ready-to-use Figma file.",
srv2_price: "From 2,000 THB (~$57)",

srv3_title: "3D Modeling",
srv3_desc:  "Product and character modeling with rendered still images.",
srv3_price: "From 1,500 THB (~$43)",

services_cta: "Interested in hiring me? Feel free to reach out.",
btn_line:     "💬 Chat on LINE",
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




