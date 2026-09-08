// ==========================================
// 1. โค้ด หิ่งห้อยเรืองแสง + แตะแล้วลาก/ผลักได้
// ==========================================
const canvas = document.getElementById('particle-canvas');

if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const numberOfParticles = 80;

    // เก็บตำแหน่งเมาส์และการกดลาก
    const mouse = {
        x: null,
        y: null,
        radius: 120, // ระยะรัศมีที่จะส่งผลกับหิ่งห้อย
        isPressed: false
    };

    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasSize();

    // ดักจับการเคลื่อนที่และการคลิก/แตะของเมาส์และหน้าจอสัมผัส
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
            this.size = Math.random() * 4 + 2; // ขนาดหิ่งห้อย
            this.speedX = (Math.random() - 0.5) * 1.2;
            this.speedY = (Math.random() - 0.5) * 1.2;
            this.color = `hsl(${Math.random() * 50 + 45}, 100%, 70%)`; // สีเขียวอมเหลืองหิ่งห้อย
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 20) + 1;
        }

        update() {
            // คำนวณระยะห่างระหว่างหิ่งห้อยกับตำแหน่งเมาส์
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            // ถ้าเมาส์ขยับมาใกล้หิ่งห้อย
            if (distance < mouse.radius) {
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;

                if (mouse.isPressed) {
                    // ถ้ากดคลิกค้าง/แตะลาก → ดึงหิ่งห้อยเข้าหาเมาส์
                    this.x += forceDirectionX * 5;
                    this.y += forceDirectionY * 5;
                } else {
                    // ถ้าเอามือ/เมาส์ไปเฉียด → ผลักหิ่งห้อยกระจายหนีออกจากเมาส์
                    let force = (mouse.radius - distance) / mouse.radius;
                    let directionX = forceDirectionX * force * this.density;
                    let directionY = forceDirectionY * force * this.density;

                    this.x -= directionX;
                    this.y -= directionY;
                }
            } else {
                // ขยับลอยไปมาปกติ
                this.x += this.speedX;
                this.y += this.speedY;
            }

            // ชนขอบจอแล้วเด้งกลับ
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color; // แสงฟุ้งเรืองแสงแบบหิ่งห้อย
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
// 2. โค้ดฟังก์ชันปุ่มต่างๆ (เปลี่ยนสี/ทักทาย/To-Do List)
// ==========================================
const สี = ["#667eea", "#f5576c", "#43e97b", "#fa709a", "#30cfd0"];
let i = 0;

const btnColor = document.getElementById("btn");
if (btnColor) {
    btnColor.addEventListener("click", () => {
        i = (i + 1) % สี.length;
        document.body.style.background = สี[i];
        const output = document.getElementById("output");
        if (output) output.textContent = "เปลี่ยนสีแล้ว! " + สี[i];
    });
}

const btnGreet = document.getElementById("greet");
if (btnGreet) {
    btnGreet.addEventListener("click", () => {
        const nameInput = document.getElementById("name");
        const msg = document.getElementById("msg");
        const name = nameInput ? nameInput.value : "";

        if (msg) {
            if (name === "") {
                msg.textContent = "กรอกชื่อก่อนสิครับ 😅";
            } else {
                msg.textContent = "สวัสดีครับคุณ " + name + "! 👋";
            }
        }
    });
}

const btnAdd = document.getElementById("add");
if (btnAdd) {
    btnAdd.addEventListener("click", () => {
        const taskInput = document.getElementById("task");
        const list = document.getElementById("list");
        const task = taskInput ? taskInput.value : "";

        if (task === "" || !list) return;

        const li = document.createElement("li");
        li.textContent = task;

        li.addEventListener("click", () => {
            li.remove();
        });

        list.appendChild(li);
        if (taskInput) taskInput.value = "";
    });
}