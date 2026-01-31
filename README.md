# GitHub Actions Demo

A complete demo project for learning GitHub Actions. This repository contains a simple Calculator API with multiple workflow examples.

## Project Structure

```
github-actions-demo/
├── src/
│   ├── index.js          # Calculator API server
│   └── index.test.js     # Unit tests
├── .github/
│   └── workflows/
│       ├── ci.yml              # Basic CI pipeline
│       ├── ci-with-cache.yml   # CI with dependency caching
│       ├── matrix.yml          # Multi-version testing
│       ├── deploy.yml          # Deployment workflow
│       ├── scheduled.yml       # Scheduled/cron jobs
│       └── secrets-demo.yml    # Secrets & env variables
├── package.json
├── .gitignore
└── README.md
```

## Quick Start

```bash
# Install dependencies
npm install

# Run tests
npm test

# Start the server
npm start

# Test the API
curl http://localhost:3000/add?a=5&b=3
```

## Video Walkthrough

### Part 1: Understanding the Basics

#### What is GitHub Actions?

GitHub Actions is a CI/CD platform built into GitHub. It automates:
- Running tests on every push
- Building and deploying your application
- Scheduled tasks (like backups)
- Any workflow you can imagine

#### Key Concepts

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   TRIGGER   │ --> │  WORKFLOW   │ --> │    JOBS     │
│  (on push)  │     │ (.yml file) │     │   (steps)   │
└─────────────┘     └─────────────┘     └─────────────┘
```

- **Workflow**: The entire automation (defined in a `.yml` file)
- **Trigger**: What starts the workflow (push, PR, schedule, manual)
- **Job**: A group of steps that run on the same machine
- **Step**: Individual commands or actions

---

### Part 2: Your First Workflow

Open `.github/workflows/ci.yml`:

```yaml
name: CI Pipeline

# TRIGGERS
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

# JOBS
jobs:
  test:
    runs-on: ubuntu-latest    # The machine to use

    steps:
      - uses: actions/checkout@v4       # Get the code
      - uses: actions/setup-node@v4     # Install Node.js
        with:
          node-version: '20'
      - run: npm install                # Install deps
      - run: npm test                   # Run tests
```

#### Walkthrough:

1. **`name`**: Display name in GitHub UI
2. **`on`**: When to run (push to main, PRs to main)
3. **`jobs`**: What to do
4. **`runs-on`**: Which OS to use
5. **`steps`**: Individual commands
6. **`uses`**: Pre-built actions from the marketplace
7. **`run`**: Shell commands

---

### Part 3: Matrix Builds

Test on multiple Node.js versions simultaneously.

Open `.github/workflows/matrix.yml`:

```yaml
strategy:
  matrix:
    node-version: [18, 20, 22]
    os: [ubuntu-latest, windows-latest]
```

This creates 6 parallel jobs:
- Node 18 on Ubuntu
- Node 18 on Windows
- Node 20 on Ubuntu
- Node 20 on Windows
- Node 22 on Ubuntu
- Node 22 on Windows

---

### Part 4: Caching for Speed

Caching node_modules speeds up builds dramatically.

Open `.github/workflows/ci-with-cache.yml`:

```yaml
- name: Cache node modules
  uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-npm-${{ hashFiles('**/package-lock.json') }}
```

**How it works:**
1. First run: No cache, installs everything, saves cache
2. Second run: Cache hit! Skips downloading packages

---

### Part 5: Deployment Pipeline

A real-world deployment flow with stages.

Open `.github/workflows/deploy.yml`:

```
┌──────┐     ┌───────┐     ┌─────────┐     ┌────────────┐
│ Test │ --> │ Build │ --> │ Staging │ --> │ Production │
└──────┘     └───────┘     └─────────┘     └────────────┘
```

- Each stage depends on the previous (`needs:`)
- Production can require manual approval
- Artifacts are passed between jobs

---

### Part 6: Scheduled Jobs

Run workflows on a schedule using cron syntax.

Open `.github/workflows/scheduled.yml`:

```yaml
on:
  schedule:
    - cron: '0 9 * * 1'   # Every Monday at 9 AM UTC
```

**Cron syntax:**
```
┌───────────── minute (0 - 59)
│ ┌───────────── hour (0 - 23)
│ │ ┌───────────── day of month (1 - 31)
│ │ │ ┌───────────── month (1 - 12)
│ │ │ │ ┌───────────── day of week (0 - 6)
│ │ │ │ │
* * * * *
```

**Examples:**
- `0 0 * * *` - Every day at midnight
- `0 */6 * * *` - Every 6 hours
- `0 9 * * 1-5` - Weekdays at 9 AM

---

### Part 7: Secrets Management

**NEVER hardcode sensitive data!**

Open `.github/workflows/secrets-demo.yml`:

```yaml
env:
  API_KEY: ${{ secrets.API_KEY }}
```

**Adding secrets:**
1. Go to repo Settings
2. Click "Secrets and variables" > "Actions"
3. Click "New repository secret"
4. Add name and value

---

## Try It Yourself

### Step 1: Create a GitHub Repository

```bash
cd github-actions-demo
git init
git add .
git commit -m "Initial commit"
gh repo create github-actions-demo --public --source=. --push
```

### Step 2: Watch the Action Run

1. Go to your repo on GitHub
2. Click the "Actions" tab
3. Watch your workflows run!

### Step 3: Make a Change

```bash
# Edit a file
echo "// comment" >> src/index.js
git add .
git commit -m "Trigger workflow"
git push
```

### Step 4: Create a Pull Request

```bash
git checkout -b feature/test-pr
echo "// another comment" >> src/index.js
git add .
git commit -m "Test PR workflow"
git push -u origin feature/test-pr
gh pr create --title "Test PR" --body "Testing PR workflow"
```

---

## Common Issues & Solutions

### Workflow not running?
- Check the `on:` triggers match your action
- Ensure the `.yml` file is in `.github/workflows/`
- Check for YAML syntax errors

### Tests failing?
- Add `- run: npm test -- --verbose` for more details
- Check the logs in the Actions tab

### Cache not working?
- Verify the cache key matches
- Check if `package-lock.json` exists

---

## Pro Tips

1. **Use `workflow_dispatch`** to manually trigger workflows for testing
2. **Add status badges** to your README
3. **Use environments** for deployment approvals
4. **Set up branch protection** to require passing checks
5. **Monitor usage** in Settings > Billing > Actions

---

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax Reference](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
- [Actions Marketplace](https://github.com/marketplace?type=actions)
- [Cron Expression Generator](https://crontab.guru/)
