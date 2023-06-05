import {Directus, IItems, Item, ItemMetadata, ItemsOptions, ManyItems, QueryMany, TypeOf} from "@directus/sdk";
import {directusInstance} from "./directus";
import {DirectusItemsListType, ApiResourceProps} from "../types";

// export abstract class BaseResourceClass<CK extends keyof DirectusItemsListType, Item = DirectusItemsListType[CK]> {
export abstract class BaseResourceClass<C extends keyof DirectusItemsListType, I extends Item = TypeOf<DirectusItemsListType, C>> {
  // protected abstract key: string

  protected abstract item: C | string;
  // protected query: QueryMany<Item> = {}
  protected query: QueryMany<I> = {}
  protected apiResourceFetchConfig: { query?: QueryMany<I>, normalizer?: (data) => any } = {};

  //
  abstract config(): void;

  //
  protected type: 'collection' | 'item' = 'collection'
  protected singleton = false;
  /**
   * Proses paramsQuery seperti page, limit, filter
   * @protected
   */
  protected paramsQueryProcess = true;
  /**
   * proses filter dari paramsQuery
   * @protected
   */
  protected filterInParamsQuery = true;
  /**
   * proses search dari paramsQuery
   * @protected
   */
  protected searchInParamsQuery = true;
  protected pathQuery: string[] = [];
  protected paramsQuery: Record<string, any> = {};

  constructor() {
    this.config();
  }

  itemsHandler(): IItems<I> {
    return directusInstance().items(this.item)
  }

  // async customFetch(query?:typeof this.query){
  //   this.query = {...this.query, ...query};
  //   return this.fetch()
  // }
  /**
   * query fetch
   * @param query
   * @param options
   */
  async fetchCustomQuery<Q extends QueryMany<I>>(query?: Q, options?: ItemsOptions): Promise<ManyItems<I, Q>> {
    return this.itemsHandler().readByQuery(query, options);
  }

  async apiResourceFetch(
    {
      options, paramsQuery, pathQuery
    }: ApiResourceProps<C> & {
      options?: ItemsOptions
    }): Promise<any> {

    this.pathQuery = pathQuery ?? [];
    this.paramsQuery = paramsQuery ?? {}

    if(this.type ==='collection'){
      this.query.meta = '*'
    }
    const apiByPaths = this.apiByPaths();
    let byPathReturn;
    if (this.pathQuery.length) {
      const byPath = this.pathQuery[0];
      if (apiByPaths[byPath] && typeof apiByPaths[byPath] === 'function') {
        byPathReturn = await apiByPaths[byPath]()
      } else {
        this.errorThrow('Api Tidak Ada')
      }
    }
    if (this.paramsQueryProcess && this.paramsQuery) {
      if (this.paramsQuery.page) {
        this.query.page = parseInt(this.paramsQuery.page)
      }
      if (this.paramsQuery.limit) {
        this.query.limit = parseInt(this.paramsQuery.limit)
      }
      if (this.searchInParamsQuery && this.paramsQuery.search) {
        this.query.search = this.paramsQuery.search
      }
      if (this.filterInParamsQuery && this.paramsQuery.filter) {
        if (this.query.filter) {
          if (this.query.filter['_and']) {
            this.query.filter['_and'].push(this.paramsQuery.filter)
          } else {
            this.query.filter = {
              _and: [this.query.filter, this.paramsQuery.filter]
            }
          }
        }
      }
    }

    const f = this.itemsHandler()
    const {data, meta} = await f.readByQuery(this.query, options)
    if (typeof byPathReturn === "function") {
      return byPathReturn({data, meta})
    }

    // const _dataNormalizer = this._normalizer(data ? (this.singleton ? [data] : data) : []);
    const _dataNormalizer = this._normalizer(data ?? []);

    if (this.type === 'item') {
      if (data && _dataNormalizer[0]) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return _dataNormalizer[0] as Record<string, any>
      } else {
        this.errorThrow('item tidak ditemukan');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return data;
      }
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return {
      data: data ? _dataNormalizer : [],
      meta: meta
        ? {
          ...meta,
          limit: this.query.limit,
          page: this.query.page ?? 1,
        }
        : {},
    };
  }

  protected andFilter<F extends QueryMany<I>['filter']>(filter: F) {
    if (filter) {
      if (this.query.filter) {
        this.query.filter = {
          _and: [this.query.filter, filter]
        }
      } else {
        this.query.filter = filter;
      }
    }
  }

  protected orFilter<F extends QueryMany<I>['filter']>(filter: F) {
    if (filter) {
      if (this.query.filter) {
        this.query.filter = {
          _or: [this.query.filter, filter]
        }
      } else {
        this.query.filter = filter;
      }
    }
  }

  protected apiByPaths(): Record<string, any> {
    return {};
  }

  protected normalizer(data: Record<string, any>) {
    // normalize fields
    // contoh:
    // delete data.id
    // data.id = ...

  }

  protected normalizerFields(): Record<string, any> {
    return {}
  }

  public processNormalizerOne(data: Record<string, any>){
    return this._normalizerOne(data);
  }
  public processNormalizer(data: any[]){
    return this._normalizer(data);
  }
  private _normalizerOne(data: Record<string, any>) {
    if (typeof data === 'object') {
      const normalizeFields = this.normalizerFields();
      Object.keys(data).forEach((key) => {
        if (normalizeFields[key]) {
          data[key] = normalizeFields[key](data[key], data)
        }
      })
    }
    this.normalizer(data);
    return data
  }

  private _normalizer(data: any[]) {
    if (this.singleton) {
      data = [data];
      this.type = 'item';
    }
    return data.map((d) => this._normalizerOne(d))
  }

  errorThrow(message: any) {
    throw Error(message)
  }

  //
  addField(fields: typeof this.query.fields[]) {
    if (typeof this.query.fields === 'object') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.query.fields.push(...fields)
    }
  }
}
