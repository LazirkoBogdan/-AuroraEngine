import AppleModel from './AppleModel.js';
import AppleGameItem from './AppleGameItem.js';
import AppleUserBalance from './AppleUserBalance';
import AppleTranslationModel from './AppleTranslationModel';

logic.submodels.TranslationModel = AppleTranslationModel;

logic.model                      = AppleModel;

logic.submodels.GameItem         = AppleGameItem;

logic.submodels.UserBalanceItem  = AppleUserBalance;

