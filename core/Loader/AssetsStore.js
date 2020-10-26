/**
 * AssetsStore
 * @Class to Store assets
 */
export default class AssetsStore {
  manifest;
  appConfig;
  componentsConfig;
  componentsResources;
  components = {};
  atlases    = {};
  spine      = {};

  set manifestJSON(config) {
    this.manifest = config;
  }

  set componentsConfig(config) {
    this.componentsConfig = config;
  }

  set componentsResources(resources) {
    this.componentsResources = resources;
  }

}
