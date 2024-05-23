class LoginResponseDTO {
  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.displayName = user.displayName;
    this.role = user.role;
  }
}

export default LoginResponseDTO;
