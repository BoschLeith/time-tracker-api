import { sql } from "drizzle-orm";
import { sqliteTable, integer, text, real, int } from "drizzle-orm/sqlite-core";

// Clients table
export const clients = sqliteTable("clients", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").unique(),
  hourlyRate: real("hourly_rate").notNull().default(0),
  createdAt: text().default(sql`(CURRENT_DATE)`),
});

// Time Entries table
export const timeEntries = sqliteTable("time_entries", {
  id: int().primaryKey({ autoIncrement: true }),
  clientId: integer("client_id")
    .notNull()
    .references(() => clients.id, { onDelete: "cascade" }),
  description: text("description"),
  startTime: integer("start_time").notNull(),
  endTime: integer("end_time"),
  duration: integer("duration"), // In minutes
  createdAt: text().default(sql`(CURRENT_DATE)`),
});

// Transactions table
export const transactions = sqliteTable("transactions", {
  id: int().primaryKey({ autoIncrement: true }),
  clientId: integer("client_id")
    .notNull()
    .references(() => clients.id, { onDelete: "cascade" }),
  amount: real("amount").notNull(),
  description: text("description"),
  createdAt: text().default(sql`(CURRENT_DATE)`),
});
