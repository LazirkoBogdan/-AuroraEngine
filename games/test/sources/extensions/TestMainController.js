export default class TestMainController extends logic.fms.MainController {

  constructor(model, responseManager) {
    super(model, responseManager);

  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  onStart() {
    super.onStart();
	
	
  }

  reset() {
    this.updateUI();

  }
  
  
  updateUI() {
    super.updateUI();
    if(this.components.ui!==undefined){
	    this.components.ui.updateUI();
    }

  }
}
