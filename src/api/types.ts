export type InternalServerError = {
  request_id: string;
  correlation_id: string;
  status: string;
  errors: Array<{
    code: string;
    message: string;
  }>;
};

export type IValidationError = {
  detail: Array<{
    loc: Array<string>;
    msg: string;
    type: string;
  }>;
};
