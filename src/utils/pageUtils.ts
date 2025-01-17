import { CurrentPageType, SelectedItemIdType } from '../interface/props/Pages';

export const handleCreatePage = (
  setCurrentPage: React.Dispatch<React.SetStateAction<CurrentPageType>>
) => {
  setCurrentPage('create');
};

export const handleInfoPage = (
  itemId: string,
  setSelectedItemId: React.Dispatch<React.SetStateAction<SelectedItemIdType>>,
  setCurrentPage: React.Dispatch<React.SetStateAction<CurrentPageType>>
) => {
  setSelectedItemId(itemId);
  setCurrentPage('info');
};

export const handleBackToIndexPage = (
  setCurrentPage: React.Dispatch<React.SetStateAction<CurrentPageType>>,
  setSelectedItemId: React.Dispatch<React.SetStateAction<SelectedItemIdType>>
) => {
  setCurrentPage('index');
  setSelectedItemId(null);
};
