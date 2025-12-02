export interface IActionButtonProps {
  onClick: () => void;
  type: 'Search' | 'Move' | 'Settings' | 'Back';
}