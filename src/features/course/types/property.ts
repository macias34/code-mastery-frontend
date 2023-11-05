export interface PropertyDto {
  id: number;
  label: string;
  value: string;
}

export interface CreatePropertyDto {
  label: string;
  value: string;
  courseId: number;
}

export interface OverridePropertyDto {
  label: string;
  value: string;
}
