# Lab D: Smart Dependency Upgrades with context7 MCP

## Duration: 20-30 minutes

## Learning Objectives
- Configure and use MCP tools in Junie
- Use context7 for real-time library documentation
- Plan and execute major version upgrades
- Generate migration documentation
- Handle breaking changes systematically

## Prerequisites
- Any JetBrains IDE with Junie installed
- Node.js project with outdated dependencies
- MCP configured in Junie settings

## Part 1: MCP Setup (5 minutes)

### Task 1: Configure context7 MCP

1. Open Junie Settings: Settings → Junie → MCP
2. Click "Add" to edit `mcp.json`
3. Add context7 configuration:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["@upstash/context7"]
    }
  }
}
```

4. Save and restart Junie
5. Verify in Junie panel that context7 shows as connected

### Task 2: Test context7 Connection

In Ask mode, request:
```
Use context7 to get the latest stable version of React and its major changes from version 17
```

You should see Junie invoke the context7 tool.

## Part 2: Analyze Current Dependencies (5 minutes)

### Current package.json:
```json
{
  "name": "legacy-react-app",
  "version": "1.0.0",
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-router": "^5.2.0",
    "react-scripts": "4.0.3",
    "axios": "^0.21.1",
    "moment": "^2.29.1",
    "lodash": "^4.17.20"
  },
  "devDependencies": {
    "@types/react": "^17.0.3",
    "@types/react-dom": "^17.0.3",
    "@testing-library/react": "^11.2.5",
    "@testing-library/jest-dom": "^5.11.9"
  }
}
```

### Task 3: Dependency Audit

In Code mode with context7:
```
Use context7 to:
1. Check the latest stable versions of all dependencies
2. Identify which have breaking changes
3. Determine upgrade priority and dependencies between packages
4. Create an upgrade plan
```

Expected findings:
- React 17 → 18 (major changes)
- React Router 5 → 6 (breaking changes)
- React Scripts 4 → 5 (Webpack 5)
- Moment → Consider day.js migration

## Part 3: Generate Migration Plan (10 minutes)

### Task 4: Create Detailed Migration Plan

In Code mode:
```
Using context7, create a detailed migration plan for React 17 to 18:
1. Get the official React 18 migration guide
2. List all breaking changes that affect our app
3. Identify required code changes
4. Determine the upgrade sequence
5. Save the plan to MIGRATION_PLAN.md
```

Expected plan structure:
```markdown
# React 17 to 18 Migration Plan

## Prerequisites
- Node.js 14+
- Update React DevTools

## Upgrade Sequence
1. React and React-DOM together
2. Type definitions
3. Testing library
4. React Scripts
5. React Router (separate major upgrade)

## Breaking Changes
### Automatic Batching
- Previous: Only in event handlers
- React 18: All updates are batched
- Action: Review setTimeout/Promise handlers

### Strict Mode Changes
- Double-invoking effects in development
- Action: Check for side effects in useEffect

## Code Changes Required
...
```

### Task 5: Execute React Upgrade

In Code mode:
```
Execute the React 18 upgrade:
1. Update react and react-dom to latest v18
2. Update type definitions
3. Fix the index.js/tsx file for new ReactDOM.createRoot API
4. Update any deprecated lifecycle methods
5. Run tests and fix any failures
```

### Task 6: Document Changes

```
Create MIGRATION.md documenting:
1. What was upgraded and why
2. Breaking changes encountered
3. Code modifications made
4. Testing approach
5. Rollback plan if needed
```

## Part 4: Router Migration (10 minutes)

### Task 7: React Router Upgrade Plan

In Code mode:
```
Use context7 to plan React Router 5 to 6 migration:
1. Get the official migration guide
2. List all route definition changes
3. Identify component prop changes
4. Create code modification list
```

### Task 8: Execute Router Migration

```
Migrate React Router from v5 to v6:
1. Update package to v6
2. Convert Switch to Routes
3. Update Route component syntax
4. Fix useHistory to useNavigate
5. Update Link components
6. Test all routes
```

Example changes:
```javascript
// Before (v5)
import { Switch, Route, useHistory } from 'react-router-dom';

<Switch>
  <Route path="/about" component={About} />
  <Route path="/users/:id" component={User} />
</Switch>

// After (v6)
import { Routes, Route, useNavigate } from 'react-router-dom';

<Routes>
  <Route path="/about" element={<About />} />
  <Route path="/users/:id" element={<User />} />
</Routes>
```

## Part 5: Additional Optimizations (5 minutes)

### Task 9: Modernize Other Dependencies

In Code mode:
```
Use context7 to:
1. Check if we should migrate from Moment.js to day.js
2. Get migration guide if recommended
3. Update axios to latest version
4. Check for security vulnerabilities
5. Update all safe minor/patch versions
```

### Task 10: Performance Improvements

```
Based on React 18 features, add:
1. Suspense boundaries for code splitting
2. useDeferredValue for expensive operations
3. React.memo for pure components
4. Lazy loading for routes
Include examples and explanations
```

## Part 6: Testing and Validation (5 minutes)

### Task 11: Comprehensive Testing

In Code mode:
```
Create a test checklist and verify:
1. All unit tests pass
2. Component rendering works
3. Routing works correctly
4. No console errors or warnings
5. Build succeeds
6. Bundle size comparison
```

### Task 12: Create Rollback Plan

```
Document a rollback plan in ROLLBACK.md:
1. Git commands to revert
2. Package versions to restore
3. Known issues to watch for
4. Testing requirements
5. Communication plan
```

## Reflection Questions

1. How did context7 help with the migration planning?
2. What breaking changes were most impactful?
3. How would you approach this without MCP tools?
4. What other MCP tools would be helpful?

## Common Issues and Solutions

**Issue**: context7 connection fails
**Solution**: Check npm/npx installation, restart IDE

**Issue**: Conflicting peer dependencies
**Solution**: Use `--legacy-peer-deps` flag temporarily

**Issue**: Tests fail after React 18 upgrade
**Solution**: Update React Testing Library, check for act() warnings

**Issue**: Build fails with React Scripts 5
**Solution**: Check Webpack config overrides, update as needed

## Challenge Extensions

1. Add more MCP tools (Playwright, search)
2. Automate the migration with scripts
3. Create pre-upgrade snapshot tests
4. Add performance benchmarks
5. Set up automated dependency updates

## MCP Best Practices

✓ Always verify MCP tool responses
✓ Cross-reference with official docs
✓ Test incrementally after each change
✓ Document all decisions
✓ Keep rollback options available

## Final Checklist

- [ ] All dependencies updated to stable versions
- [ ] No security vulnerabilities (npm audit)
- [ ] All tests passing
- [ ] Build succeeds
- [ ] Application runs without errors
- [ ] Migration documented
- [ ] Rollback plan created
- [ ] Team notified of changes

## Key Takeaways

✓ MCP tools provide real-time documentation
✓ context7 eliminates guesswork in upgrades
✓ Systematic migration reduces risk
✓ Documentation is crucial for team alignment
✓ Always have a rollback strategy