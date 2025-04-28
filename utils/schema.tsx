import { sql } from "drizzle-orm";
import { boolean, pgTable, serial, text, varchar, timestamp, uuid, } from "drizzle-orm/pg-core";

export const AIOutput=pgTable('AIOutput',{
  id:serial('id').primaryKey(),
  formData:varchar('formData').notNull(),
  aiResponse:text('aiResponse'),
  templateSlug:varchar('templateSlug').notNull(),
  createdBy:varchar('createdBy').notNull(),
  createdAt:varchar('createdAt')
});