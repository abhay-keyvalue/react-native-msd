export type IGetRecommendationRequest = {
  user_id: string;
  platform: string;
  medium: string;
  integration_mode: string;
  catalogs: {
    [key: string]: {
      fields: Array<string>;
      context: object;
    };
  };
};

export type IGetRecommendationByTextRequest = {
  user_id: string;
  platform: string;
  medium: string;
  integration_mode: string;
  catalogs: {
    [key: string]: {
      fields: Array<string>;
      context: object;
      facets: Array<string>;
      facet_limit: number;
      search_query: string;
      search_fields: Array<string>;
      sort_by: {
        field: string;
        order: string;
      };
    };
  };
};

export type IGetRecommendation =
  | ({
      strategy_name: string;
    } & IGetRecommendationRequest)
  | ({
      module_name: string;
    } & IGetRecommendationRequest)
  | ({
      page_name: string;
    } & IGetRecommendationRequest)
  | ({
      text_name: string;
    } & IGetRecommendationByTextRequest);
