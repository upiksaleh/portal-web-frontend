export type DataListWithMeta = {
  data: Record<string, any>[],
  meta:{
    total_count:number
    filter_count:number,
    limit:number,
    page:number,
  }
}
export * from './directus-items'
export * from './items-type'
export * from './resource'
