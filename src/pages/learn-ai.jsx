import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './learn-ai.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const LearnAI = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  // EmailJS form state (merge with existing popup state)
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const matrixRainRef = useRef(null);
  const matrixBoxRef = useRef(null);
  const cursorRef = useRef(null);
  const scrollerRef = useRef(null);

  const chars = '物語とは、一連の現実または想像上の出来事を、言葉、文章、画像、その他のコミュニケーション手段によって語られる物語または記述です。物語は、娯楽、情報伝達（ニュース記事など）、教訓の伝授、文化の保存など、様々な目的で用いられます。物語は短いもの（短編小説）から長いもの（小説など）まで様々で、書籍や映画など、様々な形式で発表されます。';

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Matrix rain effect
  useEffect(() => {
    const matrixRain = matrixRainRef.current;
    const matrixBox = matrixBoxRef.current;
    
    if (!matrixRain || !matrixBox) return;

    const createMatrixColumn = () => {
      const column = document.createElement('div');
      column.className = 'matrix-column';

      const columnHeight = Math.random() * 10 + 6;
      for (let i = 0; i < columnHeight; i++) {
        const char = document.createElement('span');
        char.className = 'matrix-char';
        char.textContent = chars[Math.floor(Math.random() * chars.length)];
        column.appendChild(char);
      }

      column.style.left = Math.random() * 100 + '%';
      column.style.animationDuration = (Math.random() * 3 + 2) + 's';
      column.style.animationDelay = Math.random() * 2 + 's';

      matrixRain.appendChild(column);
      setTimeout(() => column.remove(), 9000);
    };

    // Initial columns
    for (let i = 0; i < 12; i++) {
      setTimeout(() => createMatrixColumn(), i * 400);
    }

    const matrixInterval = setInterval(createMatrixColumn, 800);

    // Character mutation
    const mutationInterval = setInterval(() => {
      document.querySelectorAll('.matrix-column').forEach(column => {
        column.querySelectorAll('.matrix-char').forEach(char => {
          if (Math.random() < 0.07) {
            char.textContent = chars[Math.floor(Math.random() * chars.length)];
          }
        });
      });
    }, 200);

    return () => {
      clearInterval(matrixInterval);
      clearInterval(mutationInterval);
    };
  }, []);

  // Cursor and mouse effects
  useEffect(() => {
    const cursor = cursorRef.current;
    const matrixBox = matrixBoxRef.current;

    const handleMouseMove = (e) => {
      if (cursor) {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
        cursor.style.opacity = "1";
      }

      if (matrixBox) {
        const x = (e.clientX / window.innerWidth - 0.5) * 8;
        const y = (e.clientY / window.innerHeight - 0.5) * 8;
        matrixBox.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
      }
    };

    const handleMouseLeave = () => {
      if (cursor) cursor.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      if (cursor) cursor.style.opacity = "1";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  const scrollLeft = () => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleAccordionToggle = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const faqData = [
    {
      question: "Who is known as the father of Artificial Intelligence?",
      answer: "John McCarthy coined the term AI in 1956 and organized the Dartmouth Conference."
    },
    {
      question: "What does NLP stand for in AI?",
      answer: "Natural Language Processing helps computers understand and generate human language."
    },
    {
      question: "Which AI model is famous for image recognition?",
      answer: "Convolutional Neural Networks (CNNs) are the backbone of modern image recognition."
    }
  ];

  const [userLocation, setUserLocation] = useState(null);
    const [countryCode, setCountryCode] = useState("+91"); // Default India
    const [showForm, setShowForm] = useState(false);
  
    useEffect(() => {
      // Detect user location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          try {
            const res = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
            );
            const data = await res.json();
  
            console.log("Detected location:", data);
            setUserLocation(data);
  
            // Auto-select country code
            if (data.countryCode === "IN") setCountryCode("+91");
            else if (data.countryCode === "US") setCountryCode("+1");
            else if (data.countryCode === "SG") setCountryCode("+65");
            else setCountryCode("+91"); // fallback
          } catch (err) {
            console.error("Geo API error:", err);
          }
        });
      }
    }, []);
  
    // Popup handlers
    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Custom cursor */}
      <div ref={cursorRef} className="cursor fixed w-5 h-5 rounded-full bg-white bg-opacity-50 pointer-events-none z-50 opacity-0 transition-opacity duration-300" style={{mixBlendMode: 'difference'}}></div>

      

      {/* CTA Banner */}
      <div id="ctaBanner" className="cta-banner">
        <div className="text-center py-3">
          <p className="mb-2 text-light fw-semibold">START YOUR JOURNEY WITH US</p>
          <a
            href="#"
            className="btn btn-primary rounded-pill px-4"
            onClick={(e) => {
              e.preventDefault();
              openForm();
            }}
          >
            ENROLL
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Learn AI,<br />Fast & Fun</h1>
            <p className="hero-paragraph">
              Don't wait to start your AI adventure. Our courses are crafted to be engaging, practical, and effective. Dive
              in and see how quickly you can master the skills of tomorrow.
            </p>
            <a href="#" className="cta-button">
              <span>Discover More</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <div className="matrix-container" id="matrixBox" ref={matrixBoxRef}>
            <div className="matrix-rain" id="matrixRain" ref={matrixRainRef}></div>
          </div>
        </div>
      </section>

      {/* Popup Form */}
      {showForm && (
        <div
          id="popupForm"
          className="popup-form-overlay"
          onClick={(e) => {
            if (e.target.classList.contains("popup-form-overlay")) {
              closeForm();
            }
          }}
        >
          <div className="popup-form-content">
            <span id="closeFormBtn" className="close-btn" onClick={closeForm}>
              &times;
            </span>
            <h2>GETTING STARTED</h2>
            <p>
              Learn technology from scratch or from your current maturity level.
              <br />
              Pick a suitable time slot, and we'll schedule a free assessment
              session.
            </p>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setSending(true);
                setError("");
                setSent(false);
                const templateParams = {
                  name,
                  phone: `${countryCode} ${phone}`,
                  date,
                  time
                };
                try {
                  await emailjs.send(
                    'service_ysj3pg5',
                    'template_qyb0dyu',
                    templateParams,
                    'ij6SELAhRDbEP6rj0'
                  );
                  setSent(true);
                  setName("");
                  setPhone("");
                  setDate("");
                  setTime("");
                } catch (err) {
                  setError("Failed to send. Please try again.");
                } finally {
                  setSending(false);
                }
              }}
            >
              <label>Enter Your Name</label>
              <input
                type="text"
                placeholder="Enter Your Name"
                required
                value={name}
                onChange={e => setName(e.target.value)}
              />

              <label>Contact Number</label>
              <div className="phone-group">
                <select
                  className="option-select2"
                  value={countryCode}
                  onChange={e => setCountryCode(e.target.value)}
                >
                  <option value="+91">IN +91</option>
                  <option value="+1">US +1</option>
                  <option value="+65">SG +65</option>
                </select>
                <input
                  type="tel"
                  placeholder="Enter Phone Number"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>

              <div className="date-time-row">
                <div>
                  <label>Select Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={e => setDate(e.target.value)}
                  />
                </div>
                <div>
                  <label>Select Time</label>
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={e => setTime(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={sending}>
                {sending ? "Sending..." : "Submit"}
              </button>
              {sent && <div style={{color: 'green', marginTop: 10}}>Sent successfully!</div>}
              {error && <div style={{color: 'red', marginTop: 10}}>{error}</div>}
            </form>
          </div>
        </div>
      )}

      {/* Scroller Section */}
      <section className="scroller-section">
        <h1 className="scroller-title">Explore Concepts</h1>
        <p className="scroller-paragraph">Dive deeper into the key concepts that power AI and machine learning.</p>
        <div className="scroller-wrapper position-relative">
          <button 
            id="scrollLeft"
            onClick={scrollLeft}
            className="btn btn-secondary scroller-btn position-absolute start-0 top-50 translate-middle-y"
            style={{zIndex: 2}}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <div className="scroller" id="scroller" ref={scrollerRef} style={{overflowX: 'auto', scrollBehavior: 'smooth'}}>
            <ol className="mb-0">
              <li style={{'--bg': 'url(https://spaceholder.cc/i/600x800?1)'}}>
                <h2>Transformers</h2>
                <p>Self-attention to analyze relationships between words, enabling a deeper understanding of sentences.</p>
              </li>
              <li style={{'--bg': 'url(https://spaceholder.cc/i/600x800?2)'}}>
                <h2>Token</h2>
                <p>Basic units of text an LLM processes, like words or sub-words.</p>
              </li>
              <li style={{'--bg': 'url(https://spaceholder.cc/i/600x800?3)'}}>
                <h2>Chunking</h2>
                <p>Breaking down text into smaller, manageable segments for LLM to analyze.</p>
              </li>
              <li style={{'--bg': 'url(https://spaceholder.cc/i/600x800?4)'}}>
                <h2>Indexing</h2>
                <p>Catalog for the massive datasets for efficient retrieval.</p>
              </li>
              <li style={{'--bg': 'url(https://spaceholder.cc/i/600x800?5)'}}>
                <h2>Embedding</h2>
                <p>Represent words in numerical code so the LLM can understand their relationships to each other.</p>
              </li>
              <li style={{'--bg': 'url(https://spaceholder.cc/i/600x800?6)'}}>
                <h2>Vector Search</h2>
                <p>Helps LLMs find similar information within their vast datasets using embeddings.</p>
              </li>
              <li style={{'--bg': 'url(https://spaceholder.cc/i/600x800?7)'}}>
                <h2>LLM Agent</h2>
                <p>The central processing unit of an LLM, orchestrating the sequence of tasks required to fulfill a request.</p>
              </li>
              <li style={{'--bg': 'url(https://spaceholder.cc/i/600x800?8)'}}>
                <h2>Vector Database</h2>
                <p>Stores embeddings allowing for efficient vector search.</p>
              </li>
              <li style={{'--bg': 'url(https://spaceholder.cc/i/600x800?9)'}}>
                <h2>Prompt Engineering</h2>
                <p>The art of crafting clear and concise instructions for the LLM to achieve the desired outcome.</p>
              </li>
              <li style={{'--bg': 'url(https://spaceholder.cc/i/600x800?1)'}}>
                <h2>Shot Learning</h2>
                <p>How much instruction an LLM needs to learn a new task. (Zero-Shot, One-Shot, N-Shot).</p>
              </li>
              <li style={{'--bg': 'url(https://spaceholder.cc/i/600x800?2)'}}>
                <h2>Fine Tuning</h2>
                <p>Training a smaller model on top of a large one, focusing on a specific task to enhance output.</p>
              </li>
              <li style={{'--bg': 'url(https://spaceholder.cc/i/600x800?3)'}}>
                <h2>AGI</h2>
                <p>Artificial General Intelligence — machines that can think and learn like humans.</p>
              </li>
              <li style={{'--bg': 'url(https://spaceholder.cc/i/600x800?4)'}}>
                <h2>RAG</h2>
                <p>Combines large language models with external knowledge bases for more accurate and up-to-date responses.</p>
              </li>
              <li style={{'--bg': 'url(https://spaceholder.cc/i/600x800?5)'}}>
                <h2>MoE</h2>
                <p>Allows an LLM to leverage multiple smaller expert models for improved performance on specific tasks.</p>
              </li>
              <li style={{'--bg': 'url(https://spaceholder.cc/i/600x800?6)'}}>
                <h2>LoRA</h2>
                <p>Technique for compressing large LLMs, making them smaller and faster to run on devices.</p>
              </li>
            </ol>
          </div>
          <button 
            id="scrollRight"
            onClick={scrollRight}
            className="btn btn-secondary scroller-btn position-absolute end-0 top-50 translate-middle-y"
            style={{zIndex: 2}}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="marquee-section">
        <div className="marquee">
          <ul className="marquee-content">
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/github.svg" alt="GitHub" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/react.svg" alt="React" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/javascript.svg" alt="JavaScript" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/python.svg" alt="Python" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/docker.svg" alt="Docker" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/github.svg" alt="GitHub" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/react.svg" alt="React" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/javascript.svg" alt="JavaScript" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/python.svg" alt="Python" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/docker.svg" alt="Docker" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/github.svg" alt="GitHub" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/react.svg" alt="React" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/javascript.svg" alt="JavaScript" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/python.svg" alt="Python" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/docker.svg" alt="Docker" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/github.svg" alt="GitHub" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/react.svg" alt="React" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/javascript.svg" alt="JavaScript" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/python.svg" alt="Python" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/docker.svg" alt="Docker" /></li>
          </ul>
        </div>

        <div className="marquee reverse">
          <ul className="marquee-content">
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/figma.svg" alt="Figma" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/tensorflow.svg" alt="TensorFlow" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/wordpress.svg" alt="WordPress" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/slack.svg" alt="Slack" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/jira.svg" alt="Jira" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/figma.svg" alt="Figma" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/tensorflow.svg" alt="TensorFlow" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/wordpress.svg" alt="WordPress" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/slack.svg" alt="Slack" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/jira.svg" alt="Jira" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/figma.svg" alt="Figma" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/tensorflow.svg" alt="TensorFlow" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/wordpress.svg" alt="WordPress" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/slack.svg" alt="Slack" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/jira.svg" alt="Jira" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/figma.svg" alt="Figma" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/tensorflow.svg" alt="TensorFlow" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/wordpress.svg" alt="WordPress" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/slack.svg" alt="Slack" /></li>
            <li><img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/jira.svg" alt="Jira" /></li>
          </ul>
        </div>
      </section>

      {/* AI Knowledge Section */}
      <section className="ai-knowledge-section">
        <div className="ai-container">
          <div className="ai-header">
            <h1>AI KNOWLEDGE CENTER</h1>
            <p className="subtitle">Essential Artificial Intelligence Concepts Explained</p>
          </div>

          <div className="ai-grid" id="ai-faq">
            {/* Original FAQ items */}
            {faqData.map((faq, index) => (
              <div key={index} className={`ai-card ${activeAccordion === index ? 'active' : ''}`}>
                <button 
                  className="ai-toggle"
                  onClick={() => handleAccordionToggle(index)}
                  aria-expanded={activeAccordion === index}
                  aria-controls={`ai-c${index}`}
                >
                  <div className="ai-question">{faq.question}</div>
                  <span className="ai-icon" aria-hidden="true">+</span>
                </button>
                <div 
                  id={`ai-c${index}`}
                  className="ai-panel"
                  role="region"
                  style={{
                    height: activeAccordion === index ? 'auto' : '0',
                    overflow: 'hidden',
                    transition: 'height 0.3s ease'
                  }}
                >
                  <div className="ai-inner">
                    <p className="ai-answer">
                      <strong>{faq.answer.split(' ').slice(0, 2).join(' ')}</strong> {faq.answer.split(' ').slice(2).join(' ')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {faqData.map((faq, index) => (
              <div key={index} className={`ai-card ${activeAccordion === index ? 'active' : ''}`}>
                <button 
                  className="ai-toggle"
                  onClick={() => handleAccordionToggle(index)}
                  aria-expanded={activeAccordion === index}
                  aria-controls={`ai-c${index}`}
                >
                  <div className="ai-question">{faq.question}</div>
                  <span className="ai-icon" aria-hidden="true">+</span>
                </button>
                <div 
                  id={`ai-c${index}`}
                  className="ai-panel"
                  role="region"
                  style={{
                    height: activeAccordion === index ? 'auto' : '0',
                    overflow: 'hidden',
                    transition: 'height 0.3s ease'
                  }}
                >
                  <div className="ai-inner">
                    <p className="ai-answer">
                      <strong>{faq.answer.split(' ').slice(0, 2).join(' ')}</strong> {faq.answer.split(' ').slice(2).join(' ')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {/* Additional FAQ items to match original count */}
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearnAI;