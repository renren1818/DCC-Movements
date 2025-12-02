export interface ISkeleton {
  count?: number; // how many skeleton items to render
  variant?: "text" | "rectangular" | "circular"; // shape type
  height?: number; // height for rectangular skeletons
  width?: number; // width for text/rectangular skeletons
  spacing?: number; // spacing between skeletons
  borderRadius?: number; // rounded corners for rectangular skeletons
}
