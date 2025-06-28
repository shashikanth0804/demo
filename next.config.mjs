import webpack from 'webpack';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('@prisma/client');
    } else {
      // Add plugin to handle node: scheme imports
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /^node:/,
          (resource) => {
            resource.request = resource.request.replace(/^node:/, '');
          }
        )
      );
      
      // Add fallbacks for Node.js built-in modules on client-side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        child_process: false,
        tty: false,
        fs: false,
        net: false,
        tls: false,
        os: false,
        path: false,
        crypto: false,
        stream: false,
        util: false,
        buffer: false,
        events: false,
        url: false,
        querystring: false,
        http: false,
        https: false,
        zlib: false,
        assert: false,
        constants: false,
        domain: false,
        punycode: false,
        process: false,
        vm: false,
        cluster: false,
        readline: false,
        repl: false,
        string_decoder: false,
        sys: false,
        timers: false,
        dgram: false,
        dns: false,
        module: false,
        perf_hooks: false,
        worker_threads: false,
        inspector: false,
        async_hooks: false,
        v8: false,
      };
      
      // Add aliases for node: scheme modules
      config.resolve.alias = {
        ...config.resolve.alias,
        'node:child_process': false,
        'node:tty': false,
        'node:fs': false,
        'node:net': false,
        'node:tls': false,
        'node:os': false,
        'node:path': false,
        'node:crypto': false,
        'node:stream': false,
        'node:util': false,
        'node:buffer': false,
        'node:events': false,
        'node:url': false,
        'node:querystring': false,
        'node:http': false,
        'node:https': false,
        'node:zlib': false,
        'node:assert': false,
        'node:constants': false,
        'node:domain': false,
        'node:punycode': false,
        'node:process': false,
        'node:vm': false,
        'node:cluster': false,
        'node:readline': false,
        'node:repl': false,
        'node:string_decoder': false,
        'node:sys': false,
        'node:timers': false,
        'node:dgram': false,
        'node:dns': false,
        'node:module': false,
        'node:perf_hooks': false,
        'node:worker_threads': false,
        'node:inspector': false,
        'node:async_hooks': false,
        'node:v8': false,
      };
    }
    return config;
  },
};

export default nextConfig;