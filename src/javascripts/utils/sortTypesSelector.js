import { searchTypes } from '../constants/searchTypes';
import { contentSortTypes, workbookSortTypes, userSortTypes } from '../constants/sortTypes';


const mapping = {
  [searchTypes.allContents]: contentSortTypes,
  [searchTypes.question]: contentSortTypes,
  [searchTypes.discussion]: contentSortTypes,
  [searchTypes.workbook]: workbookSortTypes,
  [searchTypes.user]: userSortTypes,
};

export const sortTypesSelector = (searchType) => {
  return mapping[searchType] || {};
};
