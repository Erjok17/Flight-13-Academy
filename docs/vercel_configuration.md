# 🚀 Vercel Routing Configuration

This document explains the routing rewrite implemented in the project to support client-side navigation inside Single Page Applications (SPAs) deployed on Vercel.

---

## 1. SPA Routing Problem
The Flight 13 Academy frontend uses `react-router-dom` in [src/App.tsx](file:///home/code8/Desktop/Flight-13-Academy/src/App.tsx) to achieve client-side SPA routing. 

When hosted on Vercel, navigating through clicking links works fine because React Router updates the browser address bar programmatically. However, if a user reloads the browser tab on a subpath (e.g. `/programs` or `/about`), the browser issues a physical server request to Vercel for that folder. Since only `index.html` exists in a static SPA build, Vercel throws a **404 Not Found** error.

---

## 2. Implemented Fix (`vercel.json`)
To solve this reload issue, we created a [vercel.json](file:///home/code8/Desktop/Flight-13-Academy/vercel.json) file in the project root:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### How it Works:
* Vercel reads this configuration file during deployment.
* The `rewrites` array specifies that any incoming path pattern matching `/(.*)` (all subpaths) should be internally rewritten and served by the root `/index.html` file.
* Once the browser loads `/index.html`, React Router extracts the path and renders the correct view dynamically, ensuring smooth page refreshes on production.
