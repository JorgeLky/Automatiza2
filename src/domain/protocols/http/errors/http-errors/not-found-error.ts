export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message || 'Não foi possível encontrar o conteúdo solicitado');
    this.name = 'NotFoundError';
  }
}