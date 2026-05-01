# 🚀 Surinder Kumar — AI & Automation Portfolio

> Premium SaaS-style personal portfolio + service platform built with **Next.js 14** + **FastAPI**

## ✨ Features

- **Dark Premium SaaS UI** — No generic AI slop, 100% custom design
- **Rotating SVG Wheel** — Exact style from parthh.in reference
- **Dual Red-Line Marquee** — Smooth infinite scrolling like parthh.in
- **AI Chatbot** — Powered by Claude (Anthropic API), floating side widget
- **Multi-step Order Flow** — 3-step modal with service selection
- **Framer Motion Animations** — Fade-in, slide-up, hover scale, animated counters
- **FastAPI Backend** — REST API with SQLite (scalable to PostgreSQL)
- **Fully Responsive** — Mobile-first design

## 📁 Project Structure

```
portfolio/
├── app/                        # Next.js App Router
│   ├── components/
│   │   ├── Navbar.tsx           # Sticky pill navbar
│   │   ├── OrderModal.tsx       # 3-step order modal
│   │   ├── Chatbot.tsx          # AI chatbot widget
│   │   ├── Footer.tsx
│   │   └── sections/
│   │       ├── Hero.tsx         # Rotating wheel + service pills
│   │       ├── Marquee.tsx      # Dual red-line marquee
│   │       ├── About.tsx        # Photo stack + animated counters
│   │       ├── Services.tsx     # SaaS pricing cards
│   │       ├── Projects.tsx     # VENTURE SHOWCASE style
│   │       ├── Timeline.tsx     # Animated order process
│   │       ├── Skills.tsx       # THE MAGIC BEHIND pill grid
│   │       ├── UseCases.tsx     # Students/Creators/Businesses
│   │       ├── Testimonials.tsx # THE VOICES BEHIND
│   │       ├── Pricing.tsx      # 4-tier pricing
│   │       └── Contact.tsx      # WhatsApp CTA + form
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                 # Main page assembling all sections
├── backend/
│   ├── main.py                  # FastAPI app
│   └── requirements.txt
├── package.json
├── tailwind.config.js
└── README.md
```

## 🛠️ Setup Instructions

### Frontend (Next.js)

```bash
# 1. Navigate to portfolio root
cd portfolio

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local
# Add your Anthropic API key for the chatbot

# 4. Run development server
npm run dev
# → http://localhost:3000
```

### Backend (FastAPI)

```bash
# 1. Navigate to backend
cd portfolio/backend

# 2. Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Start the API server
uvicorn main:app --reload --port 8000
# → http://localhost:8000
# → Swagger docs: http://localhost:8000/docs
```

## 🔑 Environment Variables

Create `portfolio/.env.local`:

```env
# Anthropic API Key (for AI Chatbot)
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Backend URL
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Getting your Anthropic API Key:
1. Go to https://console.anthropic.com
2. Sign up / Log in
3. Navigate to API Keys → Create Key
4. Copy and paste into `.env.local`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/services` | List all services |
| POST | `/order` | Create new order |
| GET | `/orders` | List all orders (admin) |
| GET | `/projects` | List all projects |
| POST | `/contact` | Submit contact form |

### Example Order Request:
```json
POST /order
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "service": "AI Chatbot",
  "requirements": "I need a WhatsApp bot for my restaurant..."
}
```

## 🚢 Deployment

### Frontend → Vercel
```bash
npm install -g vercel
vercel --prod
```

### Backend → Railway / Render
```bash
# On Railway.app or Render.com
# Point to backend/ directory
# Start command: uvicorn main:app --host 0.0.0.0 --port $PORT
```

## 📱 Your Info (Pre-filled)
- **Email:** surinderkumar3182@gmail.com
- **Phone/WhatsApp:** +91 97974 86509
- **Location:** Punjab, India

## 🎨 Design Reference
- Inspired by: https://parthh.in
- Style: Premium dark SaaS, NOT a traditional portfolio
- Key elements: Rotating wheel, dual marquee, VENTURE SHOWCASE, THE MAGIC BEHIND

## 📦 Packages Used
- `next` 14.2.3
- `framer-motion` 11.2.10
- `tailwindcss` 3.4.1
- `lucide-react` 0.383.0
- `fastapi` 0.111.0
- `uvicorn` 0.30.1
