import { NextApiRequest, NextApiResponse } from 'next';
import qs from 'qs';
import { resourceLists } from './resource-list';
import * as process from 'process';

// type CollectionsListType = keyof typeof directusItems

interface Config {
  apiList?: string[];
  // onlyCollections?: CollectionsListType[]
}

const sendNotFound = (res: NextApiResponse) => {
  return res.status(404).json('Api not found.');
};
const sendError = (res: NextApiResponse, message: any) => {
  return res.status(200).json({
    error: 1,
    message,
  });
};

export function ApiResourcePage(config: Config) {
  return async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    // res.setHeader('Cache-Control', 'no-store, max-age=0')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { q: pathQuery, ...paramsQuery } = qs.parse(req.query, {
      allowPrototypes: true,
    });
    const [p1, ...p2] = pathQuery as string[];
    if (resourceLists[p1]) {
      try {
        const _res = new resourceLists[p1]({});
        // const data = [];
        const data = await _res.apiResourceFetch({
          pathQuery: p2,
          paramsQuery,
        });
        // const _res = new resourceLists[p1]({
        //   pathQuery: p2,
        //   paramsQuery,
        // });
        // const data = await _res.fetch();
        res.status(200).json(data);
      } catch (e) {
        if (process.env.NODE_ENV === 'development') {
          if (e && e['errors']) sendError(res, e['errors']);
          else if (e && e['message']) sendError(res, e['message']);
        } else {
          sendError(res, 'Terjadi kesalahan');
        }
      }
    } else {
      sendError(res, 'resource tidak ada');
    }
  };
}
