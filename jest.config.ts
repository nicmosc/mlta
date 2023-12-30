import type { Config } from 'jest';

export default async (): Promise<Config> => {
  return {
    transform: {
      '.(ts|tsx)': [
        'ts-jest',
        {
          tsconfig: 'tsconfig.json',
        },
      ],
    },
  };
};
