export type Event = {
  name: string;
  data?: any;
};

export default ({ name, data }: Event): Event => ({ name, data });
