export default class Exception extends Error {
  details?: object;

  constructor(message: string, details?: object) {
    super(message);
    this.details = details;
  }

  toString(): string {
    return `${this.stack}\n${this.details instanceof Error ? this.details.toString() : JSON.stringify(this.details)}`;
  }

  toJSON(): string {
    return `${this.stack}\n${this.details instanceof Error ? this.details.toString() : JSON.stringify(this.details)}`;
  }
}
