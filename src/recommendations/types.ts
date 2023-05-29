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

export type IGetRecommendationBasic =
  | {
      strategy_name: string;
    }
  | {
      module_name: string;
    }
  | {
      page_name: string;
    }
  | {
      text_name: string;
    };
