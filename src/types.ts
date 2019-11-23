export enum Gender {
  Masculine = 'Masculine',
  Feminine = 'Feminine',
  Neuter = 'Neuter',
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
