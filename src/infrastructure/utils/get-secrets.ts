// TODO: implement dynamic secrets
export default async ({
  environment = process.env.NODE_ENV,
}: {
  environment?: string;
}): Promise<object> => require(`../../../secrets.${environment}.json`);
