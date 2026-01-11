import * as migration_20260111_104947 from './20260111_104947';
import * as migration_20260111_105135 from './20260111_105135';

export const migrations = [
  {
    up: migration_20260111_104947.up,
    down: migration_20260111_104947.down,
    name: '20260111_104947',
  },
  {
    up: migration_20260111_105135.up,
    down: migration_20260111_105135.down,
    name: '20260111_105135'
  },
];
