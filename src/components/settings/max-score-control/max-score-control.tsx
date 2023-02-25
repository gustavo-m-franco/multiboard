import React from 'react';
import { MaxScoreInput } from './max-score-input';
import { ControlInputWrapper } from '../control/control-input-wrapper';

interface MaxScoreSettingProps {
  description: string;
  maxScore: number;
  onChange: (maxScore: number) => void;
}

export const MaxScoreControl: React.FC<MaxScoreSettingProps> = (props) => (
  <ControlInputWrapper description={props.description}>
    <MaxScoreInput maxScore={props.maxScore} onChange={props.onChange} />
  </ControlInputWrapper>
);
