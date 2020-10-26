/**
 * AssetsLoader.js
 * Loader assets
 * @extends Loader
 * @exports AssetsLoader
 */
export default class AssetsLoader extends PIXI.Loader {
  static preResource(resource, next) {
    if (resource.loadType === PIXI.LoaderResource.TYPE.JSON) {
      resource.onComplete.once(res => {
        if (res.data && res.data.meta) {
          res.data.meta.scale = "1";
        }
      });
    }
    next();
  }

  constructor() {
    super();
    this.pre(AssetsLoader.preResource);
    this.pre((res, next) => {
	    if(res.url.includes("assets/spine/"))
	    {
		    if (res.extension !== "json" && res.extension !== "atlas") {
			    res.url = res.metadata.url;
		    }
	    }
   
      next();
    });
  }
}
