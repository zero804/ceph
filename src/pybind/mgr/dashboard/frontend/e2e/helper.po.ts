import { browser } from 'protractor';
import { ImagesPageHelper } from './block/images.po';
import { MonitorsPageHelper } from './cluster/monitors.po';
import { OSDsPageHelper } from './cluster/osds.po';
import { FilesystemsPageHelper } from './filesystems/filesystems.po';
import { NfsPageHelper } from './nfs/nfs.po';
import { PoolPageHelper } from './pools/pools.po';
import { BucketsPageHelper } from './rgw/buckets.po';
import { DaemonsPageHelper } from './rgw/daemons.po';
import { UsersPageHelper } from './rgw/users.po';
import { UserMgmtPageHelper } from './user-mgmt.po';

export class Helper {
  static EC = browser.ExpectedConditions;
  static TIMEOUT = 10000;

  pools: PoolPageHelper;
  buckets: BucketsPageHelper;
  images: ImagesPageHelper;
  iscsi: IscsiPageHelper;
  mirroring: MirroringPageHelper;
  dashboard: DashboardPageHelper;
  usermgmt: UserMgmtPageHelper;
  daemons: DaemonsPageHelper;
  users: UsersPageHelper;
  nfs: NfsPageHelper;
  filesystems: FilesystemsPageHelper;
  osds: OSDsPageHelper;
  monitors: MonitorsPageHelper;

  constructor() {
    this.pools = new PoolPageHelper();
    this.buckets = new BucketsPageHelper();
    this.images = new ImagesPageHelper();
    this.iscsi = new IscsiPageHelper();
    this.mirroring = new MirroringPageHelper();
    this.dashboard = new DashboardPageHelper();
    this.usermgmt = new UserMgmtPageHelper();
    this.daemons = new DaemonsPageHelper();
    this.users = new UsersPageHelper();
    this.nfs = new NfsPageHelper();
    this.filesystems = new FilesystemsPageHelper();
    this.osds = new OSDsPageHelper();
    this.monitors = new MonitorsPageHelper();
  }

  /**
   * Checks if there are any errors on the browser
   *
   * @static
   * @memberof Helper
   */
  static async checkConsole() {
    let browserLog = await browser
      .manage()
      .logs()
      .get('browser');

    browserLog = browserLog.filter((log) => log.level.value > 900);

    if (browserLog.length > 0) {
      console.log('\n log: ' + require('util').inspect(browserLog));
    }

    expect(browserLog.length).toEqual(0);
  }
}
