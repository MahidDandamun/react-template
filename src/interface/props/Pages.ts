export type CurrentPageType = 'index' | 'create' | 'info';
export type SelectedItemIdType = string | null;

export interface IndexPageProps {
  onItemClick: (id: string) => void;
}

export interface InfoPageProps {
  id: string;
}

export interface CreatePageProps {
  onCreate: () => void;
}