import * as migration_20260322_233106_initial from './20260322_233106_initial';
import * as migration_20260403_094103_add_brands from './20260403_094103_add_brands';

export const migrations = [
  {
    up: migration_20260322_233106_initial.up,
    down: migration_20260322_233106_initial.down,
    name: '20260322_233106_initial',
  },
  {
    up: migration_20260403_094103_add_brands.up,
    down: migration_20260403_094103_add_brands.down,
    name: '20260403_094103_add_brands'
  },
];
