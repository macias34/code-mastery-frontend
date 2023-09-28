export interface SendPasswordResetLinkDto {
  email: string;
}

export interface ResetPasswordDto {
  newPassword: string;
  token: string;
}
