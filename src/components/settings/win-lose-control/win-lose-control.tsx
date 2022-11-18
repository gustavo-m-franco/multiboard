import React from 'react';
import { WinLoseInput } from './win-lose-input';
import { ControlInputWrapper } from '../control/control-input-wrapper';

interface WinLoseControlProps {
  description: string;
  isMaxScoreWins: boolean;
  onChange: (isMaxScoreWins: boolean) => void;
}

export const WinLoseControl: React.FC<WinLoseControlProps> = ({
  description,
  isMaxScoreWins,
  onChange,
}) => (
  <ControlInputWrapper description={description}>
    <WinLoseInput isMaxScoreWins={isMaxScoreWins} onPress={onChange} />
  </ControlInputWrapper>
);
