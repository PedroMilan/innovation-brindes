export type LoginPayload = {
  email: string;
  senha: string;
};

export type LoginResponse = {
  status: number;
  message: string;
  token_de_acesso: string;
  dados_usuario: {
    codigo_usuario: string;
    nome_usuario: string;
    codigo_grupo: string;
    nome_grupo: string;
  };
};
