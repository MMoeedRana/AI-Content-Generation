import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './utils/schema.tsx',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:VXDoIChf7j2e@ep-rough-waterfall-a1xozrdx.ap-southeast-1.aws.neon.tech/AI-Content-Generator?sslmode=require',
  },
});
