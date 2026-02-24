// -----------------------------
// Flight Data
// -----------------------------
const dataA = [
    { date: "21 March", title: "Outbound to NYC", detail: "Charlotte: JetBlue (€356) | David: United (€190)", cost: "€546", icon: "✈️", stay: "10 Days" },
    { date: "31 March", title: "To Cincinnati (CVG)", detail: "NYC -> CVG | American Airlines (x2 passengers)", cost: "€380", icon: "🕍", stay: "12 Days Pesach" },
    { date: "12 April", title: "San Juan Stop", detail: "CVG -> SJU | American (x2 passengers)", cost: "€218", icon: "🌴", stay: "9 Days" },
    { date: "21 April", title: "To Miami (MIA)", detail: "SJU -> MIA | Direct Flight (x2 passengers)", cost: "€104", icon: "☀️", stay: "14 Days" },
    { date: "05 May", title: "Return to AMS", detail: "KLM Direct (16:55 Dep)", cost: "€572", icon: "🛫", stay: "End" }
];

const dataB_NoSJ = [
    { date: "19 March", title: "Outbound to Miami", detail: "Charlotte: JetBlue (€464) | David: Frontier (€78)", cost: "€542", icon: "✈️", stay: "12 Days" },
    { date: "31 March", title: "To Cincinnati (CVG)", detail: "FLL -> CVG | Delta (x2 passengers)", cost: "€252", icon: "🕍", stay: "12 Days Pesach" },
    { date: "12 April", title: "To New York (JFK)", detail: "CVG -> JFK | United (x2 passengers)", cost: "€218", icon: "🗽", stay: "21 Days" },
    { date: "05 May", title: "Return to AMS", detail: "KLM/Delta Options", cost: "€403", icon: "🛫", stay: "End" }
];

const dataB_SJ = [
    { date: "19 March", title: "Outbound to Miami", detail: "Charlotte: JetBlue (€464) | David: Frontier (€78)", cost: "€542", icon: "✈️", stay: "12 Days" },
    { date: "31 March", title: "To Cincinnati (CVG)", detail: "FLL -> CVG | Delta (x2 passengers)", cost: "€252", icon: "🕍", stay: "12 Days Pesach" },
    { date: "12 April", title: "San Juan Extension", detail: "CVG -> SJU | American (x2 passengers)", cost: "€218", icon: "🌴", stay: "9 Days" },
    { date: "21 April", title: "To New York (JFK)", detail: "SJU -> JFK | Delta/JetBlue (x2 passengers)", cost: "€244", icon: "🗽", stay: "12 Days" },
    { date: "05 May", title: "Return to AMS", detail: "KLM/Delta Options", cost: "€403", icon: "🛫", stay: "End" }
];

// -----------------------------
// State & UI Logic
// -----------------------------
let activeOption = 'A';

function revealSite() {
    document.getElementById('intro-overlay').classList.add('hidden-panel');
    setTimeout(() => { document.getElementById('intro-overlay').style.display = 'none'; }, 800);
}

function setOption(opt) {
    activeOption = opt;
    const btnA = document.getElementById('toggleOptA');
    const btnB = document.getElementById('toggleOptB');
    const sjToggleContainer = document.getElementById('sjToggleContainer');
    const sjStatRow = document.getElementById('sjStatRow');

    if (opt === 'A') {
        btnA.className = "px-6 py-2 rounded-full text-sm font-bold transition-all bg-emerald-500 text-white shadow-sm";
        btnB.className = "px-6 py-2 rounded-full text-sm font-bold transition-all text-slate-500";
        sjToggleContainer.classList.add('hidden');
        sjStatRow.classList.add('hidden');
    } else {
        btnB.className = "px-6 py-2 rounded-full text-sm font-bold transition-all bg-emerald-500 text-white shadow-sm";
        btnA.className = "px-6 py-2 rounded-full text-sm font-bold transition-all text-slate-500";
        sjToggleContainer.classList.remove('hidden');
    }
    updateUI();
}

function updateUI() {
    const isSJ = document.getElementById('sjToggle').checked;
    const sjStatRow = document.getElementById('sjStatRow');
    
    let totalPrice = "";
    let duration = "";
    let nycStay = "";
    let timelineData = [];

    if (activeOption === 'A') {
        totalPrice = "€1.820,-";
        duration = "45 Days";
        nycStay = "10 Days";
        timelineData = dataA;
        sjStatRow.classList.add('hidden');
    } else {
        duration = "47 Days";
        if (isSJ) {
            totalPrice = "€1.659,-"; 
            nycStay = "12 Days";
            timelineData = dataB_SJ;
            sjStatRow.classList.remove('hidden');
        } else {
            totalPrice = "€1.197,-"; 
            nycStay = "21 Days";
            timelineData = dataB_NoSJ;
            sjStatRow.classList.add('hidden');
        }
    }

    const priceEl = document.getElementById('priceDisplay');
    priceEl.innerText = totalPrice;
    priceEl.classList.remove('price-animate');
    void priceEl.offsetWidth; // Trigger reflow for animation
    priceEl.classList.add('price-animate');

    document.getElementById('statDuration').innerText = duration;
    document.getElementById('statNYC').innerText = nycStay;
    document.getElementById('routeLabel').innerText = activeOption === 'A' ? "Option A: NY First" : "Option B: Miami First";

    const container = document.getElementById('itineraryContent');
    container.innerHTML = timelineData.map((item) => `
        <div class="timeline-item relative pl-12 timeline-line">
            <div class="absolute left-0 top-1 w-10 h-10 bg-white border-2 border-emerald-500 rounded-full flex items-center justify-center text-lg z-10 shadow-sm">
                ${item.icon}
            </div>
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                    <div class="flex items-center gap-2">
                        <span class="text-xs font-bold text-orange-500 uppercase tracking-tighter">${item.date}</span>
                        <span class="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-bold">${item.stay}</span>
                    </div>
                    <h4 class="text-lg font-bold text-slate-800 leading-tight">${item.title}</h4>
                    <p class="text-slate-500 text-sm">${item.detail}</p>
                </div>
                <div class="bg-slate-50 border border-slate-100 px-4 py-2 rounded-2xl md:text-right">
                    <span class="block text-[10px] text-slate-400 font-bold uppercase tracking-widest">Est. Flight Cost</span>
                    <span class="font-bold text-emerald-600">${item.cost}</span>
                </div>
            </div>
        </div>
    `).join('');
}

document.getElementById('sjToggle').addEventListener('change', updateUI);
window.onload = () => setOption('A');

// Runaway Button Logic
const noBtn = document.getElementById('no-trip-btn');

document.addEventListener('mousemove', (e) => {
    const rect = noBtn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;
    const distance = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

    if (distance < 140) {
        moveButton();
    }
});

noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton();
});

function moveButton() {
    const maxX = window.innerWidth - noBtn.offsetWidth - 40;
    const maxY = window.innerHeight - noBtn.offsetHeight - 40;
    let newX = Math.random() * maxX;
    let newY = Math.random() * maxY;

    noBtn.style.position = 'fixed';
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
}
