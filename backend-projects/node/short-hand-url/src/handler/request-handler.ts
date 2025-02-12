import { RequestHandler } from "express";

export type postUrl = RequestHandler<{ id?: string },
  { data: object }, { redirectUrl?: string }, never>