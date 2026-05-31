'use client';

import { t } from '@/app/i18n/partners';
import { useState, useEffect, useRef } from 'react';

function CountUp({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const startTime = performance.now();

          const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out quad
            const eased = 1 - (1 - progress) * (1 - progress);
            setCount(Math.floor(eased * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className="stat-number">
      {count}
      {suffix}
    </span>
  );
}

export default function CountUpStats({lang}) {
  const partner = t(lang)
  const stats = [
    { value: 1548, suffix: '+', label: partner.label1 },
    { value: 25, suffix: '+', label: partner.label2 },
    { value: 9, suffix: '+', label: partner.label3 },
  ];

  return (
    <div className="partners-stats">
      {stats.map((stat, i) => (
        <div className="stat-item" key={i}>
          <CountUp end={stat.value} suffix={stat.suffix} />
          <span className={`${lang === "ar" ? "font-heading" : ""} stat-label`}>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}