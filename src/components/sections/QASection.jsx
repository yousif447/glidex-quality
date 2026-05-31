export default function QASection({ qa, lang }) {
  const qaStyles = `
  .qa-row {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    padding: 2rem 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    cursor: default;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }
  .qa-row:last-child {
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  .qa-row::before {
    content: "";
    position: absolute;
    left: -1px; top: -1px; bottom: -1px;
    width: 4px;
    background: #00844a; /* Secondary Green */
    border-radius: 0 4px 4px 0;
    transform: scaleY(0);
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    box-shadow: 0 0 20px rgba(0, 132, 74, 0.5);
  }
  .qa-row:hover::before {
    transform: scaleY(1);
    opacity: 1;
  }
  .qa-row:hover {
    background: rgba(255, 255, 255, 0.03);
    padding-left: 2.5rem;
  }
  .qa-badge {
    font-family: var(--, serif);
    font-size: 2rem;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.08);
    line-height: 1;
    min-width: 50px;
    flex-shrink: 0;
    transition: all 0.4s ease;
    user-select: none;
    padding-top: 0.2rem;
    font-style: italic;
  }
  .qa-row:hover .qa-badge { 
    color: rgba(0, 132, 74, 0.3); 
    transform: translateX(-5px) scale(1.1);
  }
  .qa-content { flex: 1 }
  .qa-question {
    font-size: 1.05rem;
    font-weight: 700;
    color: #ffffff;
    line-height: 1.5;
    transition: all 0.3s ease;
  }
  .qa-row:hover .qa-question { color: #ffffff; }
  .qa-answer {
    font-size: 0.9rem;
    color: #cbd5e1;
    line-height: 1.8;
    white-space: pre-line;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    margin-top: 0;
    transition: max-height 0.6s cubic-bezier(0.23, 1, 0.32, 1),
                opacity 0.4s ease 0.1s,
                margin-top 0.4s ease;
  }
  .qa-row:hover .qa-answer { 
    max-height: 800px; 
    opacity: 1; 
    margin-top: 1rem; 
  }
  
  .qa-answer-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .qa-answer-item {
    position: relative;
    padding-left: 1.25rem;
    margin-bottom: 0.5rem;
  }
  .qa-answer-item::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.65rem;
    width: 6px;
    height: 6px;
    background: #00844a;
    border-radius: 50%;
    opacity: 0.6;
  }
  
  .qa-arrow {
    width: 20px; height: 20px;
    color: rgba(255, 255, 255, 0.2);
    flex-shrink: 0;
    margin-top: 0.4rem;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }
  .qa-row:hover .qa-arrow { 
    color: #00844a; 
    transform: translateX(8px) rotate(-45deg); 
  }

  @media (max-width: 1024px) {
    .qa-list { gap: 0 1rem; }
  }
  @media (max-width: 768px) {
    .qa-list { grid-template-columns: 1fr; gap: 0; }
    .qa-row { padding: 1.5rem 1rem; }
  }
  @media (max-width: 480px) {
    .qa-row { padding: 1.25rem 0.75rem; gap: 1rem; }
    .qa-row:hover { padding-left: 1.5rem; }
    .qa-badge { font-size: 1.5rem; min-width: 35px; }
    .qa-question { font-size: 0.95rem; }
    .qa-arrow { display: none; }
  }`;

  if (!qa?.length) return null;
  const sorted = [...qa].sort((a, b) => a.order - b.order);

  const renderAnswer = (answer) => {
    if (!answer) return null;
    // Check if the answer contains newlines
    const lines = answer.split(/\n+/).filter(line => line.trim());
    
    if (lines.length > 1) {
      return (
        <div className="qa-answer">
          <ul className="qa-answer-list">
            {lines.map((line, i) => (
              <li key={i} className="qa-answer-item">
                {line.trim().replace(/^[•\-\*]\s*/, '')}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    
    return <p className="qa-answer">{answer}</p>;
  };

  return (
    <div className="w-full">
      <style>{qaStyles}</style>
      <div className="flex flex-col items-center mb-12">
        <span className={`${lang === "ar" ? "font-heading" : ""} inline-block text-[0.72rem] font-bold tracking-[0.08em] uppercase text-white bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-white/10`}>
          {lang === "ar" ? "الأسئلة الشائعة" : "FAQ"}
        </span>
        <h3 className={`${lang === "ar" ? "font-heading" : ""} text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white text-center`}>
          {lang === "ar" ? "أسئلة حول هذه الشهادة" : "Questions About This Certificate"}
        </h3>
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#00844a] to-transparent mt-4 opacity-50" />
      </div>
      <div className="qa-list">
        {sorted.map((item, index) => (
          <div key={item.id} className="qa-row group/qa">
            <span className="qa-badge">{String(index + 1).padStart(2, "0")}</span>
            <div className="qa-content">
              <h4 className="qa-question">{item.question}</h4>
              {renderAnswer(item.answer)}
            </div>
            <svg className="qa-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

