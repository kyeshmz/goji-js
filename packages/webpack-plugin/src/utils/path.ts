import path from 'path';
import { isUrlRequest, urlToRequest } from 'loader-utils';
import { BRIDGE_OUTPUT_DIR } from '../constants/paths';

// ref: https://github.com/webpack/loader-utils#urltorequest
export const safeUrlToRequest = (url: string) => (isUrlRequest(url) ? urlToRequest(url) : url);

/**
 * @param pathname like `a/b/c`
 * @returns relativePathToBridge like `../../..`
 */
export const getRelativePathToBridge = (pathname: string, basedir: string) => {
  if (pathname.startsWith('/')) {
    throw new Error('`pathname` should not be absolute path');
  }
  const relativePath = path.posix.relative(path.posix.dirname(pathname), basedir);
  return safeUrlToRequest(path.posix.join(relativePath, BRIDGE_OUTPUT_DIR));
};
