export interface InformationPageDto {
  id: number;
  title: string;
  content: string;
  slug: string;
}
export interface UpdateInformationPageDto {
  title?: string;
  content?: string;
}
