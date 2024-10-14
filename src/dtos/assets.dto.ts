export interface AssetDirectoryDTO {
  [key: string]: string[] | AssetDirectoryDTO | string;
}
