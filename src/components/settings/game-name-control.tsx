import React, { useState } from 'react';
import { GameNameInput } from './game-name-input';
import { trimName } from '../../utility/format';
import { GameNameLabel } from './game-name-label';
import { FieldError } from 'react-hook-form';

interface GameNameControlProps {
  onBlur: () => void;
  onChange: (name: string) => void;
  gameName?: string;
  error?: FieldError;
}
export const GameNameControl: React.FC<GameNameControlProps> = ({
  gameName,
  onChange,
  onBlur,
  error,
}) => {
  const [isEditMode, setIsEditMode] = useState(!gameName);

  const editGameName = () => {
    setIsEditMode(true);
  };

  if (isEditMode || !gameName) {
    return (
      <GameNameInput
        name={gameName ? trimName(gameName, 25) : undefined}
        onChangeText={onChange}
        onBlur={onBlur}
        error={error?.message}
      />
    );
  } else {
    return (
      <GameNameLabel
        name={trimName(gameName ?? '', 25)}
        editGame={editGameName}
      />
    );
  }
};
