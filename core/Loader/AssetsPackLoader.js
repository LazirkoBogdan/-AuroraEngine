import AssetsLoader from "./AssetsLoader";

/**
 * AssetsPackLoader.js
 * @exports AssetsLoader
 */
export default class AssetsPackLoader {
  constructor(assetsStore, env) {
    this.store  = assetsStore;
    this.env    = env;
    this.loader = new AssetsLoader();
  }

  /**
   * load manifest json
   * @CB(callback)
   */
  loadManifest(cb) {
    this.loadJSON("manifest", cb);
  }

  /**
   * load json file
   * @CB(callback)
   */
  loadJSON(name, cb) {
    this.loader
      .reset()
      .add(name, `${name === "manifest" ? "" : this.env.assetsUrl}/${name}.json`)
      .load((_loader, resources) => {
        this.store[`${name}JSON`] = resources[name].data;
        cb();
      });
  }

  /**
   * load componets configuration.
   * @CB(callback)
   */
  loadComponentsConfig(cb) {
    this.loadJSON("components", () => {
      // if (!this.env.isDefault) this.loadFonts(cb);
      // else cb();
      cb();
    });
  }

  addAtlases(atlases) {
    const atlasNames = [];

    Object.entries(atlases).forEach(([name, spriteSheet]) => {
      // @ts-ignore
      const textureBaseName = this.trimJsonExtension(spriteSheet);
      const resources       = this.getTexturesURLs(textureBaseName);
      resources.forEach((resource) => {
        atlasNames.push(resource.name);

        if (!Object.keys(this.loader.resources).includes(resource.name)) {
          this.loader.add(resource.name, resource.url);
        }
      });
    });

    return atlasNames;
  }

  getTexturesURLs(textureBaseName) {
    return Object.keys(this.manifestData.atlases)
      .filter((name) => name.indexOf(textureBaseName) === 0)
      .map((name) => {
        return { name, url: this.manifestData.atlases[name] };
      });
  }

  getAssetsURLs() {
    return {
      atlases: Object.keys(this.manifestData.atlases)
                 .map((name) => {
                   return { name, url: this.manifestData.atlases[name] };
                 }),
      spine:   Object.keys(this.manifestData.spine)
                 .map((name) => {
                   return { name, url: this.manifestData.spine[name] };
                 }),
    };
  }

  get manifestData() {
    const manifest = {
      atlases: {},
      spine:   {},
    };
    Object.keys(this.store.manifest)
      // .filter((str) => str.includes(".json"))
      .forEach((str) => {
        // if (str.includes("/atlases")) manifest.atlases[prop] = str;
        if (str.includes("/spine")) {
          let prop = str.replace(/\..+\./, "\.");
          prop     = prop.split("\/").last;

          manifest.spine[prop] = str;
        }
      });
    return manifest;
  }

  trimJsonExtension(str) {
    return str.replace(".json", "");
  };

  /**
   * load componets resources.
   * Public
   * Components {Object}
   * @CB(callback)
   */
  loadComponentResources(components, cb) {
    // load resources from pack. AtlasConfig.
    if (this.store.componentsAtlasConfig) {
      const res   = {};
      res.atlases = this.getAssetsURLs().spine.filter((s) => s.url.includes(".atlas"));
      res.pngs    = this.getAssetsURLs().spine.filter((s) => s.url.includes(".png"));
      res.jsons   = this.getAssetsURLs().spine.filter((s) => s.url.includes(".json"));

      this.loadSimpleAtlas(this.store.componentsAtlasConfig.atlases, () => {
        // this.loadMultiSpineAtlas(res.atlases, (atlases) => {
        //   this.loadMultiSpineAtlas(res.pngs, (images) => {
        res.jsons.forEach((b) => {
          let name = b.name.split("\.").first;
          let img  = res.pngs.find(atlas => atlas.name === `${name}.png`);
          if (!img) {
            console.log(name);
            img = res.pngs.find(atlas => atlas.name === `bgAll.png`);
          }
          let url    = b.url.replace(/\..+\./, "\.");
          const obj  = this.store.componentsAtlasConfig.spine.find(s => s.url.includes(url));
          b.metadata = {
            name:           obj ? obj.name : b.url,
            spineAtlasFile: res.atlases.find(atlas => atlas.name === `${name}.atlas`).url,
            imageMetadata:  {
              url: img.url,
            },
          };
        });
        this.loadMultiSpineAtlas(res.jsons, () => {
          cb();
        });
        // });
        // });
      });
    } else {
      const names = Object.keys(components);

      this.loader.reset();

      names.forEach((name) => {
        const resources = components[name];

        if (resources.spine) {
          Object.values(resources.spine).forEach((value) => {
            Object.entries(value.spriteSheets).forEach(([configKey, config]) => {
              resources.spriteSheets[configKey] = config;
            });
          });
        }
        const atlases = this.addAtlases(resources.spriteSheets);

        this.store.components[name] = {
          config:    this.store.componentsConfig.components[name].config,
          resources: { atlases },
        };
      });
      this.loader.load((_loader, _resources) => {

        names.forEach((name) => {
          const componentResources = this.store.components[name].resources;

          const atlases = {};

          componentResources.atlases.forEach((atlasName) => {
            atlases[atlasName] = _resources[atlasName].spritesheet;
          });

          Object.entries(atlases).forEach(([key, val]) => {
            this.store.atlases[key] = val;
          });
          componentResources.atlases = atlases;
        });

        this.loadSpineResources(components, () => cb(this.store.components));
      });
    }
    //
  }

  loadSpineResources(components, cb) {
    const names               = Object.keys(components);
    const componentsWithSpine = names.filter((name) => components[name].spine);

    if (!componentsWithSpine.length) {
      cb();
      return;
    }
    this.loader.reset();
    componentsWithSpine.forEach((name) => {
      const resources = components[name];

      Object.entries(resources.spine).forEach(([key, val]) => {
        const opt = {
          metadata: {
            spineAtlasFile: `${this.env.assetsUrl}/spine/${val.spriteSheets.name}`,
          },
        };
        this.loader.add(`${name}_${key}`, `${this.env.assetsUrl}/spine/${val.skeleton}`, opt);
      });
    });

    this.loader.load((_loader, _resources) => {
      componentsWithSpine.forEach((name) => {
        const componentResources = this.store.components[name].resources;

        componentResources.spine = {};
        Object.keys(components[name].spine).forEach((key) => {
          componentResources.spine[key]   = _resources[`${name}_${key}`].spineData;
          // add config
          this.store.spine[key]           = this.store.components[name].resources.spine[key] || {};
          // add spine data
          this.store.spine[key].spinedata = _resources[`${name}_${key}`].spineData;
        });
      });

      cb();
    });
  }

  /**
   * load Simple Atlas
   @public
   @param  {object} assets
   @param  {cb} cb
   */
  loadSimpleAtlas(assets, cb) {
    this.store.texture = {};
	  
    this.loader
      .reset()
      .add(assets)
      .use((res, next) => {
        next();
      })

    .load((loader, resources) => {
        for (let resourcesKey in resources) {
          const tex = resources[resourcesKey].textures;
          for (const texKey in tex) {
            this.store.texture[texKey] = tex[texKey];
          }
        }
        if (cb) cb();
      })
	  this.loader.onProgress.add((loader, resources)=>{
	  console.log('progress',loader.progress)

	
	  })
  }

  loadFont(assets, cb) {
    this.store.texture = {};
    this.loader
      .reset()
      .add(assets)
      .use((res, next) => {
        next();
      })
      .load((loader, resources) => {
        if (cb) cb();
      });
  }

  /**
   Load Spine Atlas
   @public
   @param  {object} options
   @param  {cb} cb
   */
  loadSpineAtlas(options, cb) {
    this.loader
      .reset()
      .add(options.name, options.patch)
      .load((loader, resources) => {
        this.store.spine = {};
        if (resources[options.name].spineData)
          this.store.spine[options.name] = resources[options.name].spineData;
        if (cb) cb();
      });
  }

  /**
   Load Spine Atlas
   @public
   @param  {object} options
   @param  {cb} cb
   */
  loadMultiSpineAtlas(options, cb) {

    this.loader
      .reset()
      .add(options)
      .load((loader, resources) => {
        this.store.spine = {};
        for (let spineKey in resources) {
          if (resources[spineKey].spineData)
            this.store.spine[resources[spineKey].metadata.name] = resources[spineKey].spineData;
        }
        if (cb) cb(resources);
      });
  }
}
