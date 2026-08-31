import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useTeleop } from '../../teleop/TeleopProvider';
import { scanData } from '../../editable-stuff/config.js';

const sweep = keyframes`
  from { opacity: 0; transform: translateY(-50%) translateX(-10px); }
  to   { opacity: 1; transform: translateY(-50%) translateX(0); }
`;

const Card = styled.div`
  position: fixed;
  left: 120px;
  top: 50%;
  transform: translateY(-50%);
  width: 300px;
  z-index: 12;
  padding: ${({ theme }) => theme.space[4]};
  font-family: ${({ theme }) => theme.font.mono};
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-left: 2px solid ${({ theme }) => theme.color.accent};
  border-radius: ${({ theme }) => theme.radius.sm};
  animation: ${sweep} ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease};

  & .tag {
    font-size: 10px;
    letter-spacing: 0.14em;
    color: ${({ theme }) => theme.color.accent};
  }
  & h3 {
    margin: ${({ theme }) => `${theme.space[2]} 0 ${theme.space[3]}`};
    font-size: ${({ theme }) => theme.size.base};
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.color.fg};
  }
  & p {
    margin: ${({ theme }) => `${theme.space[1]} 0`};
    font-size: ${({ theme }) => theme.size.xs};
    color: ${({ theme }) => theme.color.fgMuted};
    line-height: 1.5;
  }
  & .foot {
    margin-top: ${({ theme }) => theme.space[3]};
    font-size: 10px;
    letter-spacing: 0.1em;
    color: ${({ theme }) => theme.color.fgSubtle};
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

/* F while docked: spec card for the platform's landmark. Content lives in
   editable-stuff/config.js (scanData). */
const ScanCard = () => {
  const { scanId } = useTeleop();
  const data = scanId && scanData[scanId];
  if (!data) return null;
  return (
    <Card role="dialog" aria-label={`Scan: ${data.title}`}>
      <div className="tag">{'// SCAN COMPLETE'}</div>
      <h3>{data.title}</h3>
      {data.lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
      <div className="foot">F TO CLOSE</div>
    </Card>
  );
};

export default ScanCard;
