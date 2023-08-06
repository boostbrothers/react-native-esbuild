import path from 'node:path';
import deepmerge from 'deepmerge';
import {
  OptionFlag,
  type BitwiseOptions,
  type ReactNativeEsbuildConfig,
} from '../types';

export function loadConfig(): ReactNativeEsbuildConfig {
  let config: ReactNativeEsbuildConfig | undefined;

  const baseOptions: ReactNativeEsbuildConfig = {
    transform: {},
  };

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-var-requires
    config = require(path.resolve(
      process.cwd(),
      'react-native-esbuild.config.js',
    )).default;
  } catch {
    // empty
  }

  return config ? deepmerge(baseOptions, config) : baseOptions;
}

export function bitwiseOptions({
  platform,
  dev,
  minify,
}: BitwiseOptions): number {
  let value = OptionFlag.None; // = 0

  // platform
  value |= platform === 'android' ? OptionFlag.PlatformAndroid : 0;
  value |= platform === 'ios' ? OptionFlag.PlatformIos : 0;
  value |= platform === 'web' ? OptionFlag.PlatformWeb : 0;

  // dev & minify
  value |= dev ? OptionFlag.Dev : 0;
  value |= minify ? OptionFlag.Minify : 0;

  return value;
}