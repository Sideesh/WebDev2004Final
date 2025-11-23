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

  const longDescriptions = {
    Ganesha: "Lord Ganesha, the beloved elephant-headed deity, is the son of Lord Shiva and Goddess Parvati. Known as Vighnaharta (remover of obstacles) and Buddhipriya (lover of intelligence), he is worshipped at the beginning of every new venture, journey, or prayer. His large ears symbolize deep listening, his big belly represents the ability to digest all experiences, and his single tusk signifies sacrifice for greater good. Riding a tiny mouse, he teaches that wisdom and humility conquer all obstacles. No Hindu ritual begins without invoking Ganesha first — he is the eternal gatekeeper of success and wisdom.",
    
    Lakshmi: "Goddess Lakshmi emerged radiant from the churning of the cosmic ocean (Samudra Manthan). As the divine consort of Lord Vishnu, she embodies wealth, prosperity, beauty, and grace. Seated on a blooming lotus with golden coins flowing from her hands, she represents both material abundance and spiritual fulfillment. Lakshmi teaches that true wealth is meaningless without generosity, purity, and righteousness. During Diwali, homes are cleaned and lamps lit to invite her presence. She blesses those who live with integrity, reminding us that prosperity flows only where dharma is upheld.",
    
    Shiva: "Mahadeva — The Great God. Shiva is the supreme being who performs the cosmic dance of creation, preservation, and destruction. With matted locks holding the river Ganges, a crescent moon on his forehead, and a third eye that burns ignorance, he is both the fierce destroyer and the most compassionate meditator. As Nataraja, his dance maintains the rhythm of the universe. Covered in ash, wearing a tiger skin, and adorned with serpents, Shiva lives in perfect detachment while granting liberation to all sincere devotees. He is the ultimate yogi — beyond time, form, and duality.",
    
    Vishnu: "The eternal preserver who sustains the universe with divine order. Resting on the cosmic serpent Ananta in the ocean of milk, Vishnu maintains balance and dharma across creation. Whenever evil threatens to overpower good, he descends as an avatar — Rama for honor, Krishna for divine love, Narasimha for protection, and many more. Holding the conch (calling truth), discus (destroying evil), mace (power), and lotus (purity), Vishnu represents infinite compassion. His ten incarnations prove that the divine will always return to restore righteousness.",
    
    Brahma: "The Creator, born from the golden lotus that emerged from Vishnu's navel. With four faces representing the four Vedas and four directions, Brahma continuously creates all beings and worlds. Though rarely worshipped in temples today, he is the source of all knowledge and existence. Seated on a swan, holding sacred texts and a rosary, he symbolizes the creative energy of the universe. Brahma reminds us that all life emerges from a single divine source and that knowledge is the foundation of creation.",
    
    Saraswati: "The flowing river of consciousness, wisdom, and creativity. Dressed in pure white, seated on a white swan, playing the veena with divine grace — Goddess Saraswati is the embodiment of knowledge, music, arts, and speech. As consort of Brahma, she blesses students, artists, musicians, and seekers with clarity and eloquence. Her four hands hold a book (learning), rosary (spiritual practice), veena (art), and water pot (purity). Students pray to her before exams, and artists invoke her before creation — for without Saraswati, there is no true expression.",
    
    Durga: "The invincible warrior mother, born from the combined radiance of all gods to defeat the buffalo demon Mahishasura. Riding a fierce lion and wielding divine weapons in her many arms, Durga represents the triumph of good over evil and the unstoppable power of Shakti (divine feminine energy). Worshipped during Navratri in nine powerful forms, she is both fierce protector and compassionate mother. Durga teaches that true strength arises from righteousness, and that no evil can stand before the awakened divine feminine.",
    
    Krishna: "The divine flute player who stole butter as a child and hearts as a youth. The eighth avatar of Vishnu, Krishna is the supreme teacher of the Bhagavad Gita, where he revealed eternal truths to Arjuna on the battlefield. Mischievous yet profound, playful yet all-knowing — Krishna lived a life of pure love and divine play (leela). His teachings on karma yoga, bhakti yoga, and jnana yoga remain the cornerstone of Hindu philosophy. 'Whenever dharma declines, I manifest myself' — Krishna is the eternal reminder that God walks among us in human form."
  };

  detail.innerHTML = `
    <div style="background:#fff8e6;padding:2rem;border-radius:12px;border-left:6px solid #D2691E;margin:2rem 0;display:flex;gap:2rem;align-items:flex-start;">
      <img src="${deity.img}" alt="${deity.name}" style="width:280px;height:280px;object-fit:cover;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.2);">
      <div>
        <h3 style="font-size:2rem;margin-bottom:0.5rem;color:#8B4513;">${deity.name}</h3>
        <p><strong>Role:</strong> ${deity.role}</p>
        <p><strong>Main Symbols:</strong> ${deity.symbol}</p>
        <p style="margin-top:1rem;font-size:1.1rem;line-height:1.8;">
          ${longDescriptions[deity.name]}
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