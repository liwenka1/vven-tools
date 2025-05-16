declare module "svgo/dist/svgo.browser" {
  export interface OptimizeOptions {
    multipass?: boolean;
    plugins?: Array<string | { name: string; params?: Record<string, unknown> }>;
  }

  export interface OptimizeResult {
    data: string;
  }

  export function optimize(svg: string, options?: OptimizeOptions): OptimizeResult;
}
