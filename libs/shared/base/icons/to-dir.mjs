import { exportToDirectory, IconSet } from '@iconify/tools';

(async () => {
  // Import icons
  const iconSet = new IconSet({});

  // Export all icons
  await exportToDirectory(iconSet, {
    target: `svg/`,
    log: true,
  });
})();
