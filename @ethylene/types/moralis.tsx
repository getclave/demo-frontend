export type AbstactMoralisRequestParams<T = {}> = {
  chain?: number;
} & T;

export type MoralisResponse<T = {}, A = {}> = {
  adapter: any;
  data: T;
  params: A;
  jsonAdapter: any;
};
