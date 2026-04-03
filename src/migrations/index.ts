import * as migration_20260322_233106_initial from './20260322_233106_initial';
import * as migration_20260403_094103_add_brands from './20260403_094103_add_brands';
import * as migration_20260403_101936_add_user_role from './20260403_101936_add_user_role';
import * as migration_20260403_102734_add_categories from './20260403_102734_add_categories';

export const migrations = [
  {
    up: migration_20260322_233106_initial.up,
    down: migration_20260322_233106_initial.down,
    name: '20260322_233106_initial',
  },
  {
    up: migration_20260403_094103_add_brands.up,
    down: migration_20260403_094103_add_brands.down,
    name: '20260403_094103_add_brands',
  },
  {
    up: migration_20260403_101936_add_user_role.up,
    down: migration_20260403_101936_add_user_role.down,
    name: '20260403_101936_add_user_role',
  },
  {
    up: migration_20260403_102734_add_categories.up,
    down: migration_20260403_102734_add_categories.down,
    name: '20260403_102734_add_categories'
  },
];
