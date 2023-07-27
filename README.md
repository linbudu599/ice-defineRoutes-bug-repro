# ICE defineRoutes Bug(Unexpected Behaviour)

## 问题描述

- 使用 `router.defineRoutes` 动态调整路由时，若尝试调整到根访问路径，同时存在 layout 组件，则无法匹配到页面组件。
- 使用 `router.defineRoutes` 动态调整路由时，若调整到非根访问路径，全局 layout 无法在当前页面组件生效。

## 预期行为

通过 `router.defineRoutes`，将 `/src/pages/generated/index/index.tsx` 作为 根路径，同时 `src/pages/layout.tsx` 在此页面生效。

- 尝试1：直接调整路由

```typescript
import { defineConfig } from "@ice/app";

export default defineConfig(() => ({
  alias: { "@/*": "./src/*" },
  ssg: false,
  routes: {
    defineRoutes: (routes) => {
      routes("/", "generated/index/index.tsx");
    },
  },
}));

```

表现：

- 访问根路径，未匹配到组件，页面上仅存在 Layout 组件。
- 访问 /generated 路径，表现正常，页面组件、Layout 组件均生效。

生成的 route-manifest.json

```json
[
  {
    "id": "layout",
    "file": "layout.tsx",
    "componentName": "layout",
    "layout": true,
    "exports": [
      "default"
    ],
    "children": [
      {
        "path": "generated",
        "index": true,
        "id": "generated",
        "parentId": "layout",
        "file": "generated/index/index.tsx",
        "componentName": "generated-index-index",
        "layout": false,
        "exports": [
          "default"
        ]
      }
    ]
  },
  {
    "path": "/",
    "id": "/",
    "file": "generated/index/index.tsx",
    "componentName": "generated-index-index",
    "layout": false,
    "exports": [
      "default"
    ]
  }
]
```

疑似原因：优先匹配了第一项 layout ？没有匹配到下一个动态配置过的路由？



- 尝试2：在定义路由时将其定义在 layotu 内：

```typescript
import { defineConfig } from "@ice/app";

export default defineConfig(() => ({
  ssg: false,
  ssr: false,
  routes: {
    defineRoutes: (routes) => {
      routes("/", "layout.tsx", () => {
        routes("", "generated/index/index.tsx");
      });
    },
  },
}));

```

类似于尝试 1，仅有 layout 组件生效。



- 尝试3：调整到非根路径：

```typescript
import { defineConfig } from "@ice/app";

export default defineConfig(() => ({
  ssg: false,
  routes: {
    defineRoutes: (routes) => {
      routes("/gen", "generated/index/index.tsx");
    },
  },
}));

```

- 可在 `/gen` 匹配到预期的组件
- 全局 layout 不生效



