// Botanical vine corner decorations for the game background.

const VineTL = () => (
  <svg className="gs-vine gs-vine-tl" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 215 Q50 140 130 70 Q90 100 105 155 Q75 110 160 45" stroke="#7a5c2e" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M5 215 Q35 160 80 120 Q55 145 90 180" stroke="#8d6e38" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
    <ellipse cx="130" cy="70" rx="12" ry="7" fill="#4a7c3f" transform="rotate(-40 130 70)" opacity="0.85"/>
    <ellipse cx="105" cy="155" rx="10" ry="6" fill="#3d6e34" transform="rotate(25 105 155)" opacity="0.75"/>
    <ellipse cx="60" cy="125" rx="9" ry="5" fill="#5a8c4a" transform="rotate(-60 60 125)" opacity="0.7"/>
    <ellipse cx="160" cy="45" rx="11" ry="6" fill="#4a7c3f" transform="rotate(-20 160 45)" opacity="0.8"/>
    <ellipse cx="80" cy="120" rx="7" ry="4" fill="#5a8c4a" transform="rotate(50 80 120)" opacity="0.65"/>
  </svg>
);

const VineBL = () => (
  <svg className="gs-vine gs-vine-bl" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 5 Q50 80 130 150 Q90 120 105 65 Q75 110 160 175" stroke="#7a5c2e" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M5 5 Q35 60 80 100 Q55 75 90 40" stroke="#8d6e38" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
    <ellipse cx="130" cy="150" rx="12" ry="7" fill="#4a7c3f" transform="rotate(40 130 150)" opacity="0.85"/>
    <ellipse cx="105" cy="65" rx="10" ry="6" fill="#3d6e34" transform="rotate(-25 105 65)" opacity="0.75"/>
    <ellipse cx="60" cy="95" rx="9" ry="5" fill="#5a8c4a" transform="rotate(60 60 95)" opacity="0.7"/>
    <ellipse cx="160" cy="175" rx="11" ry="6" fill="#4a7c3f" transform="rotate(20 160 175)" opacity="0.8"/>
    <ellipse cx="80" cy="100" rx="7" ry="4" fill="#5a8c4a" transform="rotate(-50 80 100)" opacity="0.65"/>
  </svg>
);

const VineTR = () => (
  <svg className="gs-vine gs-vine-tr" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M215 215 Q170 140 90 70 Q130 100 115 155 Q145 110 60 45" stroke="#7a5c2e" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <ellipse cx="90" cy="70" rx="12" ry="7" fill="#4a7c3f" transform="rotate(40 90 70)" opacity="0.85"/>
    <ellipse cx="115" cy="155" rx="10" ry="6" fill="#3d6e34" transform="rotate(-25 115 155)" opacity="0.75"/>
    <ellipse cx="60" cy="45" rx="11" ry="6" fill="#4a7c3f" transform="rotate(20 60 45)" opacity="0.8"/>
  </svg>
);

export default function GameVines() {
  return (
    <>
      <VineTL />
      <VineBL />
      <VineTR />
    </>
  );
}
