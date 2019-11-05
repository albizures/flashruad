export enum Gender {
  MASCULINE = 'MASCULINE',
  FEMININE = 'FEMININE',
  NEUTER = 'NEUTER',
}

export interface Language {
  id: number;
  name: string;
  code: string;
}

export interface Word {
  id: number;
  word: string;
  language: {
    name: string;
  };
}
