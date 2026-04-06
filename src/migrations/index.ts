import * as migration_20260322_233106_initial from './20260322_233106_initial';
import * as migration_20260403_094103_add_brands from './20260403_094103_add_brands';
import * as migration_20260403_101936_add_user_role from './20260403_101936_add_user_role';
import * as migration_20260403_102734_add_categories from './20260403_102734_add_categories';
import * as migration_20260403_145109_add_orders from './20260403_145109_add_orders';
import * as migration_20260405_161703_add_about from './20260405_161703_add_about';
import * as migration_20260405_164325_add_termsofuse from './20260405_164325_add_termsofuse';
import * as migration_20260405_164736_add_store from './20260405_164736_add_store';
import * as migration_20260405_165048_add_return from './20260405_165048_add_return';
import * as migration_20260405_165332_add_privacypolicy from './20260405_165332_add_privacypolicy';
import * as migration_20260405_170140_add_featuredproductlist from './20260405_170140_add_featuredproductlist';
import * as migration_20260406_090308_add_featuredproductlist from './20260406_090308_add_featuredproductlist';
import * as migration_20260406_090755_add_about from './20260406_090755_add_about';
import * as migration_20260406_091031_add_store from './20260406_091031_add_store';
import * as migration_20260406_091513_add_about from './20260406_091513_add_about';
import * as migration_20260406_091849_add_delivery from './20260406_091849_add_delivery';

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
    name: '20260403_102734_add_categories',
  },
  {
    up: migration_20260403_145109_add_orders.up,
    down: migration_20260403_145109_add_orders.down,
    name: '20260403_145109_add_orders',
  },
  {
    up: migration_20260405_161703_add_about.up,
    down: migration_20260405_161703_add_about.down,
    name: '20260405_161703_add_about',
  },
  {
    up: migration_20260405_164325_add_termsofuse.up,
    down: migration_20260405_164325_add_termsofuse.down,
    name: '20260405_164325_add_termsofuse',
  },
  {
    up: migration_20260405_164736_add_store.up,
    down: migration_20260405_164736_add_store.down,
    name: '20260405_164736_add_store',
  },
  {
    up: migration_20260405_165048_add_return.up,
    down: migration_20260405_165048_add_return.down,
    name: '20260405_165048_add_return',
  },
  {
    up: migration_20260405_165332_add_privacypolicy.up,
    down: migration_20260405_165332_add_privacypolicy.down,
    name: '20260405_165332_add_privacypolicy',
  },
  {
    up: migration_20260405_170140_add_featuredproductlist.up,
    down: migration_20260405_170140_add_featuredproductlist.down,
    name: '20260405_170140_add_featuredproductlist',
  },
  {
    up: migration_20260406_090308_add_featuredproductlist.up,
    down: migration_20260406_090308_add_featuredproductlist.down,
    name: '20260406_090308_add_featuredproductlist',
  },
  {
    up: migration_20260406_090755_add_about.up,
    down: migration_20260406_090755_add_about.down,
    name: '20260406_090755_add_about',
  },
  {
    up: migration_20260406_091031_add_store.up,
    down: migration_20260406_091031_add_store.down,
    name: '20260406_091031_add_store',
  },
  {
    up: migration_20260406_091513_add_about.up,
    down: migration_20260406_091513_add_about.down,
    name: '20260406_091513_add_about',
  },
  {
    up: migration_20260406_091849_add_delivery.up,
    down: migration_20260406_091849_add_delivery.down,
    name: '20260406_091849_add_delivery'
  },
];
