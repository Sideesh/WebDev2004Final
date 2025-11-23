const API_URL = 'https://cse2004.com/api/openai/responses';
const API_KEY = '2x29ztg3pq8g';

const deities = [
  { name: "Ganesha", role: "Remover of obstacles", symbol: "Elephant head", img: "https://www.templepurohit.com/wp-content/uploads/2015/07/Lord-Ganesha-Hindu-Gods-and-Deities-e1438140555627.jpg" },
  { name: "Lakshmi", role: "Goddess of wealth and prosperity", symbol: "Lotus", img: "https://yogaacademyinternational.com/wp-content/uploads/2020/01/Goddess-Lakshmi.jpg" },
  { name: "Shiva", role: "Destroyer and transformer", symbol: "Trident, third eye", img: "https://static.wikia.nocookie.net/rabydosverse/images/4/4d/Shiva.jpg/revision/latest/scale-to-width-down/351?cb=20210203013523" },
  { name: "Vishnu", role: "Preserver of the universe", symbol: "Conch, discus", img: "https://nepalyogahome.com/wp-content/uploads/2021/07/Lord-Vishnu.jpg" },
  { name: "Brahma", role: "Creator of the universe", symbol: "Four heads, Vedas", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcQng0baP_qIHhVs_Q_uXBQzH2NTFJfkIf0Q&s" },
  { name: "Saraswati", role: "Goddess of knowledge and arts", symbol: "Veena, book", img: "https://thegoddessgarden.com/wp-content/uploads/2018/11/saraswati-goddess-of-music-CJ27_l.jpg" },
  { name: "Durga", role: "Warrior goddess, protector", symbol: "Lion, weapons", img: "https://m.media-amazon.com/images/I/91ylL6GbZ1L._UF1000,1000_QL80_.jpg" },
  { name: "Krishna", role: "Divine lover, teacher of the Gita", symbol: "Flute, peacock feather", img: "https://www.astroved.com/astropedia/assets/images/goddess/krishna2.jpg" }
];

let history = [];

function renderDeities() {
  const container = document.querySelector('.deity-cards');
  container.innerHTML = deities.map(d => `
    <div class="deity-card" onclick="showDeity('${d.name}')">
      <img src="${d.img}" alt="${d.name}">
      <h3>${d.name}</h3>
      <p>${d.role}</p>
    </div>
  `).join('');
}

function showDeity(name) {
  const deity = deities.find(d => d.name === name);
  const detail = document.getElementById('deity-detail');
  detail.innerHTML = `
    <div style="background:#fff8e6;padding:2rem;border-radius:12px;border-left:6px solid #D2691E;margin:2rem 0;display:flex;gap:2rem;align-items:flex-start;">
      <img src="${deity.img}" alt="${deity.name}" style="width:280px;height:280px;object-fit:cover;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.2);">
      <div>
        <h3 style="font-size:2rem;margin-bottom:0.5rem;color:#8B4513;">${deity.name}</h3>
        <p><strong>Role:</strong> ${deity.role}</p>
        <p><strong>Main Symbol:</strong> ${deity.symbol}</p>
        <p style="margin-top:1rem;font-size:1.1rem;line-height:1.7;">
          ${deity.name==="Ganesha"?"Lord Ganesha is worshipped first in every ritual. He removes obstacles and brings success.":
           deity.name==="Shiva"?"The supreme destroyer who dances the universe into existence and dissolution.":
           deity.name==="Krishna"?"The playful divine cowherd who gave the world the Bhagavad Gita.":
           deity.name==="Durga"?"The invincible mother who slays evil forces and protects her devotees.":
           deity.name==="Lakshmi"?"Goddess of wealth, fortune, and beauty. Worshipped especially during Diwali.":
           "One of the principal deities of Hinduism with immense spiritual significance."}
        </p>
      </div>
    </div>
  `;
  detail.scrollIntoView({behavior:"smooth"});
}

async function askAI() {
  const question = document.getElementById('question').value.trim();
  const depth = document.getElementById('depth').value;
  const answerDiv = document.getElementById('answer');
  const btn = document.getElementById('ask-btn');
  if (!question) return;
  answerDiv.textContent = 'Thinking...';
  btn.disabled = true;
  const prompt = `Explain in ${depth} terms, clearly and respectfully: ${question}`;
  try {
    const res = await fetch(API_URL, {method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${API_KEY}`},body:JSON.stringify({input:prompt})});
    const data = await res.json();
    const answer = data.response || data.text || "No response.";
    answerDiv.textContent = answer;
    history.push({q:question,a:answer});
    renderHistory();
  } catch (err) {
    answerDiv.textContent = "Something went wrong. Try again.";
  }
  btn.disabled = false;
}

function renderHistory() {
  document.getElementById('history').innerHTML = history.map(h => `<li><strong>Q:</strong> ${h.q}<br><strong>A:</strong> ${h.a}</li>`).join('');
}

renderDeities();
document.getElementById('ask-btn').addEventListener('click', askAI);