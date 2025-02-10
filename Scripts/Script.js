window.onload = () => {
    const N = document.querySelector(".N");

    if (N) {
        // Move "No" button within the viewport, keeping everything else in place
        const Weave = () => {
            const MaxX = window.innerWidth - N.clientWidth;
            const MaxY = window.innerHeight - N.clientHeight;

            let X = Math.random() * MaxX;
            let Y = Math.random() * MaxY;

            N.style.position = "absolute"; // Required to move freely
            N.style.left = `${X}px`;
            N.style.top = `${Y}px`;
        };

        N.addEventListener("mouseover", Weave);
        N.addEventListener("click", Weave);
    }

    // "Yes" button stays in place, no movement
    const Y = document.querySelector(".Y");
    if (Y) {
        Y.style.position = "static"; // Ensure it doesn't move
        Y.addEventListener("click", () => {
            window.location.href = "../Pages/Y.html";
        });
    }

    // Ensure all images and polaroid container stay static
    const Polaroid = document.querySelector(".Polaroid");
    const Items = Array.from(document.querySelectorAll(".Img"));

    let Seed = new Date().getTime() % 100000;

    function Randomize() {
        Seed = (Seed * 9301 + 49297) % 233280;
        return Seed / 233280;
    }

    function Shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Randomize() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    Shuffle(Items);

    Items.forEach(item => {
        Polaroid.appendChild(item);

        const Rotate = (Randomize() * 16 - 8).toFixed(2);
        item.style.transform = `rotate(${Rotate}deg)`;
    });

    Items.forEach((item, index) => {
        item.style.zIndex = Items.length - index;

        item.addEventListener("click", () => {
            const Direction = Math.random() > 0.5 ? "translateX(150vw) rotate(30deg)" : "translateX(-150vw) rotate(-30deg)";
            
            item.style.transition = "transform 0.6s ease-in-out";
            item.style.transform = Direction;
            item.style.pointerEvents = "none";

            setTimeout(() => item.remove(), 600);
        });
    });
};
