import React from 'react';
import { ControlContainer } from '../control/control-container';
import { StyledTextInput } from '../styled-text-input';

interface GameNameInputProps {
  name?: string;
  onChangeText: (name: string) => void;
  onBlur: () => void;
  error?: string;
}

export const GameNameInput: React.FC<GameNameInputProps> = ({
  name,
  onChangeText,
  onBlur,
  error,
}) => (
  <ControlContainer>
    <StyledTextInput
      onBlur={onBlur}
      value={name}
      placeholder="Game name"
      onChangeText={onChangeText}
      error={error}
    />
  </ControlContainer>
);
