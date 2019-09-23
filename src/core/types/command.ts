export type Command = {
  id: string;
  createdAt: Date;
};

export type CommandData = {
  id?: string;
  createdAt?: Date;
};

export default (data?: CommandData): Command => ({
  id: (data && data.id) || new Date().toISOString(),
  createdAt: (data && data.createdAt) || new Date(),
});
